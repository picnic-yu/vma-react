import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import * as State from './state';

import {
    initConfigState,
    reducer as ConfigReducer
} from './actions/config/ConfigReducer';
import {
    initAuthState as initAuthState,
    reducer as authReducer
} from './actions/auth/AuthReducer';

import {
    initMenuState as initMenuState,
    reducer as menuReducer
} from './actions/menu/MenuReducer';

export const initState: State.Root = {
    config: initConfigState,
    auth: initAuthState,
    menu: initMenuState
};

export const reducers = combineReducers<State.Root>({
    config: ConfigReducer,
    auth: authReducer,
    menu: menuReducer,
    router: routerReducer
});