"use client";

import { AuthProvider } from "@/context/AuthContext";
import { ReactNode } from "react";
// Google OAuth is temporarily disabled for local admin/student login debugging.
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import { googleClientId, googleOAuthEnabled } from "@/config/auth";

import { ThemeProvider } from "@/context/ThemeContext";

import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: ReactNode }) {
  const content = (
    <AuthProvider>
      {children}
      <Toaster position="top-center" />
    </AuthProvider>
  );

  return (
    <ThemeProvider defaultTheme="light">
      {content}
    </ThemeProvider>
  );
}
