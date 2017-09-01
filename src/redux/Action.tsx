import * as State from './State';

export const LOGIN = 'login';
export const LOGOUT = 'logout';
export type UserHandle = 'login' | 'logout';

export interface UserAction {
    type: UserHandle;
    state: State.User;
}

export function userLogin(loginResult: State.User): UserAction {
    console.log(loginResult);
    return {
        type: LOGIN,
        state: loginResult
    }
}