import { FC, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { useSelector } from '../../services/store';
import type { RootState } from '../../services/store';

import { OrderCardProps } from './type';
import type { TIngredient } from '@utils-types';
import { OrderCardUI } from '../ui/order-card';

const maxIngredients = 6;

export const OrderCard: FC<OrderCardProps> = memo(({ order }) => {
  const location = useLocation();

  const ingredients: TIngredient[] = useSelector(
    (state: RootState) => state.ingredients.items
  );

  const orderInfo = useMemo(() => {
    const date = new Date(order.createdAt);

    if (!ingredients.length) {
      return {
        ...order,
        ingredientsInfo: [] as TIngredient[],
        ingredientsToShow: [] as TIngredient[],
        remains: 0,
        total: 0,
        date
      };
    }

    const ingredientsInfo = order.ingredients.reduce(
      (acc: TIngredient[], id: string) => {
        const ingredient = ingredients.find((ing) => ing._id === id);
        if (ingredient) acc.push(ingredient);
        return acc;
      },
      []
    );

    const total = ingredientsInfo.reduce((acc, item) => acc + item.price, 0);

    const ingredientsToShow = ingredientsInfo.slice(0, maxIngredients);

    const remains =
      ingredientsInfo.length > maxIngredients
        ? ingredientsInfo.length - maxIngredients
        : 0;

    return {
      ...order,
      ingredientsInfo,
      ingredientsToShow,
      remains,
      total,
      date
    };
  }, [order, ingredients]);

  return (
    <OrderCardUI
      orderInfo={orderInfo}
      maxIngredients={maxIngredients}
      locationState={{ background: location }}
    />
  );
});
