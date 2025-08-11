import React from 'react';
import { Link } from 'react-router-dom';
import s from './Header.module.css';

export const Header = () => {
  return (
    <div className={s.headerContainer}>
      <Link to="/">
        <h1>
          Мой<span>склад</span>
        </h1>
      </Link>
    </div>
  );
};
