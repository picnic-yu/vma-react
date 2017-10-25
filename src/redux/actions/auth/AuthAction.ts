import { Action } from 'redux';

import * as AuthType from '../types/AuthType';

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
    permits?: Array<Permit>;
}

export interface Permit {
    url: string;
    oper?: Array<string>;
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
    type: AuthType.AUTH_Logout;
}

export interface AuthNotifyAction extends AuthAction<AuthReqByToken> {
    type: AuthType.AUTH_Notify;
}

export interface PermitLoadAction extends AuthAction<AuthReqByToken> {
    type: AuthType.AUTH_PermitLoad;
}

export interface PermitNotifyAction extends AuthAction<Array<Permit>> {
    type: AuthType.AUTH_PERMIT;
}

export interface AccountDispatch {
    // accountLogin: (req: AuthReqByAccount) => AuthAccountLoginAction;
    accountLogin: (req: AuthReqByAccount) => void;
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

export function permitLoad(data: AuthReqByToken): PermitLoadAction {
    return {
        type: AuthType.permitLoad,
        payload: data
    };
}

export function permitNotify(data: Array<Permit>): PermitNotifyAction {
    return {
        type: AuthType.permitNotify,
        payload: data
    };
}

export type Action = AuthAccountLoginAction | AuthTokenLoginAction | 
                     AuthLogoutAction | AuthNotifyAction | 
                     PermitLoadAction | PermitNotifyAction;
