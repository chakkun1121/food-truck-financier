import { initializeApp } from "firebase-admin/app";
import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";

export const app = initializeApp({
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
});
export const db = admin.database(app);
export const auth = getAuth(app);
