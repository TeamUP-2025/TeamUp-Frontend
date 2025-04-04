import { getRecentRepoByLogin } from "~/action/repo";
import { getUserProfileByLogin } from "~/action/user";
import UserProfile from "~/components/profile";

export default async function ProfilePage({
  params,
}: {
  params: { login: string };
}) {
  const { login } = await params;
  const [user, repos] = await Promise.all([
    getUserProfileByLogin(login),
    getRecentRepoByLogin(login),
  ]);

  return <UserProfile user={user} repos={repos} />;
}
