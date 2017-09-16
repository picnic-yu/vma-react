import { combineReducers } from 'redux';

import * as State from './state';

import {
    initAuthState as initAuthState,
    reducer as authReducer
} from './actions/auth/AuthReducer';

import {
    initMenuState as initMenuState,
    reducer as menuReducer
} from './actions/menu/MenuReducer';

export const initState: State.Root = {
    auth: initAuthState,
    menu: initMenuState
};

export const reducers = combineReducers<State.Root>({
    auth: authReducer,
    menu: menuReducer
});