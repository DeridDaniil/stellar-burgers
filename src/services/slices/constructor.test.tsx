import { TConstructorIngredient, TIngredient } from '@utils-types';
import {
  addItem,
  clearAll,
  constructorSelector,
  constructorSlice,
  deleteItem,
  initialState,
  swapIngredient,
  TConstructorState,
  updateAll
} from './constructor';
import {
  allIngredientsWithDeletedIngredient,
  allNonBunIngredientsWId,
  allNonBunIngredientsWOIdSwap1to0,
  allNonBunIngredientsWOIdSwap1to2,
  orderedIngredientsWId,
  orderedIngredientsWOId,
  singleBunIngredientWId,
  singleBunIngredientWOId,
  singleNonBunIngredientWId,
  singleNonBunIngredientWOId
} from './testData';

const deleteId = (obj: TConstructorIngredient) =>
  (({ id, ...params }) => params)(obj);

const deleteIdFromTheArray = (array: TConstructorIngredient[]) => {
  const ingredientsWithoutId: TIngredient[] = [];
  array.forEach((ingredient) => {
    ingredientsWithoutId.push(deleteId(ingredient));
  });
  return ingredientsWithoutId;
};

describe('тесты constructorSlice', () => {
  test('Добавить ингредиент', () => {
    const newState = constructorSlice.reducer(
      initialState,
      addItem(singleNonBunIngredientWId)
    );
    const { ingredients, bun } = newState;
    const ingredientsWithoutId = deleteIdFromTheArray(ingredients);
    expect(null).toEqual(bun);
    expect([singleNonBunIngredientWOId]).toEqual(ingredientsWithoutId);
  });

  test('Добавить булку', () => {
    const newState = constructorSlice.reducer(
      initialState,
      addItem(singleBunIngredientWId)
    );
    const { ingredients, bun } = newState;
    let bunWithoutId = null;
    if (bun?.id) {
      bunWithoutId = deleteId(bun);
    }

    expect(singleBunIngredientWOId).toEqual(bunWithoutId);
    expect(ingredients).toEqual([]);
  });

  test('Удалить ингредиент', () => {
    const initialStateFromContacts: TConstructorState = {
      bun: null,
      ingredients: allNonBunIngredientsWId
    };
    const newState = constructorSlice.reducer(
      initialStateFromContacts,
      deleteItem(singleNonBunIngredientWId)
    );
    const { ingredients } = newState;
    const ingredientsWithoutId = deleteIdFromTheArray(ingredients);
    expect(allIngredientsWithDeletedIngredient).toEqual(ingredientsWithoutId);
  });

  test('Очистить все ингредиенты', () => {
    const initialStateFromContacts: TConstructorState = {
      bun: singleBunIngredientWId,
      ingredients: allNonBunIngredientsWId
    };
    const newState = constructorSlice.reducer(
      initialStateFromContacts,
      clearAll()
    );
    const { ingredients, bun } = newState;
    expect(ingredients).toEqual([]);
    expect(bun).toEqual(null);
  });

  test('Обновить список ингредиентов', () => {
    const initialStateFromContacts: TConstructorState = {
      bun: singleBunIngredientWId,
      ingredients: allNonBunIngredientsWId
    };
    const newState = constructorSlice.reducer(
      initialStateFromContacts,
      updateAll(orderedIngredientsWId)
    );
    const { ingredients } = newState;
    const ingredientsWithoutId = deleteIdFromTheArray(ingredients);
    expect(ingredientsWithoutId).toEqual(orderedIngredientsWOId);
  });

  test('Переместить ингредиент вверх', () => {
    const initialStateFromContacts: TConstructorState = {
      bun: singleBunIngredientWId,
      ingredients: allNonBunIngredientsWId
    };
    const newState = constructorSlice.reducer(
      initialStateFromContacts,
      swapIngredient({ index: 1, step: -1 })
    );

    const { ingredients } = newState;
    const ingredientsWithoutId = deleteIdFromTheArray(ingredients);
    expect(ingredientsWithoutId).toEqual(allNonBunIngredientsWOIdSwap1to0);
  });

  test('Переместить ингредиент вниз', () => {
    const initialStateFromContacts: TConstructorState = {
      bun: singleBunIngredientWId,
      ingredients: allNonBunIngredientsWId
    };
    const newState = constructorSlice.reducer(
      initialStateFromContacts,
      swapIngredient({ index: 1, step: 1 })
    );

    const { ingredients } = newState;
    const ingredientsWithoutId = deleteIdFromTheArray(ingredients);
    expect(ingredientsWithoutId).toEqual(allNonBunIngredientsWOIdSwap1to2);
  });

  test('selectItems возвращает состояние', () => {
    const newState = {
      constructorIngredient: {
        bun: singleBunIngredientWId,
        ingredients: allNonBunIngredientsWId
      }
    };
    const receivedState = constructorSelector.selectItems(newState);
    expect(receivedState).toEqual(newState.constructorIngredient);
  });
});
