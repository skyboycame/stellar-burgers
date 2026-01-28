import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '@store';
import { TRegisterData } from '@api';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '@features/user/user-slice';
import {
  selectIsAuthenticated,
  selectRegisterError
} from '@features/user/user-selectors';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const IsAuthenticated = useSelector(selectIsAuthenticated);
  const error = useSelector(selectRegisterError);
  const navigate = useNavigate();
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const registerData: TRegisterData = {
      email,
      name: userName,
      password
    };
    if (registerData) {
      dispatch(registerUser(registerData));
    }
  };
  useEffect(() => {
    if (IsAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [IsAuthenticated, navigate]);
  return (
    <RegisterUI
      errorText={error}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
