import profileOrdersReducer, {
  clearProfileOrders,
  fetchProfileOrdersThunk
} from './profileOrdersSlice';

describe('profileOrdersSlice', () => {
  const orders = [
    {
      _id: '1',
      ingredients: ['a', 'b'],
      status: 'done',
      name: 'Burger',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
      number: 555
    }
  ];

  it('should handle pending', () => {
    const state = profileOrdersReducer(
      undefined,
      fetchProfileOrdersThunk.pending('', undefined)
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fulfilled', () => {
    const state = profileOrdersReducer(
      undefined,
      fetchProfileOrdersThunk.fulfilled(orders, '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(orders);
  });

  it('should handle rejected', () => {
    const state = profileOrdersReducer(
      undefined,
      fetchProfileOrdersThunk.rejected(
        new Error('Ошибка заказов'),
        '',
        undefined
      )
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка заказов');
  });

  it('should clear profile orders', () => {
    const prevState = {
      orders,
      isLoading: true,
      error: 'Ошибка'
    };

    const state = profileOrdersReducer(prevState, clearProfileOrders());

    expect(state).toEqual({
      orders: [],
      isLoading: false,
      error: null
    });
  });
});
