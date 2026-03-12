import React, { FC, memo } from 'react';
import {
  CurrencyIcon,
  FormattedDate
} from '@zlden/react-developer-burger-ui-components';

import styles from './order-info.module.css';
import { OrderInfoUIProps } from './type';
import { OrderStatus } from '@components';

const getGMTOffset = (date: Date) => {
  const offset = -date.getTimezoneOffset() / 60;
  const sign = offset >= 0 ? '+' : '-';
  return `i-GMT${sign}${Math.abs(offset)}`;
};

export const OrderInfoUI: FC<OrderInfoUIProps> = memo(({ orderInfo }) => (
  <div className={styles.wrap}>
    <h2 className={`text text_type_digits-default ${styles.number}`}>
      #{orderInfo.number}
    </h2>

    <h3 className={`text text_type_main-medium pt-10 pb-3 ${styles.header}`}>
      {orderInfo.name}
    </h3>

    <div className='pb-6'>
      <OrderStatus status={orderInfo.status} />
    </div>

    <p className='text text_type_main-medium pt-15 pb-6'>Состав:</p>

    <ul className={`${styles.list} mb-8`}>
      {Object.values(orderInfo.ingredientsInfo).map((item) => (
        <li className={`pb-4 pr-6 ${styles.item}`} key={item._id}>
          <div className={styles.img_wrap}>
            <div className={styles.border}>
              <img
                className={styles.img}
                src={item.image_mobile}
                alt={item.name}
              />
            </div>
          </div>

          <span className='text text_type_main-default pl-4'>{item.name}</span>

          <span
            className={`text text_type_digits-default pl-4 pr-4 ${styles.quantity}`}
          >
            {item.count} x {item.price}
          </span>

          <CurrencyIcon type='primary' />
        </li>
      ))}
    </ul>

    <div className={styles.bottom}>
      <p className='text text_type_main-default text_color_inactive'>
        <FormattedDate date={orderInfo.date} /> {getGMTOffset(orderInfo.date)}
      </p>

      <span className={`text text_type_digits-default pr-4 ${styles.total}`}>
        {orderInfo.total}
      </span>

      <CurrencyIcon type='primary' />
    </div>
  </div>
));
