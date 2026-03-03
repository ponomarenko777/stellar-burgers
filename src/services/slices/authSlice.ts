import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  loginUserApi,
  registerUserApi,
  getUserApi,
  logoutApi,
  updateUserApi,
  type TLoginData,
  type TRegisterData
} from '@api';
import type { TUser } from '@utils-types';
import { setCookie, getCookie, deleteCookie } from '../../utils/cookie';

type TAuthState = {
  isAuthChecked: boolean;
  user: TUser | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TAuthState = {
  isAuthChecked: false,
  user: null,
  isLoading: false,
  error: null
};

const saveTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('refreshToken', refreshToken);
  setCookie('accessToken', accessToken);
};

export const registerThunk = createAsyncThunk<TUser, TRegisterData>(
  'auth/register',
  async (data) => {
    const res = await registerUserApi(data);
    saveTokens(res.accessToken, res.refreshToken);
    return res.user;
  }
);

export const loginThunk = createAsyncThunk<TUser, TLoginData>(
  'auth/login',
  async (data) => {
    const res = await loginUserApi(data);
    saveTokens(res.accessToken, res.refreshToken);
    return res.user;
  }
);

export const getUserThunk = createAsyncThunk<TUser>(
  'auth/getUser',
  async () => {
    const res = await getUserApi();
    if (!res.success) return Promise.reject(res);
    return res.user;
  }
);

export const updateUserThunk = createAsyncThunk<
  TUser,
  { name?: string; email?: string; password?: string }
>('auth/updateUser', async (data) => {
  const res = await updateUserApi(data);
  if (!res.success) return Promise.reject(res);
  return res.user;
});

export const checkUserAuthThunk = createAsyncThunk<TUser | null>(
  'auth/checkUserAuth',
  async () => {
    const token = getCookie('accessToken');

    if (!token) return null;

    const res = await getUserApi();
    if (!res.success) return Promise.reject(res);

    return res.user;
  }
);

export const logoutThunk = createAsyncThunk('auth/logout', async () => {
  await logoutApi();
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
  return true;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(registerThunk.pending, (s) => {
        s.isLoading = true;
        s.error = null;
      })
      .addCase(registerThunk.fulfilled, (s, a) => {
        s.isLoading = false;
        s.user = a.payload;
        s.isAuthChecked = true;
      })
      .addCase(registerThunk.rejected, (s, a) => {
        s.isLoading = false;
        s.error = a.error.message ?? 'Ошибка регистрации';
        s.isAuthChecked = true;
      })
      .addCase(loginThunk.pending, (s) => {
        s.isLoading = true;
        s.error = null;
      })
      .addCase(loginThunk.fulfilled, (s, a) => {
        s.isLoading = false;
        s.user = a.payload;
        s.isAuthChecked = true;
      })
      .addCase(loginThunk.rejected, (s, a) => {
        s.isLoading = false;
        s.error = a.error.message ?? 'Ошибка входа';
        s.isAuthChecked = true;
      })
      .addCase(getUserThunk.pending, (s) => {
        s.isLoading = true;
        s.error = null;
      })
      .addCase(getUserThunk.fulfilled, (s, a) => {
        s.isLoading = false;
        s.user = a.payload;
        s.isAuthChecked = true;
      })
      .addCase(getUserThunk.rejected, (s, a) => {
        s.isLoading = false;
        s.user = null;
        s.error = a.error.message ?? 'Не удалось получить пользователя';
        s.isAuthChecked = true;
      })
      .addCase(updateUserThunk.pending, (s) => {
        s.isLoading = true;
        s.error = null;
      })
      .addCase(updateUserThunk.fulfilled, (s, a) => {
        s.isLoading = false;
        s.user = a.payload;
      })
      .addCase(updateUserThunk.rejected, (s, a) => {
        s.isLoading = false;
        s.error = a.error.message ?? 'Не удалось обновить профиль';
      })
      .addCase(checkUserAuthThunk.pending, (s) => {
        s.isLoading = true;
        s.error = null;
      })
      .addCase(checkUserAuthThunk.fulfilled, (s, a) => {
        s.isLoading = false;
        s.isAuthChecked = true;
        s.user = a.payload;
      })
      .addCase(checkUserAuthThunk.rejected, (s, a) => {
        s.isLoading = false;
        s.isAuthChecked = true;
        s.user = null;
        s.error = a.error.message ?? 'Ошибка проверки авторизации';
      })
      .addCase(logoutThunk.fulfilled, (s) => {
        s.user = null;
        s.isAuthChecked = true;
        s.isLoading = false;
      });
  }
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;
