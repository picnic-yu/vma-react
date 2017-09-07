import { Action } from 'redux';

import * as Auth from '../types/AuthType';
import IFormItemStates from '../../../interfaces/IFormItemStates';
// import IResponse from '../../../interfaces/IResponse';

export interface AuthRequest extends IFormItemStates {
    userName: string;
    password: string;
    verifyCode?: string;
    autoLogin?: boolean;
}

export interface AuthResponse {
    userName?: string;
    portrait?: string;
    token?: string;
}

export interface AuthAction extends Action {
    type: Auth.AUTH;
    req: AuthRequest | string;
}

export function accountLogin(authRequest: AuthRequest): AuthAction {
    return {
        type: Auth.authLogin,
        req: authRequest
    };
}

export type AccountLogin = typeof accountLogin;

export function accountLogout(token: string): AuthAction {
    return {
        type: Auth.authLogout,
        req: token
    };
}

export type AccountLogout = typeof accountLogout;

export interface AccountDispatch {
    accountLogin: AccountLogin;
    accountLogout: AccountLogout;
}