import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import auth from "next-auth";
import { redirect } from "next/navigation";

export async function requireAuth() {
  const session = await auth(authOptions);
  if (!session) redirect("/api/auth/signin");
  return session;
}