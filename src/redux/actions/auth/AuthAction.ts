import { Action } from 'redux';

import * as AuthType from '../types/AuthType';

import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import { Root as State } from '../../state/index';
import IResponse from '../../../interfaces/IResponse';
import * as Remote from '../../../remote/Remote';
// import { remoteMenu } from '../menu/MenuAction';

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
    oper?: Array<OperType>;
}

export type OperType = 'list' | 'view' | 'create' | 'delete' | 'update' | 'audit' | 'downLoad';

export interface AuthAction<T> extends Action {
    payload: T;
}

export interface AuthNotifyAction extends AuthAction<AuthReqByToken> {
    type: AuthType.AUTH_Notify;
}

export interface PermitNotifyAction extends AuthAction<Array<Permit>> {
    type: AuthType.AUTH_PERMIT;
}

export interface AccountDispatch {
    // accountLogin: (req: AuthReqByAccount) => AuthAccountLoginAction;
    accountLogin: (req: AuthReqByAccount) => void;
    // accountLogout: (req: AuthReqByToken) => AuthTokenLoginAction;
}

export function accountNotify(data: AuthResp): AuthNotifyAction {
    return {
        type: AuthType.authNotify,
        payload: data
    };
}

export function permitNotify(data: Array<Permit>): PermitNotifyAction {
    return {
        type: AuthType.permitNotify,
        payload: data
    };
}

export type Action = AuthNotifyAction | PermitNotifyAction;

export const login: (param: AuthReqByAccount) => ThunkAction<void, State, null> = (param: AuthReqByAccount) => {
    return (dispatch: Dispatch<State>, getState: () => State) => {
        // Remote.post<AuthResp>('/login.ajax', {}, param).then(response => {
        Remote.get<AuthResp>('login.json').then(response => {
            const { code, codeMsg, data } = response;
            if (code === 0) {
                if (data) {
                    dispatch(accountNotify(data));
                    // dispatch(remoteMenu(data.token));
                    // dispatch(loadPermit(data.token));        
                }
            } else {
                // tslint:disable-next-line:no-console
                console.log(`login error:${codeMsg}`);
            }
        });
        /*
        fetch('/login.json', {mode: 'cors'}).then(response =>  {
            response.json().then((data: IResponse<AuthResp>) => {
                if (data.code === 0) {
                    // tslint:disable-next-line:no-console
                    console.log('登入:' + JSON.stringify(data));
                    if (data.data) {
                        dispatch(accountNotify(data.data));
                        dispatch(loadMenu(data.data.token));
                        dispatch(loadPermit(data.data.token));        
                    }
                }                          
            }).catch(reason => {
                // tslint:disable-next-line:no-console
                console.log(reason);
            });
        }).catch(ex => {
            // tslint:disable-next-line:no-console
            console.log(ex);
        });
        */
    };
};

export const logout: (req: AuthReqByToken) => ThunkAction<void, State, null> = (req: AuthReqByToken) => {
    return (dispatch: Dispatch<State>, getState: () => State) => {
        fetch(
            '/logout.json', 
            { 
                method: 'POST', 
                headers: {'token': req.token }, 
                credentials: 'include'
            }).then(response =>  {
            response.json().then((data: IResponse<AuthResp>) => {
                if (data.code === 0) {
                    // tslint:disable-next-line:no-console
                    console.log('登出:' + JSON.stringify(data));
                    if (data.data) {
                        dispatch(accountNotify(data.data));
                    }
                }                          
            }).catch(reason => {
                // tslint:disable-next-line:no-console
                console.log(reason);
            });
        }).catch(ex => {
            // tslint:disable-next-line:no-console
            console.log(ex);
        });
    };
};

export const loadPermit: (token: string) => ThunkAction<void, State, null> = (token: string) => {
    return (dispatch: Dispatch<State>, getState: () => State) => {
        fetch('/permit.json', { method: 'GET', headers: {'token': token}, credentials: 'include'}).then(response =>  {
            response.json().then((data: IResponse<Array<Permit>>) => {
                if (data.code === 0) {
                    // tslint:disable-next-line:no-console
                    // console.log('获取权限:' + JSON.stringify(data));
                    if (data.data) {
                        dispatch(permitNotify(data.data));
                    }
                }                          
            }).catch(reason => {
                // tslint:disable-next-line:no-console
                console.log(reason);
            });
        }).catch(ex => {
            // tslint:disable-next-line:no-console
            console.log(ex);
        });
    };
};
