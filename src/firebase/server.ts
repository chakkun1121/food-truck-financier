import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getDatabase } from "firebase-admin/database";

const serviceAccountStr = process.env.FIREBASE_SERVICE_ACCOUNT_KEY || "{}";
let serviceAccount;
try {
  serviceAccount = JSON.parse(serviceAccountStr);
  if (serviceAccount.private_key) {
    // 秘密鍵の改行文字がエスケープされている場合の対応と、万一スペースが欠損している場合の修正
    serviceAccount.private_key = serviceAccount.private_key
      .replace(/\\n/g, "\n")
      .replace(/BEGINPRIVATEKEY/g, "BEGIN PRIVATE KEY")
      .replace(/ENDPRIVATEKEY/g, "END PRIVATE KEY");
  }
} catch (error) {
  console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY", error);
  serviceAccount = {};
}

if (!getApps()?.length) {
  initializeApp({
    credential: cert(serviceAccount),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
  });
}

export const serverFirebase = {
  auth: getAuth(),
  db: getDatabase()
};
