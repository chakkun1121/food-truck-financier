import { serverFirebase } from "@/firebase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function requireAdminAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;

  if (!session) {
    console.log(
      "No session cookie found, redirecting to /login",
      cookieStore.getAll()
    );
    redirect("/login");
  }

  try {
    // サーバーサイドでセッションCookieの検証
    const decodedClaim = await serverFirebase.auth.verifySessionCookie(
      session,
      true
    );

    if (decodedClaim.admin !== true) {
      console.log("Missing admin claim in decoded token:", decodedClaim);
      throw new Error("Missing admin claim.");
    }
  } catch (error) {
    console.error("Invalid session cookie:", error);
    redirect("/login");
  }
}
