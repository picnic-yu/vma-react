import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, Switch, Redirect } from 'react-router-dom';
import { createStore, applyMiddleware, Store } from 'redux';
import { Provider } from 'react-redux';

import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import App from './App';
import Login from './view/auth/Login';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import middleware from './middleware';
import asyncAction from './AsyncAction';
import thunk from 'redux-thunk';

import * as State from './redux/state';
import * as Reducers from './redux';
import Demo from './Demo';
// import './mock';

const history = createHistory();
const routeMiddleware = routerMiddleware(history);

let store: Store<State.Root>;
if (process.env.NODE_ENV !== 'production') {
  store = createStore<State.Root>(
      Reducers.reducers,
      Reducers.initState, 
      applyMiddleware(middleware, asyncAction, thunk, routeMiddleware));
} else {
  store = createStore<State.Root>(Reducers.reducers, Reducers.initState, applyMiddleware(thunk, routeMiddleware));  
}
// tslint:disable-next-line:max-line-length
// store.dispatch({type: 'authNotify', payload: { userName: 'xuefli', portrait: 'http://lorempixel.com/45/45/people', token: 'xxxx'}});
// store.dispatch({type: () => {
//   console.warn(`simulator asyncAction`);
// }});
// store.dispatch(push('/goods'));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        {(store.getState().auth.token || '').length === 0 &&
          <Route path="/login" component={Login}/>
        }
        <Route path="/demo" component={Demo}/>
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
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
