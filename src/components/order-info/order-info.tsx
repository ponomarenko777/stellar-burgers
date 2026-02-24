import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';

import type { TIngredient, TOrder } from '@utils-types';
import { useSelector } from '../../services/store';
import type { RootState } from '../../services/store';

export const OrderInfo: FC = () => {
  const params = useParams();
  const orderNumber = Number(params.number);

  // ✅ ингредиенты из стора
  const ingredients: TIngredient[] = useSelector(
    (state: RootState) => state.ingredients.items
  );

  // ✅ заказы из ленты
  const feedOrders: TOrder[] = useSelector(
    (state: RootState) => state.feeds.orders
  );

  // ✅ заказы из профиля (ты уже сделал slice profileOrders)
  const profileOrders: TOrder[] = useSelector(
    (state: RootState) => state.profileOrders.orders
  );

  // ✅ находим нужный заказ
  const orderData = useMemo(() => {
    if (!orderNumber) return null;

    return (
      feedOrders.find((o) => o.number === orderNumber) ||
      profileOrders.find((o) => o.number === orderNumber) ||
      null
    );
  }, [orderNumber, feedOrders, profileOrders]);

  // если заказа нет в сторе — показываем загрузку
  // (в идеале тут надо догружать по номеру через API, но пока ок)
  if (!orderData) {
    return <Preloader />;
  }

  // ✅ готовим данные для UI
  const orderInfo = useMemo(() => {
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

  // ✅ если ингредиенты ещё не пришли — показываем прелоадер,
  // но НЕ возвращаем orderInfo=null из-за "ingredients.length"
  if (!ingredients.length) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
