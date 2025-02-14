declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_YOUTUBE_LIVE_ID: string;
      NEXT_PUBLIC_FACEBOOK_LIVE_URL: string;
      NEXT_PUBLIC_FACEBOOK_APP_ID: string;
    }
  }
}

export {};
