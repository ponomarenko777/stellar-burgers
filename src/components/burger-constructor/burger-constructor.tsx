import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import type { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

import { useDispatch, useSelector } from '../../services/store';
import type { RootState } from '../../services/store';

import { createOrderThunk, clearOrderModalData } from '@slices/orderSlice';
import { clearConstructor } from '@slices/constructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bun = useSelector((s: RootState) => s.burgerConstructor.bun);
  const ingredients = useSelector(
    (s: RootState) => s.burgerConstructor.items
  ) as TConstructorIngredient[];

  const user = useSelector((s: RootState) => s.auth.user);
  const orderRequest = useSelector((s: RootState) => s.order.orderRequest);
  const orderModalData = useSelector((s: RootState) => s.order.orderModalData);
  const constructorItems = useMemo(
    () => ({
      bun: bun as TIngredient | null,
      ingredients
    }),
    [bun, ingredients]
  );

  const price = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;

    const ingPrice = ingredients.reduce(
      (sum: number, v: TConstructorIngredient) => sum + v.price,
      0
    );

    return bunPrice + ingPrice;
  }, [bun, ingredients]);

  const onOrderClick = () => {
    if (!bun || orderRequest) return;

    if (!user) {
      navigate('/login', { replace: true });
      return;
    }

    const bunId = bun._id;

    const ingredientIds = [bunId, ...ingredients.map((i) => i._id), bunId];

    dispatch(createOrderThunk(ingredientIds));
  };

  const closeOrderModal = () => {
    dispatch(clearOrderModalData());
  };

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
