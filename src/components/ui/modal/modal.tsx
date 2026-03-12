import { FC, memo } from 'react';

import styles from './modal.module.css';

import { CloseIcon } from '@zlden/react-developer-burger-ui-components';
import { TModalUIProps } from './type';
import { ModalOverlayUI } from '@ui';

export const ModalUI: FC<TModalUIProps> = memo(
  ({ title, onClose, children }) => {
    const hasTitle = Boolean(title?.trim());

    return (
      <>
        <div className={styles.modal}>
          {hasTitle && (
            <div className={styles.header}>
              <h2 className='text text_type_main-large'>{title}</h2>
            </div>
          )}

          <button className={styles.button} type='button' onClick={onClose}>
            <CloseIcon type='primary' />
          </button>

          <div className={styles.content}>{children}</div>
        </div>

        <ModalOverlayUI onClick={onClose} />
      </>
    );
  }
);
