import React from 'react';
import { TextField, Typography } from '@mui/material';
import { ModalState } from 'app/hooks/useWarehouseModal';

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
        <div className="modalChildren">
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
        <div className="modalChildren">
          <Typography variant="body1">
            Вы уверены, что хотите удалить склад `{modalState.data?.warehouseName}`?
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
