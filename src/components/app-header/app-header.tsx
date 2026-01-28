import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '@store';
import { selectUserData } from '@features/user/user-selectors';

export const AppHeader: FC = () => {
  const userData = useSelector(selectUserData);

  return <AppHeaderUI userName={userData?.name} />;
};
