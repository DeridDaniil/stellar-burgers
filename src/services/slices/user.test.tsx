import { configureStore } from '@reduxjs/toolkit';
import {
  userMockData,
  userMockDataUpdated,
  userRegisterData,
  userRegisterDataUpdated,
  userResponce,
  userResponceUpdated
} from './testData';
import {
  apiGetUser,
  getError,
  getName,
  getUser,
  initialState,
  isAuthCheckedSelector,
  login,
  logout,
  register,
  updateUser,
  userSlice
} from './user';

describe('Тестируем userSlice', () => {
  const stateConstructor = (action: { type: string; payload?: {} }) =>
    userSlice.reducer(initialState, action);

  describe('Проверка редьюсера register', () => {
    test('Проверка fulfilled', () => {
      const action = {
        type: register.fulfilled.type,
        payload: userResponce
      };
      expect(stateConstructor(action)).toEqual(userMockData);
    });

    test('Проверка rejected', () => {
      const newState = userSlice.reducer(
        initialState,
        register.rejected(
          new Error('error'),
          'тестовая ошибка',
          userRegisterData
        )
      );
      expect(newState.error).toEqual('error');
    });

    test('Проверка pending', () => {
      const newState = userSlice.reducer(
        initialState,
        register.pending('', userRegisterData)
      );
      expect(newState.isAuthChecked).toEqual(false);
      expect(newState.error).toEqual('');
    });
  });

  describe('Проверка редьюсера login', () => {
    test('Проверка fulfilled', () => {
      const action = {
        type: login.fulfilled.type,
        payload: userResponce
      };
      expect(stateConstructor(action)).toEqual(userMockData);
    });

    test('Проверка rejected', () => {
      const newState = userSlice.reducer(
        initialState,
        login.rejected(new Error('error'), 'тестовая ошибка', userRegisterData)
      );
      expect(newState.error).toEqual('error');
      expect(newState.isAuthChecked).toEqual(false);
    });

    test('Проверка pending', () => {
      const newState = userSlice.reducer(
        initialState,
        login.pending('', userRegisterData)
      );
      expect(newState.isAuthChecked).toEqual(false);
      expect(newState.error).toEqual('');
    });
  });

  describe('Проверка редьюсера apiGetUser', () => {
    test('Проверка fulfilled', () => {
      const action = {
        type: apiGetUser.fulfilled.type,
        payload: userResponce
      };
      expect(stateConstructor(action)).toEqual(userMockData);
    });

    test('Проверка rejected', () => {
      const newState = userSlice.reducer(
        initialState,
        apiGetUser.rejected(new Error('error'), 'тестовая ошибка')
      );
      expect(newState.error).toEqual('error');
      expect(newState.isAuthChecked).toEqual(false);
    });
  });

  describe('Проверка редьюсера updateUser', () => {
    test('Проверка fulfilled', () => {
      const action = {
        type: updateUser.fulfilled.type,
        payload: userResponceUpdated
      };
      expect(stateConstructor(action)).toEqual(userMockDataUpdated);
    });

    test('Проверка rejected', () => {
      const newState = userSlice.reducer(
        initialState,
        updateUser.rejected(
          new Error('error'),
          'тестовая ошибка',
          userRegisterDataUpdated
        )
      );
      expect(newState.error).toEqual('error');
      expect(newState.isAuthChecked).toEqual(false);
    });

    test('Проверка pending', () => {
      const newState = userSlice.reducer(
        initialState,
        updateUser.pending('', userRegisterDataUpdated)
      );
      expect(newState.isAuthChecked).toEqual(false);
      expect(newState.error).toEqual('');
    });
  });

  test('Проверка fulfilled у редьюсера logout', () => {
    const action = {
      type: logout.fulfilled.type,
      payload: userResponce
    };
    expect(stateConstructor(action)).toEqual(initialState);
  });

  test('Проверка селекторов isAuthCheckedSelector, getUser, getName и getError', () => {
    const store = configureStore({
      reducer: {
        user: userSlice.reducer
      },
      preloadedState: {
        user: userMockData
      }
    });
    const isAuthChecked = isAuthCheckedSelector(store.getState());
    const user = getUser(store.getState());
    const name = getName(store.getState());
    const error = getError(store.getState());
    expect(isAuthChecked).toEqual(userMockData.isAuthChecked);
    expect(user).toEqual(userMockData.user);
    expect(name).toEqual(userMockData.user.name);
    expect(error).toEqual(userMockData.error);
  });
});
