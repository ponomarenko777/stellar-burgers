import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { logoutThunk } from '@slices/authSlice';
import { useDispatch } from '../../services/store';

export const ProfileMenu: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    dispatch(logoutThunk())
      .unwrap()
      .then(() => {
        navigate('/login', { replace: true });
      })
      .catch(() => {});
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
