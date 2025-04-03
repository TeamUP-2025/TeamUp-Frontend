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

export default function Chat({
  id,
  socketURL,
}: {
  id: string;
  socketURL: string;
}) {
  const [messages, setMessages] = useState<
    Array<{ userId: string; message: string; timestamp: Date }>
  >([]);
  const auth = useAuth();
  const [messageInput, setMessageInput] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [roomId, setRoomId] = useState(id);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState("");
  const [currentUserId, setCurrentUserId] = useState<string>(auth.login);
  // Ref for the scrollable chat box container
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Connect to socket server
  useEffect(() => {
    const newSocket = io(socketURL, { withCredentials: true });

    newSocket.on("connect", () => {
      console.log("Connected to socket server");
      setConnected(true);
      setError("");
      // Always use auth.login so that it’s consistent with joinRoom.
      setCurrentUserId(auth.login);
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
      console.log(message);
      if (typeof message === "string") {
        // System message
        setMessages((prev) => [
          ...prev,
          { userId: "system", message, timestamp: new Date() },
        ]);
      } else {
        // User message
        setMessages((prev) => [...prev, message]);
      }
    });

    setSocket(newSocket);

    // Clean up on unmount
    return () => {
      newSocket.disconnect();
    };
  }, [socketURL, auth.login]);

  // Join room when socket is available and roomId changes
  useEffect(() => {
    console.log(socket, connected, roomId);
    if (socket && connected && roomId) {
      // Leave previous room if any
      socket.emit("leaveRoom", roomId);

      // Join new room using auth.login consistently
      socket.emit("joinRoom", roomId, auth.login);

      // Clear messages when changing rooms
      setMessages([]);
    }
  }, [socket, connected, roomId, auth.login]);

  
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);


  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim() && socket && connected) {
      // Send the message without adding a userId payload, as the server sets it on join
      socket.emit("chatMessage", {
        roomId,
        message: messageInput,
      });
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
              <div className="mx-4 mb-4 rounded border border-red-400 bg-red-100 
                px-4 py-3 text-red-700">
                {error}
              </div>
            )}

            <CardContent>
              <div
                ref={chatContainerRef}
                className="mb-4 h-[60vh] overflow-y-auto rounded-md border bg-slate-50 p-4"
              >
                {messages.length === 0 ? (
                  <div className="flex h-full items-center justify-center text-center text-muted-foreground">
                    No messages yet. Start the conversation!
                  </div>
                ) : (
                  messages.map((msg, index) => (
                    <div
                      key={index}
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
                            {new Date(msg.timestamp).toLocaleTimeString()}
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
