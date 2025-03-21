import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

// Initialize Firebase Admin
function initAdmin() {
  const apps = getApps();

  if (!apps.length) {
    // Validate required environment variables
    if (!process.env.FIREBASE_PROJECT_ID) {
      throw new Error(
        "FIREBASE_PROJECT_ID is not set in environment variables"
      );
    }
    if (!process.env.FIREBASE_CLIENT_EMAIL) {
      throw new Error(
        "FIREBASE_CLIENT_EMAIL is not set in environment variables"
      );
    }
    if (!process.env.FIREBASE_PRIVATE_KEY) {
      throw new Error(
        "FIREBASE_PRIVATE_KEY is not set in environment variables"
      );
    }

    try {
      initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        }),
      });
    } catch (error) {
      console.error("Error initializing Firebase Admin:", error);
      throw error; // Re-throw to prevent silent failures
    }
  }
}

// Initialize Firebase Admin
initAdmin();

// Get Firestore instance
export const db = getFirestore();

// Get Auth instance
export const auth = getAuth();
