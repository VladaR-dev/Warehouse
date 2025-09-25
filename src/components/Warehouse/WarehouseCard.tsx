import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { CustomButton, WarehouseDetails } from 'app/components';
import { RootState } from 'app/redux/store';
import { WarehouseType } from 'app/redux/slices/warehouseSlice';
import s from './WarehouseCard.module.scss';

export const WarehouseCard = () => {
  const { id: cardId } = useParams<{ id: string }>();
  const warehouses = useSelector((state: RootState) => state.warehouse);
  console.log('===>warehouses', warehouses);

  const currentWarehouse = warehouses.items.find(
    (warehouse: WarehouseType) => warehouse.id === cardId,
  );

  if (!currentWarehouse) {
    return <div>Склад не найден</div>;
  }

  console.log('===>cardId', cardId);
  console.log('===>currentWarehouse', currentWarehouse);

  return (
    <div className={s.warehouseCardContainer}>
      <div className={s.warehouseCardHeader}>
        <Typography variant="h4" gutterBottom>
          {currentWarehouse.name} склад
        </Typography>
        <div className={s.buttons}>
          <CustomButton
            variant="outlined"
            name="Переместить товары"
            onClick={() => null}
          />
          <CustomButton
            variant="contained"
            name="Добавить товар"
            onClick={() => null}
          />
        </div>
      </div>

      <WarehouseDetails />
    </div>
  );
};
