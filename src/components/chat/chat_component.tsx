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

// Define the structure for history data received from the server
interface ChatHistoryPayload {
  roomId: string;
  messages: Array<{
    messageId: string;
    userId: string;
    message: string;
    timestamp: string | Date; // Server might send string, convert to Date
  }>;
  hasMore: boolean;
}

export default function Chat({
  id,
  socketURL,
}: {
  id: string;
  socketURL: string;
}) {
  console.log("Rendering Chat component for id:", id);
  const [messages, setMessages] = useState<
    Array<{ userId: string; message: string; timestamp: Date }>
  >([]);
  const auth = useAuth();
  const [messageInput, setMessageInput] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [roomId, setRoomId] = useState(id); // Initialize with the prop id
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState("");
  const [currentUserId, setCurrentUserId] = useState<string>(auth.login);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  // Optional: State to track if more history is available
  const [hasMoreHistory, setHasMoreHistory] = useState(false);

  // Effect to update roomId when the id prop changes
  useEffect(() => {
    setRoomId(id);
    // Clear messages when the room ID prop changes externally
    setMessages([]);
    setHasMoreHistory(false); // Reset history flag
    setError(""); // Clear errors
    console.log("Room ID prop changed, updating state to:", id);
  }, [id]);

  // Connect to socket server and set up listeners
  useEffect(() => {
    console.log("Setting up socket connection to:", socketURL);
    const newSocket = io(socketURL, { withCredentials: true });

    newSocket.on("connect", () => {
      console.log("Connected to socket server with ID:", newSocket.id);
      setConnected(true);
      setError("");
      setCurrentUserId(auth.login); // Ensure currentUserId is set on connect
      // Automatically join the room upon connection
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

    newSocket.on("message", (message) => {
      console.log("Received message:", message);
      const newMessage =
        typeof message === "string"
          ? { userId: "system", message, timestamp: new Date() }
          : { ...message, timestamp: new Date(message.timestamp) }; // Ensure timestamp is Date

      setMessages((prev) => [...prev, newMessage]);
    });

    // --- Listener for successful room join ---
    newSocket.on("joinedRoom", (joinedRoomId: string) => {
      console.log(`Successfully joined room: ${joinedRoomId}. Requesting history.`);
      // Request initial chat history for the joined room
      newSocket.emit("requestHistory", {
        roomId: joinedRoomId,
        beforeTimestamp: null, // Request latest messages
      });
    });

    // --- Listener for receiving chat history ---
    newSocket.on("chatHistory", (data: ChatHistoryPayload) => {
      console.log("Received chat history:", data);
      if (data.roomId === roomId) {
        // Ensure history is for the current room
        const historyMessages = data.messages.map((msg) => ({
          ...msg,
          timestamp: new Date(msg.timestamp), // Convert string timestamps to Date objects
        }));
        // Prepend history to existing messages (or set if initial load)
        // Since this is the *initial* load triggered by joinedRoom, we replace messages.
        setMessages(historyMessages);
        setHasMoreHistory(data.hasMore); // Store if more messages are available
      }
    });

    setSocket(newSocket);

    // Clean up on unmount or when dependencies change
    return () => {
      console.log("Disconnecting socket...");
      newSocket.disconnect();
      setConnected(false);
      setSocket(null);
    };
    // Dependencies: socketURL and auth.login (roomId is handled separately for joining)
  }, [socketURL, auth.login, roomId]); // Add roomId here to rejoin if it changes

  // Effect to join room when socket is connected and roomId is set
  // This effect now primarily handles re-joining if roomId changes *after* initial connection
  // or if the connection drops and reconnects.
  useEffect(() => {
    if (socket && connected && roomId && auth.login) {
      console.log(
        `Ensuring join for room ${roomId} as user ${auth.login}. Socket connected: ${connected}`
      );
      // Emit joinRoom - the 'joinedRoom' listener will handle the history request
      socket.emit("joinRoom", roomId, auth.login);
      // Clear local messages optimistically before history arrives
      setMessages([]);
      setHasMoreHistory(false);
    }
  }, [socket, connected, roomId, auth.login]); // Rerun if these change

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      // Scroll down on new message, but maybe not if history was just loaded?
      // For simplicity, always scroll for now.
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth", // Use 'auto' if smooth scroll feels weird with history loading
      });
    }
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim() && socket && connected && roomId) {
      console.log(`Sending message to room ${roomId}: ${messageInput}`);
      socket.emit("chatMessage", {
        roomId,
        message: messageInput,
      });
      setMessageInput("");
    }
  };

  // --- UI Rendering (No changes needed here) ---
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-6 pt-4">
        <div className="grid gap-6 md:grid-cols-1">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-2xl font-bold">
                  Project Chat (Room: {roomId}) {/* Display Room ID */}
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
                {/* Optional: Add a loading indicator while history fetches? */}
                {messages.length === 0 && !error /* && !isLoadingHistory */ ? (
                  <div className="flex h-full items-center justify-center text-center text-muted-foreground">
                    No messages yet, or history loading...
                  </div>
                ) : (
                  messages.map((msg, index) => (
                    <div
                      // Use messageId if available and unique, otherwise index
                      key={
                        (msg as any).messageId
                          ? (msg as any).messageId
                          : `msg-${index}`
                      }
                      className={`mb-4 ${
                        msg.userId === "system"
                          ? "text-center italic text-muted-foreground"
                          : msg.userId === currentUserId
                          ? "text-right"
                          : "text-left"
                      }`}
                    >
                      {msg.userId !== "system" && (
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
                            {/* Ensure timestamp is a Date object before calling methods */}
                            {msg.timestamp instanceof Date
                              ? msg.timestamp.toLocaleTimeString()
                              : "Invalid Date"}
                          </div>
                        </div>
                      )}
                      {msg.userId === "system" && (
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
