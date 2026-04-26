"use client";

import { clientFirebase } from "@/firebase/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AdminRedirectGuard() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = clientFirebase.auth.onIdTokenChanged(async user => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        if (idTokenResult.claims.admin) {
          router.push("/admin");
        }
      }
    });

    return () => unsubscribe();
  }, [router]);

  return null;
}
