import { useDispatch, useSelector } from '../../services/store';

import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC, useEffect } from 'react';
import {
  selectIngredientsisLoading,
  selectIngredientsStatus
} from '@features/burgers/ingredients-selectors';
import { fetchIngredients } from '@features/burgers/ingredients-slice';

export const ConstructorPage: FC = () => {
  /** TODO: взять переменную из стора */
  const isIngredientsLoading = useSelector(selectIngredientsisLoading);
  const dispatch = useDispatch();

  const status = useSelector(selectIngredientsStatus);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchIngredients());
    }
  }, [dispatch, status]);

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
