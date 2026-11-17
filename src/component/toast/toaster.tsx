"use client";

import { Toaster } from "react-hot-toast";

/**
 * Global toast host. Mounted once in the root layout so every page can call
 * `toast.success(...)` / `toast.error(...)` from react-hot-toast.
 */
export default function AppToaster() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3500,
        style: {
          background: "#151f19",
          color: "#e6f5e9",
          border: "1px solid rgba(167, 243, 208, 0.25)",
          borderRadius: "12px",
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.35)",
          fontSize: "14px",
        },
        success: {
          iconTheme: { primary: "#91c99e", secondary: "#102017" },
        },
        error: {
          iconTheme: { primary: "#f87171", secondary: "#2a1214" },
        },
      }}
    />
  );
}
