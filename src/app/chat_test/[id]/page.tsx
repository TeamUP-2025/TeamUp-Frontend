"use server";

import { useEffect, useState, useRef, use } from "react";
import Chat from "~/components/chat/chat_component";
import { env } from "~/env";

export default function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const SOCKET_URL = env.SOCKET_URL;

  
  return <Chat id={id} socketURL={SOCKET_URL} />;
}
