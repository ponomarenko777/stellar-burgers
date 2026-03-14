import authReducer, {
  clearAuthError,
  loginThunk,
  getUserThunk
} from './authSlice';

describe('authSlice', () => {
  const user = {
    email: 'test@test.ru',
    name: 'Test'
  };

  it('should handle login pending', () => {
    const state = authReducer(
      undefined,
      loginThunk.pending('', {
        email: 'test@test.ru',
        password: '123456'
      })
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle login fulfilled', () => {
    const state = authReducer(
      undefined,
      loginThunk.fulfilled(user, '', {
        email: 'test@test.ru',
        password: '123456'
      })
    );

    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(user);
    expect(state.isAuthChecked).toBe(true);
  });

  it('should handle getUser rejected', () => {
    const state = authReducer(
      undefined,
      getUserThunk.rejected(new Error('Ошибка пользователя'), '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.user).toBeNull();
    expect(state.error).toBe('Ошибка пользователя');
    expect(state.isAuthChecked).toBe(true);
  });

  it('should clear auth error', () => {
    const prevState = {
      isAuthChecked: false,
      user: null,
      isLoading: false,
      error: 'Ошибка'
    };

    const state = authReducer(prevState, clearAuthError());

    expect(state.error).toBeNull();
  });
});
