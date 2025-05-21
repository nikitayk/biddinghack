// services/userService.ts

export interface User {
  id: string;
  username: string;
  email: string;
  createdAt?: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: User;
  error?: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ProfileUpdatePayload {
  username: string;
  email: string;
}

// Helper to get API base URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

// --- Registration ---
export async function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

// --- Login ---
export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

// --- Get Profile ---
export async function getUserProfile(token: string): Promise<{ success: boolean; user?: User; error?: string }> {
  const res = await fetch(`${API_URL}/api/user/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

// --- Update Profile ---
export async function updateUserProfile(
  token: string,
  payload: ProfileUpdatePayload
): Promise<{ success: boolean; user?: User; error?: string }> {
  const res = await fetch(`${API_URL}/api/user/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return res.json();
}
