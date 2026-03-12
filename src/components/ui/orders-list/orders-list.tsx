import { FC } from 'react';

import styles from './orders-list.module.css';

import { OrdersListUIProps } from './type';
import { OrderCard } from '@components';

export const OrdersListUI: FC<OrdersListUIProps> = ({ orders }) => (
  <div className={styles.content}>
    {orders.map((order) => (
      <OrderCard order={order} key={order._id} />
    ))}
  </div>
);
