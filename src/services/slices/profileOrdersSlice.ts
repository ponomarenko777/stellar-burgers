import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { TOrder } from '@utils-types';
import { getOrdersApi } from '@api';

type TProfileOrdersState = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TProfileOrdersState = {
  orders: [],
  isLoading: false,
  error: null
};

export const fetchProfileOrdersThunk = createAsyncThunk<TOrder[]>(
  'profileOrders/fetch',
  async () => {
    const orders = await getOrdersApi();
    return orders;
  }
);

const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {
    clearProfileOrders: (state) => {
      state.orders = [];
      state.error = null;
      state.isLoading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileOrdersThunk.pending, (s) => {
        s.isLoading = true;
        s.error = null;
      })
      .addCase(fetchProfileOrdersThunk.fulfilled, (s, a) => {
        s.isLoading = false;
        s.orders = a.payload;
      })
      .addCase(fetchProfileOrdersThunk.rejected, (s, a) => {
        s.isLoading = false;
        s.error = a.error.message ?? 'Не удалось загрузить заказы';
      });
  }
});

export const { clearProfileOrders } = profileOrdersSlice.actions;
export default profileOrdersSlice.reducer;
