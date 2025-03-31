"use server";

import { redirect } from 'next/navigation'
import {  use } from "react";
import Chat from "~/components/chat/chat_component";
import { env } from "~/env";
import { getServerAuthSession } from "~/lib/auth";

export default async function ChatPage({
  params,
}: {
  params: { id: string };
}) {

  const authSession = await getServerAuthSession();
  const { id } = await params
  if (!authSession.isLoggedIn) {
    redirect("/")
  }
  const SOCKET_URL = env.SOCKET_URL;

  
  return <Chat id={id} socketURL={SOCKET_URL} />;
}
