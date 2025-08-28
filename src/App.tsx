import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header, Dashboard } from './components';
import { Main, Products, Warehouses } from './pages';
import './App.scss';

export const App = () => {
  return (
    <div className="appContainer">
      <Header />
      <div className="mainContainer">
        <Dashboard />
        <div className="pagesContainer">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/warehouses" element={<Warehouses />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
