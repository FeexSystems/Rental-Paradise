import { RequestHandler } from "express";
import { LoginRequest, SignupRequest, AuthResponse, User } from "@shared/api";

// Mock user database - in production use a real database
const users: (User & { password: string })[] = [
  {
    id: "1",
    email: "demo@keywest.com",
    password: "demo123", // In production, hash passwords with bcrypt
    firstName: "Demo",
    lastName: "User",
    phone: "+1 (312) 217-4976",
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  },
];

// Helper to find user by email
const findUserByEmail = (email: string) =>
  users.find((user) => user.email.toLowerCase() === email.toLowerCase());

// Helper to generate JWT token (simplified - use a proper JWT library in production)
const generateToken = (userId: string) => {
  const payload = { userId, timestamp: Date.now() };
  return Buffer.from(JSON.stringify(payload)).toString("base64");
};

// Helper to create user response (without password)
const createUserResponse = (user: User & { password: string }): User => ({
  id: user.id,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  phone: user.phone,
  createdAt: user.createdAt,
  lastLogin: user.lastLogin,
});

/**
 * Login handler
 */
export const handleLogin: RequestHandler = (req, res) => {
  try {
    const { email, password, rememberMe }: LoginRequest = req.body;

    // Validate input
    if (!email || !password) {
      const response: AuthResponse = {
        success: false,
        error: "Missing email or password",
        message: "Please provide both email and password",
      };
      return res.status(400).json(response);
    }

    // Find user
    const user = findUserByEmail(email);
    if (!user || user.password !== password) {
      const response: AuthResponse = {
        success: false,
        error: "Invalid credentials",
        message: "Email or password is incorrect",
      };
      return res.status(401).json(response);
    }

    // Update last login
    user.lastLogin = new Date().toISOString();

    // Generate token
    const token = generateToken(user.id);

    const response: AuthResponse = {
      success: true,
      user: createUserResponse(user),
      token,
      message: "Login successful",
    };

    res.json(response);
  } catch (error) {
    console.error("Login error:", error);
    const response: AuthResponse = {
      success: false,
      error: "Internal server error",
      message: "An error occurred during login",
    };
    res.status(500).json(response);
  }
};

/**
 * Signup handler
 */
export const handleSignup: RequestHandler = (req, res) => {
  try {
    const { email, password, firstName, lastName, phone }: SignupRequest =
      req.body;

    // Validate input
    if (!email || !password || !firstName || !lastName) {
      const response: AuthResponse = {
        success: false,
        error: "Missing required fields",
        message: "Please provide email, password, first name, and last name",
      };
      return res.status(400).json(response);
    }

    // Check if user already exists
    if (findUserByEmail(email)) {
      const response: AuthResponse = {
        success: false,
        error: "User already exists",
        message: "An account with this email already exists",
      };
      return res.status(409).json(response);
    }

    // Create new user
    const newUser = {
      id: (users.length + 1).toString(),
      email: email.toLowerCase(),
      password, // In production, hash with bcrypt
      firstName,
      lastName,
      phone,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };

    users.push(newUser);

    // Generate token
    const token = generateToken(newUser.id);

    const response: AuthResponse = {
      success: true,
      user: createUserResponse(newUser),
      token,
      message: "Account created successfully",
    };

    res.status(201).json(response);
  } catch (error) {
    console.error("Signup error:", error);
    const response: AuthResponse = {
      success: false,
      error: "Internal server error",
      message: "An error occurred during signup",
    };
    res.status(500).json(response);
  }
};

/**
 * Get current user handler (for token validation)
 */
export const handleGetUser: RequestHandler = (req, res) => {
  try {
    // In a real app, extract and validate JWT token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      const response: AuthResponse = {
        success: false,
        error: "No token provided",
        message: "Authorization token is required",
      };
      return res.status(401).json(response);
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    try {
      const payload = JSON.parse(Buffer.from(token, "base64").toString());
      const user = users.find((u) => u.id === payload.userId);

      if (!user) {
        const response: AuthResponse = {
          success: false,
          error: "Invalid token",
          message: "User not found",
        };
        return res.status(401).json(response);
      }

      const response: AuthResponse = {
        success: true,
        user: createUserResponse(user),
        message: "User retrieved successfully",
      };

      res.json(response);
    } catch (tokenError) {
      const response: AuthResponse = {
        success: false,
        error: "Invalid token",
        message: "Token is malformed",
      };
      return res.status(401).json(response);
    }
  } catch (error) {
    console.error("Get user error:", error);
    const response: AuthResponse = {
      success: false,
      error: "Internal server error",
      message: "An error occurred while retrieving user",
    };
    res.status(500).json(response);
  }
};

/**
 * Logout handler
 */
export const handleLogout: RequestHandler = (req, res) => {
  // In a real app with JWT blacklisting or session management,
  // you would invalidate the token here
  const response: AuthResponse = {
    success: true,
    message: "Logged out successfully",
  };
  res.json(response);
};
