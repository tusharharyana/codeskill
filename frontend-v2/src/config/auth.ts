export const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.trim() || "";

// Temporarily disabled for local admin/student login debugging.
// Re-enable this when Google OAuth is configured and working locally.
export const googleOAuthEnabled = false;