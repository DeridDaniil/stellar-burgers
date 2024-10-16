import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsSlice } from './slices/ingredients';
import { constructorSlice } from './slices/constructor';
import { userSlice } from './slices/user';
import { feedsSlice } from './slices/feeds';
import { createOrderSlice } from './slices/order';
import { userOrdersSlice } from './slices/userOrders';

export const rootReducer = combineReducers({
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [constructorSlice.name]: constructorSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [feedsSlice.name]: feedsSlice.reducer,
  [createOrderSlice.name]: createOrderSlice.reducer,
  [userOrdersSlice.name]: userOrdersSlice.reducer
});
