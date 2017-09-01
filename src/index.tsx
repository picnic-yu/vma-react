import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './App';
// import App from './view/Login';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { reducer } from './redux/Reducer';

const store = createStore(reducer)


// import { enthusiasm } from './reducers/index';
// import { StoreState } from './types/index';
// import Hello from './components/Hello';
// import Hello from './containers/Hello';

// const store = createStore<StoreState>(enthusiasm, {
//   enthusiasmLevel: 1,
//   languageName: 'TypeScript',
// });

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
  <App />
  {/* <Hello enthusiasmLevel={10} name="TypeScript"/> */}
  {/* <Hello/> */}

  </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
