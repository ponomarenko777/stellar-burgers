import { FC, useEffect } from 'react';

import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';

import { useDispatch, useSelector } from '../../services/store';
import type { RootState } from '../../services/store';
import { fetchFeedsThunk } from '@slices/feedsSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector((state: RootState) => state.feeds.orders);
  const isLoading = useSelector((state: RootState) => state.feeds.isLoading);
  const error = useSelector((state: RootState) => state.feeds.error);

  useEffect(() => {
    dispatch(fetchFeedsThunk());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(fetchFeedsThunk());
  };

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return <p>Ошибка: {error}</p>;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
