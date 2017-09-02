import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// import App from './App';
import { default as App } from './containers/Login';
import * as State from './redux/State';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import { reducer } from './redux/Reducer';

const store = createStore<State.User>(reducer);

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
  <App />
  </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
