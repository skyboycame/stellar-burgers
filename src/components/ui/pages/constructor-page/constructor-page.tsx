import { FC } from 'react';

import styles from './constructor-page.module.css';

import { ConstructorPageUIProps } from './type';
import { Preloader } from '../../preloader';
import { BurgerConstructor, BurgerIngredients } from '@components';
import { useSelector } from 'react-redux';
import { selectIngredientsStatus } from '../../../../../src/features/burgers/ingredients-selectors';

export const ConstructorPageUI: FC<ConstructorPageUIProps> = ({
  isIngredientsLoading
}) => (
  <>
    {false ? (
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
