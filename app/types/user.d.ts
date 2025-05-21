// types/user.d.ts

export interface User {
  id: string;
  username: string;
  email: string;
  createdAt?: string; // ISO date string, optional
}
