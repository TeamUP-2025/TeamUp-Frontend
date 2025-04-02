import { getRecentRepoAuth, getUserProfileAuth } from "~/action/github";
import { getServerAuthSession } from "~/lib/auth";
import { redirect } from "next/navigation";
import UserProfile from "~/components/profile";

export default async function ProfilePage() {
  const auth = await getServerAuthSession();
  if (!auth.isLoggedIn) {
    redirect("/");
  }

  const [user, repos] = await Promise.all([
    getUserProfileAuth(),
    getRecentRepoAuth(),
  ]);

  return <UserProfile user={user} repos={repos} />;
}
