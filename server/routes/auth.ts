import { RequestHandler } from "express";
import { z } from "zod";

// In-memory user storage (in production, use a proper database)
interface User {
  id: string;
  email: string;
  password: string; // In production, this should be hashed
  firstName: string;
  lastName: string;
  phone?: string;
  createdAt: Date;
}

// Simple in-memory storage for demo purposes
const users: User[] = [];

// Demo user for testing
users.push({
  id: "demo-user-1",
  email: "demo@keywest.com",
  password: "Demo123!",
  firstName: "Demo",
  lastName: "User",
  phone: "+1 (312) 217-4976",
  createdAt: new Date(),
});

// Validation schemas
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain uppercase, lowercase, and number",
    ),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().optional(),
});

// Simple JWT-like token generation (in production, use proper JWT library)
const generateToken = (user: User): string => {
  const tokenData = {
    id: user.id,
    email: user.email,
    timestamp: Date.now(),
  };
  return Buffer.from(JSON.stringify(tokenData)).toString("base64");
};

// Verify token (simplified for demo)
export const verifyToken = (token: string): any => {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const tokenData = JSON.parse(decoded);

    // In production, check expiration and validate signature
    const user = users.find((u) => u.id === tokenData.id);
    return user ? { ...user, password: undefined } : null;
  } catch {
    return null;
  }
};

// Hash password (simplified - in production use bcrypt)
const hashPassword = (password: string): string => {
  // This is a simple demo hash - use bcrypt in production
  return Buffer.from(password).toString("base64");
};

// Verify password
const verifyPassword = (password: string, hashedPassword: string): boolean => {
  // This is a simple demo verification - use bcrypt in production
  return Buffer.from(password).toString("base64") === hashedPassword;
};

export const handleLogin: RequestHandler = async (req, res) => {
  try {
    // Validate request body
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid input data",
        errors: result.error.issues,
      });
    }

    const { email, password } = result.data;

    // Find user by email
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Verify password
    const isValidPassword = verifyPassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate token
    const token = generateToken(user);

    // Return success response
    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const handleSignup: RequestHandler = async (req, res) => {
  try {
    // Validate request body
    const result = signupSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid input data",
        errors: result.error.issues,
      });
    }

    const { email, password, firstName, lastName, phone } = result.data;

    // Check if user already exists
    const existingUser = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Create new user
    const newUser: User = {
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      email: email.toLowerCase(),
      password: hashPassword(password),
      firstName,
      lastName,
      phone,
      createdAt: new Date(),
    };

    // Save user
    users.push(newUser);

    // Generate token
    const token = generateToken(newUser);

    // Return success response
    res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        phone: newUser.phone,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const handleProfile: RequestHandler = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const token = authHeader.substring(7);
    const user = verifyToken(token);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const handleLogout: RequestHandler = async (req, res) => {
  // For JWT tokens, logout is typically handled client-side by removing the token
  // In a more sophisticated setup, you might maintain a blacklist of tokens

  res.json({
    success: true,
    message: "Logged out successfully",
  });
};

// Middleware to protect routes
export const requireAuth: RequestHandler = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const token = authHeader.substring(7);
    const user = verifyToken(token);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // Add user to request object
    (req as any).user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({
      success: false,
      message: "Authentication error",
    });
  }
};
