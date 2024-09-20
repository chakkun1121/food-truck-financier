import "server-only";

import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getDatabase } from "firebase-admin/database";

if (!getApps()?.length) {
  initializeApp({
    credential: cert(
      JSON.parse(JSON.stringify(process.env.FIREBASE_SERVICE_ACCOUNT_KEY))
    ),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
  });
}

export const serverFirebase = {
  auth: getAuth(),
  db: getDatabase()
};
