import React from 'react';
import {CustomButton} from "app/components";
import s from './ProductsList.module.scss';

interface ProductsListProps {
  id: string | number;
  name: string;
  quantity: number;
  openDeleteModal: (id: string | number, name: string) => void;
}

export const ProductsList: React.FC<ProductsListProps> = ({ id, name, openDeleteModal }) => {
  return <div className={s.productItem}>
      <div className={s.item}>
          <div className={s.nameItem}>{name}</div>
          <CustomButton variant={"outlined"} name='Удалить' onClick={()=> openDeleteModal(id, name)}/>
      </div>
  </div>;
};
