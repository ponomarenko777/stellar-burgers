import { FC, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { RegisterUI } from '@ui-pages';

import { useDispatch, useSelector } from '../../services/store';
import type { RootState } from '../../services/store';

import { registerThunk } from '@slices/authSlice';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const errorText = useSelector((s: RootState) => s.auth.error) || '';
  const isLoading = useSelector((s: RootState) => s.auth.isLoading);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (isLoading) return;

    dispatch(registerThunk({ name: userName, email, password }))
      .unwrap()
      .then(() => {
        navigate('/profile', { replace: true });
      })
      .catch(() => {
        // errorText уже лежит в store
      });
  };

  return (
    <RegisterUI
      errorText={errorText}
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
