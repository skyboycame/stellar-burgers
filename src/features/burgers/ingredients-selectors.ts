import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'src/services/store';

export const selectIngredientsState = (state: RootState) => state.ingredients;
export const selectIngredientsList = (state: RootState) =>
  state.ingredients.list;
export const selectSauce = createSelector(selectIngredientsList, (list) =>
  list.filter((el) => el.type === 'sauce')
);

export const selectMains = createSelector(selectIngredientsList, (list) =>
  list.filter((el) => el.type === 'main')
);

export const selectBuns = createSelector(selectIngredientsList, (list) =>
  list.filter((el) => el.type === 'bun')
);
export const selectIngredientsError = (state: RootState) =>
  state.ingredients.error;
export const selectIngredientsStatus = (state: RootState) =>
  state.ingredients.status;
export const selectIngredientsisLoading = (state: RootState) =>
  state.ingredients.isLoading;
export const selectIngredientById = createSelector(
  [selectIngredientsList, (_: RootState, id: string | null) => id],
  (list, id) => {
    if (!id) return undefined;
    const currentIng = list.find((el) => el._id === id);
    return currentIng;
  }
);
