import React from 'react';
import s from './Modal.module.scss';

interface ModalProps {
  active: boolean;
  setActive: (active: boolean) => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ active, setActive, children }) => {
  return (
    <div className={active ? `${s.modal} ${s.active}` : s.modal} onClick={() => setActive(false)}>
      <div className={s.modalWrapper} onClick={(e) => e.stopPropagation()}>
        <div className={active ? `${s.modalContent} ${s.active}` : s.modalContent}>{children}</div>
      </div>
    </div>
  );
};
