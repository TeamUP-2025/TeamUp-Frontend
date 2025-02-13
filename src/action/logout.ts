import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction() {
    "use server";
    const cookieStore = await cookies();
    cookieStore.delete("token");
    // Optionally redirect after logout:
    redirect("/");
  }
  