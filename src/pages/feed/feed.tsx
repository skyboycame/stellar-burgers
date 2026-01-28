import { fetchIngredients } from '@features/burgers/ingredients-slice';
import { selectOrdersAllTime } from '@features/feed/feed-selectors';
import { fetchFeeds } from '@features/feed/feed-slice';
import { useDispatch, useSelector } from '@store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectOrdersAllTime);
  const handleGetFeeds = () => {
    dispatch(fetchFeeds());
  };

  useEffect(() => {
    dispatch(fetchFeeds());
    dispatch(fetchIngredients());
  }, [dispatch]);
  if (!orders.length) {
    return <Preloader />;
  }
  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
