import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export function auth() {
  // App Routerでは引数なしでOK
  return getServerSession(authOptions);
}