"use client";

import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useAuth } from "~/context/AuthContext";
import { Loader2 } from "lucide-react";

// Payload received from the server
interface ChatHistoryPayload {
  roomId: string;
  messages: Array<{
    messageId: string;
    userId: string;
    message: string;
    timestamp: string | Date;
  }>;
  hasMore: boolean;
}

// Our chat message type
interface ChatMessage {
  messageId?: string;
  userId: string;
  message: string;
  timestamp: Date;
}

export default function Chat({
  id,
  socketURL,
}: {
  id: string;
  socketURL: string;
}) {
  console.log("Rendering Chat component for id:", id);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const auth = useAuth();
  const [messageInput, setMessageInput] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [roomId, setRoomId] = useState(id);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState("");
  const [currentUserId, setCurrentUserId] = useState<string>(auth.login);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [hasMoreHistory, setHasMoreHistory] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Ref to determine if we are paginating (loading older messages)
  const isPaginatingRef = useRef<boolean>(false);
  // Ref to capture scroll height before updating messages during pagination
  const scrollHeightBeforeUpdateRef = useRef<number>(0);
  // Ref to track initial load.
  const initialLoadRef = useRef<boolean>(true);

  // Reset chat state when room id changes.
  useEffect(() => {
    setRoomId(id);
    setMessages([]);
    setHasMoreHistory(false);
    setError("");
    initialLoadRef.current = true; // Reset for new room
    console.log("Room ID prop changed, updating state to:", id);
  }, [id]);

  // Setup socket connection and events.
  useEffect(() => {
    console.log("Setting up socket connection to:", socketURL);
    const newSocket = io(socketURL, { withCredentials: true });

    newSocket.on("connect", () => {
      console.log("Connected to socket server with ID:", newSocket.id);
      setConnected(true);
      setError("");
      setCurrentUserId(auth.login);
      if (roomId && auth.login) {
        console.log(
          `Auto-joining room ${roomId} as user ${auth.login} after connect.`
        );
        newSocket.emit("joinRoom", roomId, auth.login);
      }
    });

    newSocket.on("connect_error", (err) => {
      console.error("Connection error:", err);
      setConnected(false);
      setError(`Connection error: ${err.message}`);
    });

    newSocket.on("error", (errorMessage) => {
      console.error("Socket error:", errorMessage);
      setError(errorMessage);
    });

    // Listen for real‑time new message.
    newSocket.on("message", (message) => {
      console.log("Received message:", message);
      const newMessage: ChatMessage =
        typeof message === "string"
          ? { userId: "system", message, timestamp: new Date() }
          : { ...message, timestamp: new Date(message.timestamp) };
      setMessages((prev) => [...prev, newMessage]);
    });

    // When joined, request history.
    newSocket.on("joinedRoom", (joinedRoomId: string) => {
      console.log(
        `Successfully joined room: ${joinedRoomId}. Requesting history.`
      );
      newSocket.emit("requestHistory", {
        roomId: joinedRoomId,
        beforeTimestamp: null,
      });
    });

    // Handle incoming chat history.
    newSocket.on("chatHistory", (data: ChatHistoryPayload) => {
      console.log("Received chat history:", data);
      if (data.roomId === roomId) {
        const historyMessages: ChatMessage[] = data.messages.map((msg) => ({
          messageId: msg.messageId,
          userId: msg.userId,
          message: msg.message,
          timestamp: new Date(msg.timestamp),
        }));

        if (isPaginatingRef.current) {
          const container = chatContainerRef.current;
          const currScrollTop = container?.scrollTop || 0;
          scrollHeightBeforeUpdateRef.current = container?.scrollHeight || 0;

          // Merge older messages (prepend them)
          setMessages((prevMessages) => {
            const existingIds = new Set(
              prevMessages
                .filter((msg) => msg.messageId)
                .map((msg) => msg.messageId)
            );
            const uniqueNewMessages = historyMessages.filter(
              (msg) => !msg.messageId || !existingIds.has(msg.messageId)
            );
            return [...uniqueNewMessages, ...prevMessages];
          });

          // Restore scroll position relative to new height.
          setTimeout(() => {
            if (container) {
              const newScrollHeight = container.scrollHeight;
              const heightDiff =
                newScrollHeight - scrollHeightBeforeUpdateRef.current;
              container.scrollTop = currScrollTop + heightDiff;
            }
          }, 0);
          isPaginatingRef.current = false;
        } else {
          // Initial load: replace messages and scroll to bottom.
          setMessages(historyMessages);
          setTimeout(() => {
            const container = chatContainerRef.current;
            if (container) {
              container.scrollTo({ top: container.scrollHeight });
            }
            initialLoadRef.current = false;
          }, 0);
        }
        setHasMoreHistory(data.hasMore);
        setLoadingHistory(false);
      }
    });

    setSocket(newSocket);

    return () => {
      console.log("Disconnecting socket...");
      newSocket.disconnect();
      setConnected(false);
      setSocket(null);
    };
  }, [socketURL, auth.login, roomId]);

  // Do not reset messages when rejoining; simply emit joinRoom.
  useEffect(() => {
    if (socket && connected && roomId && auth.login) {
      console.log(
        `Ensuring join for room ${roomId} as user ${auth.login}. Socket connected: ${connected}`
      );
      socket.emit("joinRoom", roomId, auth.login);
    }
  }, [socket, connected, roomId, auth.login]);

  // Auto-scroll effect: on new (non‑pagination) messages, always scroll to the bottom.
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container || loadingHistory) return;

    // If we are not paginating, always scroll to bottom.
    container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
  }, [messages, loadingHistory]);

  // Listen for scroll events to trigger older messages loading.
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (
        container.scrollTop < 50 &&
        hasMoreHistory &&
        !loadingHistory &&
        messages.length > 0
      ) {
        loadOlderMessages();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [hasMoreHistory, loadingHistory, messages.length]);

  // Function to load older (paginated) messages.
  const loadOlderMessages = () => {
    if (
      !socket ||
      !connected ||
      !roomId ||
      loadingHistory ||
      messages.length === 0
    )
      return;

    const oldestMessage = [...messages].sort(
      (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
    )[0];

    if (!oldestMessage) return;

    console.log("Loading older messages before:", oldestMessage.timestamp);
    isPaginatingRef.current = true;
    setLoadingHistory(true);
    socket.emit("requestHistory", {
      roomId,
      beforeTimestamp: oldestMessage.timestamp.toISOString(),
    });
  };

  // Function to send a new message.
  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim() && socket && connected && roomId) {
      console.log(`Sending message to room ${roomId}: ${messageInput}`);
      socket.emit("chatMessage", { roomId, message: messageInput });
      setMessageInput("");
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-6 pt-4">
        <div className="grid gap-6 md:grid-cols-1">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-2xl font-bold">
                  Project Chat
                </CardTitle>
                <CardDescription>
                  {connected ? (
                    <span className="text-green-600">
                      Connected as {currentUserId}
                    </span>
                  ) : (
                    <span className="text-red-600">Disconnected</span>
                  )}
                </CardDescription>
              </div>
            </CardHeader>

            {error && (
              <div className="mx-4 mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
                {error}
              </div>
            )}

            <CardContent>
              <div
                ref={chatContainerRef}
                className="mb-4 h-[60vh] overflow-y-auto rounded-md border bg-slate-50 p-4"
              >
                {loadingHistory && (
                  <div className="flex justify-center py-2">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    <span className="ml-2 text-sm text-muted-foreground">
                      Loading older messages...
                    </span>
                  </div>
                )}

                {hasMoreHistory &&
                  messages.length > 0 &&
                  !loadingHistory && (
                    <div className="mb-4 flex justify-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={loadOlderMessages}
                        className="text-xs"
                      >
                        Load older messages
                      </Button>
                    </div>
                  )}

                {messages.length === 0 && !error ? (
                  <div className="flex h-full items-center justify-center text-center text-muted-foreground">
                    No messages yet, or history loading...
                  </div>
                ) : (
                  messages.map((msg, index) => (
                    <div
                      key={msg.messageId || `msg-${index}`}
                      className={`mb-4 ${
                        msg.userId === "system"
                          ? "text-center italic text-muted-foreground"
                          : msg.userId === currentUserId
                          ? "text-right"
                          : "text-left"
                      }`}
                    >
                      {msg.userId !== "system" ? (
                        <div
                          className={`inline-block max-w-[80%] rounded-lg p-3 ${
                            msg.userId === currentUserId
                              ? "bg-primary text-primary-foreground"
                              : "border bg-card text-card-foreground"
                          }`}
                        >
                          <div className="mb-1 text-sm font-semibold">
                            {msg.userId === currentUserId
                              ? "You"
                              : `User ${msg.userId}`}
                          </div>
                          <div>{msg.message}</div>
                          <div className="mt-1 text-xs opacity-75">
                            {msg.timestamp instanceof Date
                              ? msg.timestamp.toLocaleTimeString()
                              : "Invalid Date"}
                          </div>
                        </div>
                      ) : (
                        <div className="py-2">{msg.message}</div>
                      )}
                    </div>
                  ))
                )}
              </div>

              <form onSubmit={sendMessage} className="flex gap-2">
                <Input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                  disabled={!connected}
                />
                <Button
                  type="submit"
                  disabled={!connected || !messageInput.trim()}
                >
                  Send
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
