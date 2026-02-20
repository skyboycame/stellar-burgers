import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TAuthResponse,
  TLoginData,
  TRegisterData,
  TUserResponse,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../../src/utils/cookie';

interface UserState {
  user: TUser | null;
  isAuthenticated: boolean;
  isAuthChecked: boolean;
  loginRequest: boolean;
  loginError: string | null;
  registerRequest: boolean;
  registerError: string | undefined;
  updateRequest: boolean;
  updateError: string | null;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isAuthChecked: false,
  loginRequest: false,
  loginError: null,
  registerRequest: false,
  registerError: undefined,
  updateRequest: false,
  updateError: null
};

export const loginUser = createAsyncThunk<
  TAuthResponse,
  TLoginData,
  { rejectValue: string }
>('@@user/login', async (data, { rejectWithValue }) => {
  try {
    const response = await loginUserApi(data);

    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);

    return response;
  } catch {
    return rejectWithValue('Ошибка авторизации');
  }
});

export const registerUser = createAsyncThunk<
  TAuthResponse,
  TRegisterData,
  { rejectValue: string }
>('@@user/register', async (data, { rejectWithValue }) => {
  try {
    const response = await registerUserApi(data);

    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);

    return response;
  } catch {
    return rejectWithValue('Ошибка регистрации');
  }
});

export const checkAuthUser = createAsyncThunk<
  TUserResponse,
  void,
  { rejectValue: string }
>('@@user/checkAuth', async (_, { rejectWithValue }) => {
  try {
    return await getUserApi();
  } catch {
    return rejectWithValue('Ошибка CheckAuthUser');
  }
});

export const logoutUser = createAsyncThunk<
  { success: boolean },
  void,
  { rejectValue: string }
>('@@user/logout', async (_, { rejectWithValue }) => {
  try {
    const response = await logoutApi();

    localStorage.removeItem('refreshToken');
    deleteCookie('accessToken');

    return response;
  } catch {
    return rejectWithValue('Ошибка Выхода(logout)');
  }
});

export const updateUserData = createAsyncThunk<
  TUserResponse,
  Partial<TRegisterData>,
  { rejectValue: string }
>('@@user/updateUserData', async (data, { rejectWithValue }) => {
  try {
    return await updateUserApi(data);
  } catch {
    return rejectWithValue('Ошибка обновления данных');
  }
});

const userSlice = createSlice({
  name: '@@user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginRequest = true;
        state.loginError = null;
        state.isAuthChecked = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginRequest = false;

        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginRequest = false;
        state.loginError = action.payload || 'Ошибка авторизации';
        state.isAuthChecked = true;
      });

    builder
      .addCase(registerUser.pending, (state) => {
        state.registerRequest = true;
        state.registerError = undefined;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerRequest = false;

        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerRequest = false;
        state.registerError = action.payload || 'Ошибка регистрации';
        state.isAuthChecked = true;
      });

    builder
      .addCase(checkAuthUser.pending, (state, action) => {
        state.isAuthChecked = false;
      })
      .addCase(checkAuthUser.fulfilled, (state, action) => {
        state.registerError = undefined;
        state.isAuthChecked = true;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(checkAuthUser.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
      });
    builder
      .addCase(logoutUser.pending, (state, action) => {
        state.isAuthChecked = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.registerError = undefined;
        state.loginRequest = false;
        state.isAuthChecked = true;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isAuthenticated = false;
        state.isAuthChecked = true;
        state.user = null;
      });
    builder
      .addCase(updateUserData.pending, (state) => {
        state.updateRequest = true;
        state.updateError = null;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.updateRequest = false;
        state.user = action.payload.user;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.updateRequest = false;
        state.updateError = action.payload || 'Ошибка обновления профиля';
      });
  }
});

export const {} = userSlice.actions;
export const userReducer = userSlice.reducer;
