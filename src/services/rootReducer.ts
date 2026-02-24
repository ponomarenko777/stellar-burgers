import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredientsSlice';
import authReducer from './slices/authSlice';
import feedsReducer from './slices/feedsSlice';
import constructorReducer from './slices/constructorSlice';
import orderReducer from './slices/orderSlice';
import profileOrdersReducer from './slices/profileOrdersSlice';
export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  auth: authReducer,
  feeds: feedsReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  profileOrders: profileOrdersReducer
});
