import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsReducer } from '../../src/features/burgers/ingredients-slice';
import { orderReducer } from '../../src/features/order/order-slice';
import { feedReducer } from '@features/feed/feed-slice';
import { userReducer } from '@features/user/user-slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  feed: feedReducer,
  user: userReducer
}); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
