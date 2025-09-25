import React from 'react';
import { Link } from 'react-router-dom';
import { CustomButton } from 'app/components';

import s from './WarehouseList.module.scss';

interface WarehousesListProps {
  id: string | number;
  name: string;
  openEditModal: (id: string | number, name: string) => void;
  openDeleteModal: (id: string | number, name: string) => void;
}

export const WarehousesList: React.FC<WarehousesListProps> = ({
  id,
  name,
  openEditModal,
  openDeleteModal,
}) => {
  return (
    <div className={s.warehouseItem}>
      <Link to={`/warehouses/${id}`}>{name}</Link>
      <div className={s.warehouseButtons}>
        <CustomButton
          variant="outlined"
          name="Редактировать"
          onClick={() => openEditModal(id, name)}
        />
        <CustomButton variant="outlined" name="Удалить" onClick={() => openDeleteModal(id, name)} />
      </div>
    </div>
  );
};
