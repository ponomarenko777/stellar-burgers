import orderReducer, {
  clearOrderModalData,
  createOrderThunk
} from './orderSlice';

describe('orderSlice', () => {
  const order = {
    _id: '1',
    ingredients: ['a', 'b'],
    status: 'done',
    name: 'Burger',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    number: 12345
  };

  it('should handle pending', () => {
    const state = orderReducer(
      undefined,
      createOrderThunk.pending('', ['bun1', 'main1'])
    );

    expect(state.orderRequest).toBe(true);
  });

  it('should handle fulfilled', () => {
    const state = orderReducer(
      undefined,
      createOrderThunk.fulfilled(order, '', ['bun1', 'main1'])
    );

    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(order);
  });

  it('should handle rejected', () => {
    const state = orderReducer(
      undefined,
      createOrderThunk.rejected(new Error('Ошибка'), '', ['bun1', 'main1'])
    );

    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe('Ошибка оформления заказа');
  });

  it('should clear order modal data', () => {
    const prevState = {
      orderRequest: false,
      orderModalData: order,
      error: null
    };

    const state = orderReducer(prevState, clearOrderModalData());

    expect(state.orderModalData).toBeNull();
  });
});
