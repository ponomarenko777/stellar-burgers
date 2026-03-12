import { FC, memo, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';

import { TModalProps } from './type';
import { ModalUI } from '@ui';

export const Modal: FC<TModalProps> = memo(({ title, onClose, children }) => {
  const root = useMemo(
    () => document.getElementById('modals') ?? document.body,
    []
  );

  const elRef = useRef<HTMLDivElement | null>(null);
  if (!elRef.current) {
    elRef.current = document.createElement('div');
  }

  useEffect(() => {
    const el = elRef.current!;
    root.appendChild(el);

    return () => {
      if (root.contains(el)) {
        root.removeChild(el);
      }
    };
  }, [root]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return createPortal(
    <ModalUI title={title} onClose={onClose}>
      {children}
    </ModalUI>,
    elRef.current
  );
});
