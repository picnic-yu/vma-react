import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import { AuthReqByAccount, AuthReqByToken } from '../../redux/actions/auth/AuthAction';
import { Root as State } from '../state/index';
import IResponse from '../../interfaces/IResponse';
import { AuthResp, accountNotify } from '../../redux/actions/auth/AuthAction';
// import * as MenuAction from '../../redux/actions/menu/MenuAction';
import * as AuthAction from '../../redux/actions/auth/AuthAction';
import { loadMenu } from './menu';

export const login: (param: AuthReqByAccount) => ThunkAction<void, State, null> = (param: AuthReqByAccount) => {
    return (dispatch: Dispatch<State>, getState: () => State) => {
        fetch('/login.json', {mode: 'cors'}).then(response =>  {
            response.json().then((data: IResponse<AuthResp>) => {
                if (data.code === 0) {
                    // tslint:disable-next-line:no-console
                    console.log('登录:' + JSON.stringify(data));
                    if (data.data) {
                        dispatch(accountNotify(data.data));
                        dispatch(loadMenu(data.data.token));
                        dispatch(AuthAction.permitLoad({token: data.data.token}));        
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
                    console.log('登录:' + JSON.stringify(data));
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