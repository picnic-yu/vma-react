import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import App from './App';
import { default as Login } from './containers/auth/Login';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import { default as middleware } from './middleware';
import thunk from 'redux-thunk';

import * as State from './redux/state';
import * as Reducers from './redux';

const store = createStore<State.Root>(Reducers.reducers, Reducers.initState, applyMiddleware(middleware, thunk));
// tslint:disable-next-line:max-line-length
// store.dispatch({type: 'authNotify', payload: { userName: 'xuefli', portrait: 'http://lorempixel.com/45/45/people', token: 'xxxx'}});

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
    <Switch>
      {(store.getState().auth.token || '').length === 0 &&
        <Route path="/login" component={Login}/>
      }
      <Route 
        path="/" 
        render={(props) => (
        (store.getState().auth.token || '').length !== 0 ? (
          <App {...props}/>
        ) : (
          <Redirect to="/login"/>
        )
        )}
      />
    </Switch>
  </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
