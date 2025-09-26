import React from 'react';
import { TextField } from '@mui/material';
import { ModalState } from 'app/hooks/useModal';

interface Props {
  modalState: ModalState;
  text: string;
  setText: (text: string) => void;
}

export const ProductsModalContent: React.FC<Props> = ({ modalState, text, setText }) => {
  switch (modalState.type) {
    case 'add':
      return (
        <div className="modalChildren">
          <TextField
            id="outlined-basic"
            label="Название товара"
            variant="outlined"
            sx={{ width: '400px', borderRadius: '12px' }}
            value={text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          />
        </div>
      );
    case 'delete':
      return <div className="modalChildren"></div>;
    default:
      return null;
  }
};
