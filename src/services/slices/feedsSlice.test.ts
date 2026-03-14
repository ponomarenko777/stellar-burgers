import feedsReducer, { fetchFeedsThunk } from './feedsSlice';

describe('feedsSlice', () => {
  const payload = {
    success: true,
    orders: [
      {
        _id: '1',
        ingredients: ['a', 'b'],
        status: 'done',
        name: 'Burger',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        number: 123
      }
    ],
    total: 10,
    totalToday: 2
  };

  it('should handle pending', () => {
    const state = feedsReducer(
      undefined,
      fetchFeedsThunk.pending('', undefined)
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fulfilled', () => {
    const state = feedsReducer(
      undefined,
      fetchFeedsThunk.fulfilled(payload, '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(payload.orders);
    expect(state.total).toBe(10);
    expect(state.totalToday).toBe(2);
  });

  it('should handle rejected', () => {
    const state = feedsReducer(
      undefined,
      fetchFeedsThunk.rejected(new Error('Ошибка ленты'), '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка ленты');
  });
});
