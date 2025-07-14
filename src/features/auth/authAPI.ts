// src/features/auth/authAPI.ts

import axios from '../../services/axios';
import type {
    RegisterPayload,
    LoginPayload,
    AuthResponse,
    User
} from './authTypes';

// Register
export const registerUserAPI = async (data: RegisterPayload): Promise<void> => {
  await axios.post('/auth/register', data);
};

// Login
export const loginUserAPI = async (data: LoginPayload): Promise<AuthResponse> => {
  const res = await axios.post<AuthResponse>('/auth/login', data);
  return res.data;
};

// Get Logged-in User
export const getMeAPI = async (): Promise<User> => {
  const res = await axios.get<{ user: User }>('/auth/me');
  return res.data.user;
};
