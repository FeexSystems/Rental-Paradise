/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Scraped property interface
 */
export interface ScrapedProperty {
  id: string;
  title: string;
  price: number;
  rating?: number;
  reviews?: number;
  guests?: number;
  bedrooms?: number;
  bathrooms?: number;
  image: string;
  location: string;
  amenities: string[];
  host?: string;
  description?: string;
  source: string;
  lastUpdated?: string;
}

/**
 * Scrape properties API response
 */
export interface ScrapePropertiesResponse {
  success: boolean;
  count: number;
  properties: ScrapedProperty[];
  timestamp: string;
  error?: string;
  message?: string;
}

/**
 * Authentication interfaces
 */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
  error?: string;
}

export interface AuthError {
  success: false;
  error: string;
  message: string;
}
