/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type {
  AuthState,
  RegisterPayload,
  LoginPayload,
  AuthResponse,
  User
} from './authTypes';

import {
  loginUserAPI,
  registerUserAPI,
  getMeAPI
} from './authAPI';

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
};

// 🔐 Register
export const registerUser = createAsyncThunk<void, RegisterPayload>(
  'auth/register',
  async (data, thunkAPI) => {
    try {
      await registerUserAPI(data);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || 'Registration failed';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 🔓 Login
export const loginUser = createAsyncThunk<AuthResponse, LoginPayload>(
  'auth/login',
  async (data, thunkAPI) => {
    try {
      const res = await loginUserAPI(data);
      // Save token locally
      localStorage.setItem('token', res.token);
      return res;
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || 'Login failed';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 🙋 Get Current User
export const getCurrentUser = createAsyncThunk<User>(
  'auth/me',
  async (_, thunkAPI) => {
    try {
      return await getMeAPI();
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || 'Failed to fetch user';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
    resetError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // 🔐 Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔓 Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🙋 Get Me
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, resetError } = authSlice.actions;
export default authSlice.reducer;
