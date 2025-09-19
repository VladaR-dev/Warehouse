import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import './index.scss';
import { App } from './App';

const container = document.getElementById('root');

if (container) {
  const root = ReactDOM.createRoot(container);

  root.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
      ,
    </Provider>,
  );
}
