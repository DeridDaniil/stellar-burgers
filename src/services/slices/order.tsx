import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  orderBurgerApi
);

export interface TCreateOrderState {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | undefined;
}

const initialState: TCreateOrderState = {
  orderRequest: false,
  orderModalData: null,
  error: undefined
};

export const createOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    resetOrder: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
      });
  },
  selectors: {
    orderRequest: (state) => state.orderRequest,
    orderModalData: (state) => state.orderModalData
  }
});

export const { resetOrder } = createOrderSlice.actions;
export const { orderRequest, orderModalData } = createOrderSlice.selectors;
