import React from 'react';
import { TextField, Typography } from '@mui/material';
import { ModalState } from 'app/hooks/useModal';
import s from './ModalContent.module.scss';

interface Props {
  modalState: ModalState;
  text: string;
  setText: (text: string) => void;
}

export const WarehousesModalContent: React.FC<Props> = ({ modalState, text, setText }) => {
  switch (modalState.type) {
    case 'add':
    case 'edit':
      return (
        <div className={s.modalChildren}>
          <TextField
            id="outlined-basic"
            label="Название склада"
            variant="outlined"
            sx={{ width: '400px', borderRadius: '12px' }}
            value={text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          />
        </div>
      );
    case 'delete':
      return (
        <div className={s.modalChildren}>
          <Typography variant="body1">
            Вы уверены, что хотите удалить склад `{modalState.data?.name}`?
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Это действие нельзя отменить.
          </Typography>
        </div>
      );
    default:
      return null;
  }
};
