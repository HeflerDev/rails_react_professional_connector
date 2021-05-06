import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from '../store/store';
import App from '../components/App';
import 'csstack';

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.body.appendChild(document.createElement('main')),
  );
});

store.subscribe(() => console.log(store.getState()));
