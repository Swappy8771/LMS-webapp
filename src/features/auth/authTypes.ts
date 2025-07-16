export type UserRole = 'student' | 'instructor' | 'admin';

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role: UserRole;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  role: string;
  token: string;
  user: User;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}
