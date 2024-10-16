import { configureStore } from '@reduxjs/toolkit';
import { ordersMockData } from './testData';
import {
  getUserOrders,
  initialState,
  listOrders,
  userOrdersSlice
} from './userOrders';

describe('Тестируем userOrdersSlice', () => {
  test('Проверка fulfilled у редьюсера getUserOrders', () => {
    const newState = userOrdersSlice.reducer(
      initialState,
      getUserOrders.fulfilled(ordersMockData.orders, '')
    );
    expect(newState.orders).toEqual(ordersMockData.orders);
    expect(newState.isLoading).toEqual(false);
  });

  test('Проверка rejected у редьюсера getUserOrders', () => {
    const newState = userOrdersSlice.reducer(
      initialState,
      getUserOrders.rejected(new Error('error'), 'тестовая ошибка')
    );
    expect(newState.isLoading).toEqual(false);
  });

  test('Проверка pending у редьюсера getUserOrders', () => {
    const newState = userOrdersSlice.reducer(
      initialState,
      getUserOrders.pending('')
    );
    expect(newState.isLoading).toEqual(true);
  });

  test('Проверка селектора listOrders', () => {
    const store = configureStore({
      reducer: {
        orders: userOrdersSlice.reducer
      },
      preloadedState: {
        orders: ordersMockData
      }
    });
    const orderRequest = listOrders(store.getState());
    expect(orderRequest).toEqual(ordersMockData.orders);
  });
});
