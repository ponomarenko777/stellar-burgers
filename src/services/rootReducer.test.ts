import { rootReducer } from './rootReducer';

describe('rootReducer', () => {
  it('should initialize the store correctly', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });

    expect(state).toEqual({
      ingredients: {
        items: [],
        isLoading: false,
        error: null
      },
      auth: {
        isAuthChecked: false,
        user: null,
        isLoading: false,
        error: null
      },
      feeds: {
        orders: [],
        total: 0,
        totalToday: 0,
        isLoading: false,
        error: null
      },
      burgerConstructor: {
        bun: null,
        items: []
      },
      order: {
        orderRequest: false,
        orderModalData: null,
        error: null
      },
      profileOrders: {
        orders: [],
        isLoading: false,
        error: null
      }
    });
  });
});
