import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '@store';
import {
  selectBun,
  selectIngredients,
  selectNewOrderData,
  selectOrderStatus
} from '@features/order/order-selectors';
import { clearOrder, sendOrder } from '@features/order/order-slice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const selectedBun = useSelector(selectBun);
  const selectedIngredients = useSelector(selectIngredients);
  const status = useSelector(selectOrderStatus);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const constructorItems = {
    bun: selectedBun,
    ingredients: selectedIngredients
  };
  const newOrderData = useSelector(selectNewOrderData);

  const orderRequest = status === 'loading';

  const orderModalData = newOrderData ? newOrderData.order : null;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (selectedBun && selectedIngredients) {
      const ingredientIds = [
        selectedBun._id,
        ...selectedIngredients.map((i) => i._id),
        selectedBun._id
      ];
      dispatch(sendOrder(ingredientIds));
    }
  };
  const closeOrderModal = () => {
    navigate(-1);
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce((s: number, v) => s + v.price, 0),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
