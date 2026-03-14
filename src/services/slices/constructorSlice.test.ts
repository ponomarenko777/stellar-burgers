import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from './constructorSlice';

describe('constructorSlice', () => {
  const bun = {
    _id: 'bun1',
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
  };

  const main1 = {
    _id: 'main1',
    name: 'Котлета 1',
    type: 'main',
    proteins: 10,
    fat: 20,
    carbohydrates: 30,
    calories: 40,
    price: 200,
    image: 'img',
    image_mobile: 'img',
    image_large: 'img'
  };

  const main2 = {
    _id: 'main2',
    name: 'Котлета 2',
    type: 'main',
    proteins: 11,
    fat: 21,
    carbohydrates: 31,
    calories: 41,
    price: 210,
    image: 'img',
    image_mobile: 'img',
    image_large: 'img'
  };

  it('should add bun', () => {
    const state = constructorReducer(undefined, addIngredient(bun));

    expect(state.bun).toEqual(bun);
    expect(state.items).toEqual([]);
  });

  it('should add ingredient to items', () => {
    const state = constructorReducer(undefined, addIngredient(main1));

    expect(state.bun).toBeNull();
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual({
      ...main1,
      id: expect.any(String)
    });
  });

  it('should remove ingredient from items', () => {
    const stateWithItems = constructorReducer(
      constructorReducer(undefined, addIngredient(main1)),
      addIngredient(main2)
    );

    const idToRemove = stateWithItems.items[0].id;

    const state = constructorReducer(
      stateWithItems,
      removeIngredient(idToRemove)
    );

    expect(state.items).toHaveLength(1);
    expect(state.items[0]._id).toBe('main2');
  });

  it('should move ingredient in items', () => {
    const stateWithItems = constructorReducer(
      constructorReducer(undefined, addIngredient(main1)),
      addIngredient(main2)
    );

    const state = constructorReducer(
      stateWithItems,
      moveIngredient({ fromIndex: 0, toIndex: 1 })
    );

    expect(state.items[0]._id).toBe('main2');
    expect(state.items[1]._id).toBe('main1');
  });

  it('should clear constructor', () => {
    const filledState = constructorReducer(
      constructorReducer(undefined, addIngredient(bun)),
      addIngredient(main1)
    );

    const state = constructorReducer(filledState, clearConstructor());

    expect(state).toEqual({
      bun: null,
      items: []
    });
  });
});
