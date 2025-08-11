import React from 'react';
import { Link } from 'react-router-dom';
import { MdShelves } from 'react-icons/md';
import { GiShinyApple } from 'react-icons/gi';
import s from './Dashboard.module.css';

export const Dashboard = () => {
  return (
    <div className={s.dashboardContainer}>
      <Link to={'/warehouses'}>
        <div className={`${s.item} ${s.itemWarehouses}` }>
          <MdShelves />
          <p>Склады</p>
        </div>
      </Link>
      <Link to={'/products'}>
        <div className={s.item}>
          <GiShinyApple />
          <p>Продукты</p>
        </div>
      </Link>
    </div>
  );
};
