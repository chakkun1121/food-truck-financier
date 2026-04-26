import { serverFirebase } from "@/firebase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function requireAdminAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;

  if (!session) {
    redirect("/admin/login");
  }

  try {
    // サーバーサイドでセッションCookieの検証
    const decodedClaim = await serverFirebase.auth.verifySessionCookie(session, true);
    
    if (decodedClaim.admin !== true) {
      throw new Error("Missing admin claim.");
    }
  } catch (error) {
    console.error("Invalid session cookie:", error);
    redirect("/admin/login");
  }
}
