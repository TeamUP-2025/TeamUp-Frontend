"use server";

import { redirect } from "next/navigation";
import Chat from "~/components/chat/chat_component";
import { env } from "~/env";
import { getServerAuthSession } from "~/lib/auth";

export default async function ChatPage({ params }: { params: { id: string } }) {
  const authSession = await getServerAuthSession();
  const { id } = params;
  if (!authSession.isLoggedIn) {
    redirect("/");
  }

  console.log(id);
  const SOCKET_URL = env.SOCKET_URL;

  return <Chat id={id} socketURL={SOCKET_URL} />;
}
