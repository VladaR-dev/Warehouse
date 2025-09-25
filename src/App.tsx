import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header, Dashboard, WarehouseCard } from 'app/components';
import { Products, Warehouses } from './pages';
import './App.scss';

export const App = () => {
  return (
    <div className="appContainer">
      <Header />
      <div className="mainContainer">
        <Dashboard />
        <div className="pagesContainer">
          <Routes>
            <Route path="/" element={<Warehouses />} />
            <Route path="/warehouses" element={<Warehouses />} />
            <Route path="/warehouses/:id" element={<WarehouseCard />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
