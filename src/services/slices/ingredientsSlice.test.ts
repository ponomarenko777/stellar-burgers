import ingredientsReducer, { fetchIngredientsThunk } from './ingredientsSlice';

describe('ingredientsSlice', () => {
  const mockIngredients = [
    {
      _id: '1',
      name: 'Булка',
      type: 'bun',
      proteins: 10,
      fat: 20,
      carbohydrates: 30,
      calories: 40,
      price: 100,
      image: 'img',
      image_mobile: 'img',
      image_large: 'img'
    }
  ];

  it('should handle pending', () => {
    const state = ingredientsReducer(
      undefined,
      fetchIngredientsThunk.pending('', undefined)
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.items).toEqual([]);
  });

  it('should handle fulfilled', () => {
    const state = ingredientsReducer(
      undefined,
      fetchIngredientsThunk.fulfilled(mockIngredients, '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.items).toEqual(mockIngredients);
    expect(state.error).toBeNull();
  });

  it('should handle rejected', () => {
    const state = ingredientsReducer(
      undefined,
      fetchIngredientsThunk.rejected(new Error('Ошибка'), '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка');
    expect(state.items).toEqual([]);
  });
});
