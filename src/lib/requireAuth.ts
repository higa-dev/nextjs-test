
import { redirect } from "next/navigation";
import { auth } from "./auth";

export async function requireAuth() {
  const session = await auth();
  if (!session) redirect("/api/auth/signin");
  return session;
}