import { RootState } from '@store';

export const selectUserData = (state: RootState) => state.user.user;
export const selectRegisterError = (state: RootState) =>
  state.user.registerError;
export const selectIsAuthenticated = (state: RootState) =>
  state.user.isAuthenticated;
export const selectisAuthChecked = (state: RootState) =>
  state.user.isAuthChecked;
