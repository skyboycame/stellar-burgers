import { TUser } from '@utils-types';
import {
  checkAuthUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUserData,
  userReducer,
  UserState
} from './user-slice';

describe('user-slice test', () => {
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

  const mockUser: TUser = {
    email: 'sdgdsgs',
    name: 'fasdfdaf'
  };

  test('изменение loginRequest при login pending', () => {
    const action = {
      type: loginUser.pending.type
    };
    const state = userReducer(initialState, action);
    expect(state.loginRequest).toBe(true);
  });

  test('изменение user при login fulfilled', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: { user: mockUser }
    };
    const state = userReducer(initialState, action);
    expect(state.user).toEqual(mockUser);
  });
  test('изменение loginError при login rejected', () => {
    const action = {
      type: loginUser.rejected.type,
      payload: 'ошибка'
    };
    const state = userReducer(initialState, action);
    expect(state.loginError).toBe('ошибка');
  });

  test('изменение registerRequest при register pending', () => {
    const action = {
      type: registerUser.pending.type
    };
    const state = userReducer(initialState, action);
    expect(state.registerRequest).toBe(true);
  });

  test('изменение user при register fulfilled', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: { user: mockUser }
    };
    const state = userReducer(initialState, action);
    expect(state.user).toEqual(mockUser);
  });

  test('изменение registerError при register rejected', () => {
    const action = {
      type: registerUser.rejected.type,
      payload: 'ошибка'
    };
    const state = userReducer(initialState, action);
    expect(state.registerError).toBe('ошибка');
  });

  test('изменение isAuthChecked при checkAuthUser pending', () => {
    const action = {
      type: checkAuthUser.pending.type
    };
    const state = userReducer(initialState, action);
    expect(state.isAuthChecked).toBe(false);
  });
  test('изменение isAuthenticated, user при checkAuthUser fulfilled', () => {
    const action = {
      type: checkAuthUser.fulfilled.type,
      payload: { user: mockUser }
    };
    const state = userReducer(initialState, action);
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(mockUser);
  });
  test('изменение user при checkAuthUser rejected', () => {
    const action = {
      type: checkAuthUser.rejected.type,
      payload: null
    };
    const state = userReducer(initialState, action);
    expect(state.user).toBe(null);
  });
  test('изменение user при logout fulfilled', () => {
    const action = {
      type: logoutUser.fulfilled.type,
      payload: null
    };
    const state = userReducer(initialState, action);
    expect(state.user).toBe(null);
  });
  test('изменение isAuthenticated при logout fulfilled', () => {
    const action = {
      type: logoutUser.fulfilled.type
    };
    const state = userReducer(initialState, action);
    expect(state.isAuthenticated).toBe(false);
  });
  test('изменение isAuthenticated при logout rejected', () => {
    const action = {
      type: logoutUser.rejected.type
    };
    const state = userReducer(initialState, action);
    expect(state.isAuthenticated).toBe(false);
  });

  test('изменение updateRequest при updateUserData pending', () => {
    const action = {
      type: updateUserData.pending.type
    };
    const state = userReducer(initialState, action);
    expect(state.updateRequest).toBe(true);
  });

  test('изменение user при updateUserData fulfilled', () => {
    const action = {
      type: updateUserData.fulfilled.type,
      payload: { user: mockUser }
    };
    const state = userReducer(initialState, action);
    expect(state.user).toEqual(mockUser);
  });

  test('изменение updateError при updateUserData rejected', () => {
    const action = {
      type: updateUserData.rejected.type,
      payload: 'ошибка'
    };
    const state = userReducer(initialState, action);
    expect(state.updateError).toBe('ошибка');
  });
});
