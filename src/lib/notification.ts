import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { auth } from "./firebase";

export class NotificationService {
  static async requestPermission(): Promise<boolean> {
    try {
      const permission = await Notification.requestPermission();
      return permission === "granted";
    } catch (error) {
      console.error("Notification permission error:", error);
      return false;
    }
  }

  static async setupFCM() {
    try {
      const messaging = getMessaging();
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      });

      if (token && auth.currentUser) {
        // Store the token in your database for the current user
        // This is where you'd make an API call to your backend
        console.log("FCM Token:", token);
      }

      // Handle incoming messages when app is in foreground
      onMessage(messaging, (payload) => {
        new Notification(payload.notification?.title || "New Message", {
          body: payload.notification?.body,
          icon: "/logo.png",
        });
      });

      return true;
    } catch (error) {
      console.error("FCM setup error:", error);
      return false;
    }
  }
}
