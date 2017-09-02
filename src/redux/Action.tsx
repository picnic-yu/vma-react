import { Action } from 'redux';
import * as State from './State';

export const LOGIN = 'login';
export const LOGOUT = 'logout';
export type UserHandle = 'login' | 'logout';

export interface UserAction extends Action {
    type: UserHandle;
    state: State.User;
}

export function userLogin(loginResult: State.User): UserAction {
    // tslint:disable-next-line:no-console
    console.log(loginResult);
    return {
        type: LOGIN,
        state: loginResult
    };
}

export function userLogout(logoutResult: State.User): UserAction {
    return {
        type: LOGOUT,
        state: logoutResult
    };
}