import { FC, useEffect, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';

import type { TIngredient, TOrder } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import type { RootState } from '../../services/store';

import { fetchFeedsThunk } from '@slices/feedsSlice';
import { fetchProfileOrdersThunk } from '@slices/profileOrdersSlice';

export const OrderInfo: FC = () => {
  const { number } = useParams();
  const orderNumber = Number(number);

  const location = useLocation();
  const dispatch = useDispatch();

  const ingredients: TIngredient[] = useSelector(
    (state: RootState) => state.ingredients.items
  );

  const feedOrders: TOrder[] = useSelector(
    (state: RootState) => state.feeds.orders
  );

  const profileOrders: TOrder[] = useSelector(
    (state: RootState) => state.profileOrders.orders
  );

  const orderData = useMemo(() => {
    if (!orderNumber) return null;

    return (
      feedOrders.find((o) => o.number === orderNumber) ||
      profileOrders.find((o) => o.number === orderNumber) ||
      null
    );
  }, [orderNumber, feedOrders, profileOrders]);

  useEffect(() => {
    if (!orderNumber) return;

    const isFeedOrder = location.pathname.startsWith('/feed/');
    const isProfileOrder = location.pathname.startsWith('/profile/orders/');

    if (isFeedOrder && feedOrders.length === 0) {
      dispatch(fetchFeedsThunk());
    }

    if (isProfileOrder && profileOrders.length === 0) {
      dispatch(fetchProfileOrdersThunk());
    }
  }, [
    dispatch,
    orderNumber,
    location.pathname,
    feedOrders.length,
    profileOrders.length
  ]);

  const orderInfo = useMemo(() => {
    if (!orderData || ingredients.length === 0) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, id) => {
        const ingredient = ingredients.find((ing) => ing._id === id);
        if (!ingredient) return acc;

        if (!acc[id]) {
          acc[id] = { ...ingredient, count: 1 };
        } else {
          acc[id].count += 1;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderNumber) return <Preloader />;

  if (!orderData) return <Preloader />;

  if (!ingredients.length) return <Preloader />;

  if (!orderInfo) return <Preloader />;

  return (
    <div
      style={{
        maxWidth: 640,
        margin: '120px auto 0'
      }}
    >
      <OrderInfoUI orderInfo={orderInfo} />
    </div>
  );
};
