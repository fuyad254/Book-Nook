import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  /** Optional: falls back to the current origin when not set. */
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
});
