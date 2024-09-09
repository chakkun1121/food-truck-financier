import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import { getAuth } from 'firebase-admin/auth';
import 'dotenv/config'

if (!getApps()?.length) {
  initializeApp({
    credential: cert(
      JSON.parse(JSON.stringify(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
      )
    ),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
  });
}

export const db = getDatabase();
export const auth = getAuth();