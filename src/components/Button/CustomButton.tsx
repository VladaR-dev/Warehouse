import React from 'react';
import MuiButton, { ButtonProps } from '@mui/material/Button';

interface CustomButtonProps extends ButtonProps {
  name: string;
}

export const CustomButton: React.FC<CustomButtonProps> = ({ name, onClick, ...props }) => {
  return (
    <MuiButton
      sx={{
        textTransform: 'lowercase',
        display: 'block',
        '&::first-letter': {
          textTransform: 'uppercase',
        },
      }}
      onClick={onClick}
      {...props}
    >
      {name}
    </MuiButton>
  );
};
