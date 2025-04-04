"use server";
import Link from "next/link";
import { Github } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import { logoutAction } from "~/action/logout";
import { getServerAuthSession } from "~/lib/auth";
import { env } from "~/env";

export default async function NavBar() {
  const auth = await getServerAuthSession();
  const url = env.BACKEND_URL;
  return (
    <header className="flex h-14 items-center border-b px-4 lg:px-6">
      <Link className="flex items-center justify-center" href="/">
        <Github className="mr-2 h-6 w-6" />
        <span className="font-bold">TeamUP</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="/"
        >
          Home
        </Link>
        <Link
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="/browse"
        >
          Browse
        </Link>

        {auth?.isLoggedIn ? (
          <>
            <Link
              className="text-sm font-medium underline-offset-4 hover:underline"
              href="/my-project"
            >
              My Projects
            </Link>
            <Link
              className="text-sm font-medium underline-offset-4 hover:underline"
              href="/profile"
            >
              Profile
            </Link>
            <form
              action={logoutAction}
              className="text-sm font-medium underline-offset-4 hover:underline"
            >
              <button type="submit" className="">
                Logout
              </button>
            </form>
          </>
        ) : (
          <>
            <Link
              className="text-sm font-medium underline-offset-4 hover:underline"
              href={`${url}/auth/github`}
            >
              Login
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
