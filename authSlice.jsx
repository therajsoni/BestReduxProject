import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, signup, logout } from "./authAPI";

export const loginUser = createAsyncThunk("auth/login", async (credentials) => {
    const response = await login(credentials);
    return response.data;
});

export const signupUser = createAsyncThunk("auth/signup", async (userData) => {
    const response = await signup(userData);
    return response.data;
});

export const logoutUser = createAsyncThunk("auth/logout", async () => {
    await logout();
});


const authSlice = createSlice({
    name: 'auth',
    initialState: {
      user: null,
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.pending, (state) => {
          state.loading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(signupUser.fulfilled, (state, action) => {
          state.user = action.payload;
        })
        .addCase(logoutUser.fulfilled, (state) => {
          state.user = null;
        });
    },
  });
  
  export default authSlice.reducer;