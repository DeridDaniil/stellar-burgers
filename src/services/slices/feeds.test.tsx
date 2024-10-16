import { configureStore } from '@reduxjs/toolkit';
import {
  feedsSlice,
  getAllFeeds,
  initialState,
  ordersFeeds,
  totalFeeds,
  totalTodayFeeds
} from './feeds';
import { feedsMockData } from './testData';

describe('тесты feedsSlice', () => {
  test('Проверка fulfilled у редьюсера getAllFeeds', () => {
    const action = {
      type: getAllFeeds.fulfilled.type,
      payload: feedsMockData
    };
    const stateReceived = feedsSlice.reducer(initialState, action);
    expect(stateReceived).toEqual(feedsMockData);
    expect(stateReceived.isLoading).toEqual(false);
  });

  test('Проверка rejected у редьюсера getAllFeeds', () => {
    const stateReceived = feedsSlice.reducer(
      initialState,
      getAllFeeds.rejected(new Error('error'), 'Ошибка тестирования')
    );
    expect(stateReceived.orders).toEqual([]);
    expect(stateReceived.total).toEqual(0);
    expect(stateReceived.totalToday).toEqual(0);
    expect(stateReceived.isLoading).toEqual(false);
    expect(stateReceived.error).toEqual('error');
  });

  test('Проверка pending у редьюсера getAllFeeds', () => {
    const stateReceived = feedsSlice.reducer(
      initialState,
      getAllFeeds.pending('')
    );
    expect(stateReceived.isLoading).toEqual(true);
  });

  test('Проверка селекторов ordersFeeds, totalFeeds и totalTodayFeeds', () => {
    const store = configureStore({
      reducer: {
        feeds: feedsSlice.reducer
      },
      preloadedState: {
        feeds: feedsMockData
      }
    });
    const orders = ordersFeeds(store.getState());
    const total = totalFeeds(store.getState());
    const totalToday = totalTodayFeeds(store.getState());
    expect(orders).toEqual(feedsMockData.orders);
    expect(total).toEqual(feedsMockData.total);
    expect(totalToday).toEqual(feedsMockData.totalToday);
  });
});
