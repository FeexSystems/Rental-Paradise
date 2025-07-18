import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { scrapeProperties } from "./routes/scrape-properties";
import { scrapeImages } from "./routes/scrape-images";
import {
  handleLogin,
  handleSignup,
  handleProfile,
  handleLogout,
  requireAuth,
} from "./routes/auth";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  app.get("/api/demo", handleDemo);
  app.get("/api/scrape-properties", scrapeProperties);
  app.get("/api/scrape-images", scrapeImages);

  // Authentication routes
  app.post("/api/auth/login", handleLogin);
  app.post("/api/auth/signup", handleSignup);
  app.get("/api/auth/profile", requireAuth, handleProfile);
  app.post("/api/auth/logout", handleLogout);

  return app;
}
