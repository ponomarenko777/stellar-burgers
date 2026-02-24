import { FC, useEffect } from 'react';
import { ProfileOrdersUI } from '@ui-pages';
import { Preloader } from '@ui';

import { useDispatch, useSelector } from '../../services/store';
import type { RootState } from '../../services/store';

import { fetchProfileOrdersThunk } from '@slices/profileOrdersSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector((s: RootState) => s.profileOrders.orders);
  const isLoading = useSelector((s: RootState) => s.profileOrders.isLoading);
  const error = useSelector((s: RootState) => s.profileOrders.error);

  useEffect(() => {
    dispatch(fetchProfileOrdersThunk());
  }, [dispatch]);

  if (isLoading) return <Preloader />;
  if (error) return <p>Ошибка: {error}</p>;

  return <ProfileOrdersUI orders={orders} />;
};
console.log('accessToken cookie', document.cookie);
console.log('refreshToken ls', localStorage.getItem('refreshToken'));
