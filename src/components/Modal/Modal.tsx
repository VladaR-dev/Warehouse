import React from 'react';
import { Typography } from '@mui/material';
import { VscChromeClose } from 'react-icons/vsc';
import cn from 'classnames';
import s from './Modal.module.scss';

interface ModalProps {
  open: boolean;
  children: React.ReactNode;
  submitButtonText?: string;
  onClose?: () => void;
  onSubmit?: () => void;
  modalTitle?: string;
}

export const Modal = ({
  open,
  children,
  submitButtonText = 'Отправить',
  onClose,
  onSubmit,
  modalTitle,
}: ModalProps) => {
  const handleWrapperClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!open) return null;

  return (
    <div className={s.modal} onClick={onClose}>
      <div className={s.modalWrapper} onClick={handleWrapperClick}>
        <div className={s.modalHeader}>
          {modalTitle && (
            <Typography variant="h4" gutterBottom>
              {modalTitle}
            </Typography>
          )}
          <button className={s.closeButton} onClick={onClose}>
            <VscChromeClose />
          </button>
        </div>

        <div className={s.modalContent}>{children}</div>

        <div className={s.modalActions}>
          <button className={cn(s.closeActionButton, s.btn)} onClick={onClose}>
            Закрыть
          </button>
          <button className={cn(s.submitActionButton, s.btn)} onClick={onSubmit}>
            {submitButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};
