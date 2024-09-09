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
    databaseURL: "https://food-truck-financier-default-rtdb.asia-southeast1.firebasedatabase.app"
  });
}

export const db = getDatabase();
export const auth = getAuth();