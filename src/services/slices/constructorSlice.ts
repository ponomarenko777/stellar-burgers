import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import type { TIngredient, TConstructorIngredient } from '@utils-types';

type TConstructorState = {
  bun: TIngredient | null;
  items: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  items: []
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      const ing = action.payload;

      if (ing.type === 'bun') {
        state.bun = ing;
        return;
      }

      state.items.push({ ...ing, id: nanoid() });
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      const [moved] = state.items.splice(fromIndex, 1);
      state.items.splice(toIndex, 0, moved);
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.items = [];
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} = constructorSlice.actions;

export default constructorSlice.reducer;
