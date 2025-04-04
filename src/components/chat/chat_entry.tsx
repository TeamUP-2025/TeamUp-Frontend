"use client";

import { redirect } from "next/navigation";
import Chat from "~/components/chat/chat_component";
import { useAuth } from "~/context/AuthContext";

export default  function ChatPage({ params }: { params: { id: string, Socket_url: string} }) {
  const authSession = useAuth();
  const { id, Socket_url } = params;
  if (!authSession.isLoggedIn) {
    redirect("/");
  }
  

  const SOCKET_URL = Socket_url;


  return <Chat id={id} socketURL={SOCKET_URL} />;
}
