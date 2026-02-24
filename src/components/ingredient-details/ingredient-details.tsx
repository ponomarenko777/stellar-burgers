import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { Preloader, IngredientDetailsUI } from '@ui';

import { useSelector } from '../../services/store';
import type { RootState } from '../../services/store';
import type { TIngredient } from '@utils-types';

export const IngredientDetails: FC = () => {
  const params = useParams();
  const id = params.id;

  // ✅ берём ингредиенты из стора
  const ingredients: TIngredient[] = useSelector(
    (state: RootState) => state.ingredients.items // ⚠️ проверь имя поля
  );

  // ✅ ищем нужный ингредиент
  const ingredientData = useMemo(
    () => ingredients.find((ing) => ing._id === id) || null,
    [ingredients, id]
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
