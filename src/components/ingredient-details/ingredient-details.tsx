import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '@store';
import {
  selectIngredientById,
  selectIngredientsStatus
} from '@features/burgers/ingredients-selectors';
import { fetchIngredients } from '@features/burgers/ingredients-slice';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const { id } = useParams<{ id: string }>();
  const ingredientData = useSelector((state) =>
    selectIngredientById(state, id || null)
  );
  const status = useSelector(selectIngredientsStatus);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
