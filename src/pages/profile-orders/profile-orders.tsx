import { fetchIngredients } from '@features/burgers/ingredients-slice';
import { fetchFeeds } from '@features/feed/feed-slice';
import { selectProfileOrders } from '@features/order/order-selectors';
import { getOrders } from '@features/order/order-slice';
import { useDispatch, useSelector } from '@store';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(selectProfileOrders) || [];
  const dispatch = useDispatch();
  console.log(orders);
  useEffect(() => {
    dispatch(fetchFeeds());
    dispatch(getOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
