import React from 'react';
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Typography,
} from '@mui/material';
import { ModalState } from 'app/hooks/useModal';
import s from './ModalContent.module.scss';

interface Props {
  modalState: ModalState;
  text: string;
  setText: (text: string) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
}

export const ProductsModalContent: React.FC<Props> = ({
  modalState,
  text,
  setText,
  quantity,
  setQuantity,
}) => {
  const [deleteOption, setDeleteOption] = React.useState<'all' | 'partial'>('all');
  console.log('modalState', modalState);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === 'all' || value === 'partial') {
      setDeleteOption(value);
    }
  };

  switch (modalState.type) {
    case 'add':
      return (
        <div className={s.modalChildren}>
          <TextField
            id="outlined-basic"
            label="Название товара"
            variant="outlined"
            sx={{ width: '400px', borderRadius: '12px' }}
            value={text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Количество товара"
            variant="outlined"
            sx={{ width: '400px', borderRadius: '12px' }}
            value={quantity}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuantity(Number(e.target.value))
            }
          />
        </div>
      );
    case 'delete':
      return (
        <div className={s.modalChildren}>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={deleteOption}
              onChange={handleRadioChange}
              name="radio-buttons-group"
            >
              <FormControlLabel value="all" control={<Radio />} label="Удалить весь товар" />
              <FormControlLabel
                value="partial"
                control={<Radio />}
                label="Удалить конкретное значение"
              />
            </RadioGroup>
          </FormControl>

          {deleteOption === 'partial' && (
            <div>
              <Typography variant="body2" gutterBottom>
                {' '}
                Какое количество вы хотите удалить?
              </Typography>
              <TextField
                id="delete-quantity"
                label="Количество для удаления"
                variant="outlined"
                type="number"
                sx={{ width: '400px', borderRadius: '12px' }}
                value={quantity}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setQuantity(Number(e.target.value))
                }
              />
            </div>
          )}
        </div>
      );
    default:
      return null;
  }
};
