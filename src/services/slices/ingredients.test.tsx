import { configureStore } from '@reduxjs/toolkit';
import {
  getIngredientsList,
  ingredientsSlice,
  ingredientsState as getIngredientsState,
  initialState,
  isLoadingState,
  getIngredients
} from './ingredients';
import { ingredientsMockData } from './testData';

describe('Тесты ingredientsSlice', () => {
  test('Проверка pending у редьюсера getAllFeeds', () => {
    const stateReceived = ingredientsSlice.reducer(
      initialState,
      getIngredientsList.pending('')
    );
    expect(stateReceived.isLoading).toEqual(true);
  });

  test('Проверка rejected у редьюсера getAllFeeds', () => {
    const stateReceived = ingredientsSlice.reducer(
      initialState,
      getIngredientsList.rejected(new Error('error'), 'Ошибка тестирования')
    );
    expect(stateReceived.ingredients).toEqual([]);
    expect(stateReceived.isLoading).toEqual(false);
    expect(stateReceived.error).toEqual('error');
  });

  test('Проверка fulfilled у редьюсера getAllFeeds', () => {
    const action = {
      type: getIngredientsList.fulfilled.type,
      payload: ingredientsMockData.ingredients
    };
    const stateReceived = ingredientsSlice.reducer(initialState, action);
    expect(stateReceived).toEqual(ingredientsMockData);
    expect(stateReceived.isLoading).toEqual(false);
  });

  test('Проверка селекторов ingredientsState, isLoadingState и getIngredients', () => {
    const store = configureStore({
      reducer: {
        ingredients: ingredientsSlice.reducer
      },
      preloadedState: {
        ingredients: ingredientsMockData
      }
    });
    const ingredientsState = getIngredientsState(store.getState());
    const isLoading = isLoadingState(store.getState());
    const ingredients = getIngredients(store.getState());
    expect(ingredientsState).toEqual(ingredientsMockData);
    expect(isLoading).toEqual(ingredientsMockData.isLoading);
    expect(ingredients).toEqual(ingredientsMockData.ingredients);
  });
});
