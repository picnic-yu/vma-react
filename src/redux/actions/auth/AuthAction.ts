import { Action } from 'redux';

import * as AuthType from '../types/AuthType';
// import IFormItemStates from '../../../interfaces/IFormItemStates';
// import IRequest from '../../../interfaces/IRequest';
// import IResponse from '../../../interfaces/IResponse';

export interface AuthReqByAccount {
    userName: string;
    password: string;
    verifyCode?: string;
    autoLogin?: boolean;    
}

export interface AuthReqByToken {
    token: string;
}

export interface AuthResp {
    userName: string;
    portrait?: string;
    token: string;    
}

export interface AuthAction<T> extends Action {
    payload: T;
}

export interface AuthAccountLoginAction extends AuthAction<AuthReqByAccount> {
    type: AuthType.AUTH_LoginByAccount;
}

export interface AuthTokenLoginAction extends AuthAction<AuthReqByToken> {
    type: AuthType.AUTH_LoginByToken;
}

export interface AuthLogoutAction extends AuthAction<AuthReqByToken> {
    type: AuthType.AUTH_LOGOUT;
}

export interface AuthNotifyAction extends AuthAction<AuthResp> {
    type: AuthType.AUTH_NOTIFY;
}

export interface AccountDispatch {
    accountLogin: (req: AuthReqByAccount) => AuthAccountLoginAction;
    // accountLogout: (req: AuthReqByToken) => AuthTokenLoginAction;
}

export function accountLogin(req: AuthReqByAccount): AuthAccountLoginAction {
    return {
        type: AuthType.authLogin,
        payload: req
    };
}

export function accountNotify(data: AuthResp): AuthNotifyAction {
    return {
        type: AuthType.authNotify,
        payload: data
    };
}

export type Action = AuthAccountLoginAction | AuthTokenLoginAction | AuthLogoutAction | AuthNotifyAction;
