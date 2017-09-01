import * as State from './State';

export const LOGIN = 'login';
export const LOGOUT = 'logout';
export type UserHandle = 'login' | 'logout';

export interface UserAction {
    type: UserHandle;
    state: State.User;
}