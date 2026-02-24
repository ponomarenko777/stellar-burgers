import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import type { RootState } from '../../services/store';

type Props = { element: JSX.Element; onlyUnAuth?: boolean };

export const ProtectedRoute = ({ element, onlyUnAuth }: Props) => {
  const location = useLocation();

  const isAuthChecked = useSelector((s: RootState) => s.auth.isAuthChecked);
  const user = useSelector((s: RootState) => s.auth.user);

  if (!isAuthChecked) return <div>Loading...</div>;

  if (onlyUnAuth) {
    const from = (location.state as any)?.from?.pathname || '/';
    return user ? <Navigate to={from} replace /> : element;
  }
  return user ? (
    element
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};
