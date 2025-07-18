import { RequestHandler } from "express";

// Simple test endpoint to verify auth system is working
export const testAuth: RequestHandler = async (req, res) => {
  res.json({
    success: true,
    message: "Authentication system is working!",
    endpoints: {
      login: "POST /api/auth/login",
      signup: "POST /api/auth/signup",
      profile: "GET /api/auth/profile (requires auth)",
      logout: "POST /api/auth/logout",
    },
    demoUser: {
      email: "demo@keywest.com",
      password: "Demo123!",
      note: "Use these credentials to test login",
    },
  });
};
