import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { AvatarProvider } from './context/Avatar';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AvatarProvider>
        <App />
      </AvatarProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
