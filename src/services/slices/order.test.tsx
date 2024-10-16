import { configureStore } from '@reduxjs/toolkit';
import {
  createOrder,
  createOrderSlice,
  initialState,
  orderModalData,
  orderRequest,
  resetOrder
} from './order';
import { orderMockData, orderReceivedMockData } from './testData';

describe('Тестируем Order', () => {
  test('Проверка редьюсера resetOrder', () => {
    const state = {
      orderRequest: true,
      orderModalData: orderReceivedMockData.order,
      error: 'undefined'
    };
    const stateReceived = createOrderSlice.reducer(state, resetOrder());
    expect(stateReceived).toEqual(initialState);
  });

  test('Проверка fulfilled у редьюсера createSlice', () => {
    const newState = createOrderSlice.reducer(
      initialState,
      createOrder.fulfilled(orderReceivedMockData, '', [''])
    );
    expect(newState.orderRequest).toEqual(false);
    expect(newState.orderModalData).toEqual(orderReceivedMockData.order);
  });

  test('Проверка rejected у редьюсера createSlice', () => {
    const newState = createOrderSlice.reducer(
      initialState,
      createOrder.rejected(new Error('error'), 'тестовая ошибка', [''])
    );
    expect(newState.error).toEqual('error');
  });

  test('Проверка pending у редьюсера createSlice', () => {
    const newState = createOrderSlice.reducer(
      initialState,
      createOrder.pending('', [])
    );
    expect(newState.orderRequest).toEqual(true);
  });

  test('Проверка селекторов orderRequest и orderModalData', () => {
    const store = configureStore({
      reducer: {
        newOrder: createOrderSlice.reducer
      },
      preloadedState: {
        newOrder: orderMockData
      }
    });
    const order = orderRequest(store.getState());
    const modal = orderModalData(store.getState());
    expect(order).toEqual(orderMockData.orderRequest);
    expect(modal).toEqual(orderMockData.orderModalData);
  });
});
