import { useEffect, useRef } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import '../../index.css';
import styles from './app.module.css';

import { AppHeader, OrderInfo, IngredientDetails } from '@components';

import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';

import { Modal } from '@components/modal/modal';
import { ProtectedRoute } from '@components/protected-route/protected-route';

import { useDispatch } from '../../services/store';
import { checkUserAuthThunk } from '@slices/authSlice';
import { fetchIngredientsThunk } from '@slices/ingredientsSlice';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isFirstRender = useRef(true);
  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  const rawBackground = location.state?.background;

  const background =
    !isFirstRender.current &&
    rawBackground &&
    typeof rawBackground === 'object' &&
    'pathname' in rawBackground &&
    (rawBackground as any).pathname !== location.pathname
      ? (rawBackground as any)
      : undefined;

  useEffect(() => {
    dispatch(checkUserAuthThunk());
    dispatch(fetchIngredientsThunk());
  }, [dispatch]);

  const handleCloseModal = () => {
    if (background) {
      navigate(-1);
      return;
    }

    if (location.pathname.startsWith('/profile/orders/')) {
      navigate('/profile/orders', { replace: true });
      return;
    }

    if (location.pathname.startsWith('/feed/')) {
      navigate('/feed', { replace: true });
      return;
    }

    navigate('/', { replace: true });
  };

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />

        <Route
          path='/login'
          element={<ProtectedRoute onlyUnAuth element={<Login />} />}
        />
        <Route
          path='/register'
          element={<ProtectedRoute onlyUnAuth element={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<ProtectedRoute onlyUnAuth element={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<ProtectedRoute onlyUnAuth element={<ResetPassword />} />}
        />

        <Route
          path='/profile'
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route
          path='/profile/orders'
          element={<ProtectedRoute element={<ProfileOrders />} />}
        />

        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route
          path='/profile/orders/:number'
          element={<ProtectedRoute element={<OrderInfo />} />}
        />

        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal onClose={handleCloseModal} title='Детали ингредиента'>
                <IngredientDetails />
              </Modal>
            }
          />

          <Route
            path='/feed/:number'
            element={
              <Modal onClose={handleCloseModal} title=''>
                <OrderInfo />
              </Modal>
            }
          />

          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute
                element={
                  <Modal onClose={handleCloseModal} title=''>
                    <OrderInfo />
                  </Modal>
                }
              />
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
