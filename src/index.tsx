import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import { App } from './App';
import React from 'react';

const container = document.getElementById('root');

if (container) {
  const root = ReactDOM.createRoot(container);

  root.render(
    <Router>
      <App />
    </Router>
  );
}
