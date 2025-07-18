import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, AuthResponse } from "@shared/api";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    email: string,
    password: string,
    rememberMe?: boolean,
  ) => Promise<AuthResponse>;
  signup: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }) => Promise<AuthResponse>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored authentication on app startup
    const checkStoredAuth = async () => {
      try {
        const token =
          localStorage.getItem("auth_token") ||
          sessionStorage.getItem("auth_token");
        const storedUser =
          localStorage.getItem("user") || sessionStorage.getItem("user");

        if (token && storedUser) {
          const userData = JSON.parse(storedUser);

          // Verify token with server
          const response = await fetch("/api/auth/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              setUser(data.user);
            } else {
              // Token invalid, clear storage
              clearAuthStorage();
            }
          } else {
            // Token invalid, clear storage
            clearAuthStorage();
          }
        }
      } catch (error) {
        console.error("Auth check error:", error);
        clearAuthStorage();
      } finally {
        setIsLoading(false);
      }
    };

    checkStoredAuth();
  }, []);

  const clearAuthStorage = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("auth_token");
    sessionStorage.removeItem("user");
    setUser(null);
  };

  const login = async (
    email: string,
    password: string,
    rememberMe: boolean = false,
  ): Promise<AuthResponse> => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data: AuthResponse = await response.json();

      if (data.success && data.token && data.user) {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("auth_token", data.token);
        storage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
      }

      return data;
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: "Network error. Please try again.",
      };
    }
  };

  const signup = async (signupData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }): Promise<AuthResponse> => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const data: AuthResponse = await response.json();

      if (data.success && data.token && data.user) {
        localStorage.setItem("auth_token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
      }

      return data;
    } catch (error) {
      console.error("Signup error:", error);
      return {
        success: false,
        message: "Network error. Please try again.",
      };
    }
  };

  const logout = async () => {
    try {
      const token =
        localStorage.getItem("auth_token") ||
        sessionStorage.getItem("auth_token");

      if (token) {
        // Notify server of logout
        await fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearAuthStorage();
    }
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    const storage = localStorage.getItem("auth_token")
      ? localStorage
      : sessionStorage;
    storage.setItem("user", JSON.stringify(updatedUser));
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
