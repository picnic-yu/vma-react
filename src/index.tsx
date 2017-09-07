import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './App';
import { default as Login } from './containers/auth/Login';
// import * as State from './redux/State';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

// import { reducer } from './redux/Reducer';
import { reducer } from './redux/actions/auth/AuthReducer';
import * as Action from './redux/actions/auth/AuthAction';

const store = createStore<Action.AuthResponse>(reducer);

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
    <Switch>
      {(store.getState().token || '').length === 0 &&
        <Route path="/login" component={Login}/>
      }
      <Route 
        path="/" 
        render={(props) => (
        (store.getState().token || '').length !== 0 ? (
          <App {...props}/>
        ) : (
          <Redirect to="/login"/>
        )
        )}
      />
    </Switch>
  {/* <App /> */}
  </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
