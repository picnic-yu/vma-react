import * as Redux from 'redux';

import * as AuthType from '../../redux/actions/types/AuthType';
import * as AuthAction from '../../redux/actions/auth/AuthAction';
import IResponse from '../../interfaces/IResponse';
import * as MenuAction from '../../redux/actions/menu/MenuAction';

export default function dispatch(action: Redux.AnyAction, 
                                 store: Redux.MiddlewareAPI<{}>, 
                                 actionMatch: boolean): boolean {
    if (!actionMatch && isAuthType(action)) {
        actionMatch = actionMatch || true;
        // tslint:disable-next-line:no-console
        console.log(action);
        switch (action.type) {
            case AuthType.authLogin:
            accountLogin(action, store);
            break;
            case AuthType.tokenLogin:
            tokenLogin(action, store);
            break;
            case AuthType.authLogout:
            tokenLogout(action, store);
            break;
            default:
            break;
        }
    }

    return actionMatch;
}

function isAuthType(action: Redux.AnyAction): action is AuthAction.Action {
    return action.type === AuthType.authLogin || 
        action.type === AuthType.tokenLogin || 
        action.type === AuthType.authLogout;
}

function accountLogin(action: AuthAction.Action, store: Redux.MiddlewareAPI<{}>) {
    let loginAction: AuthAction.AuthAccountLoginAction = <AuthAction.AuthAccountLoginAction> action;
    let payLoad: AuthAction.AuthReqByAccount = loginAction.payload;
    // tslint:disable-next-line:no-console
    console.log('payLoad:' + JSON.stringify(payLoad));
    login(payLoad).then(response => {
        if (response.code === 0) {
            // tslint:disable-next-line:no-console
            console.log('登录:' + JSON.stringify(response));
            if (response.data) {
                // tslint:disable-next-line:no-shadowed-variable
                let data: AuthAction.AuthResp = {...response.data};
                store.dispatch(AuthAction.accountNotify(data));
                store.dispatch(MenuAction.menuLoad(data.token));
                store.dispatch(AuthAction.permitLoad({token: data.token}));
            }
        }                          
    }).catch(reason => {
        // tslint:disable-next-line:no-console
        console.log(reason);
    });    
}

function tokenLogin(action: AuthAction.Action,  store: Redux.MiddlewareAPI<{}>) {
    let tokenAction: AuthAction.AuthTokenLoginAction = <AuthAction.AuthTokenLoginAction> action;
    let payLoad: AuthAction.AuthReqByToken = tokenAction.payload;
    // tslint:disable-next-line:no-console
    console.log('payLoad:' + JSON.stringify(payLoad));
    login(payLoad.token).then(response => {
        if (response.code === 0) {
            // tslint:disable-next-line:no-console
            console.log('登录:' + JSON.stringify(response));
            if (response.data) {
                // tslint:disable-next-line:no-shadowed-variable
                let data: AuthAction.AuthResp = {...response.data};
                store.dispatch(AuthAction.accountNotify(data));
                store.dispatch(MenuAction.menuLoad(data.token));
                store.dispatch(AuthAction.permitLoad({token: data.token}));
            }
        }                          
    }).catch(reason => {
        // tslint:disable-next-line:no-console
        console.log(reason);
    });
}

function tokenLogout(action: AuthAction.Action,  store: Redux.MiddlewareAPI<{}>) {
    let tokenAction: AuthAction.AuthLogoutAction = <AuthAction.AuthLogoutAction> action;
    let payLoad: AuthAction.AuthReqByToken = tokenAction.payload;
    // tslint:disable-next-line:no-console
    console.log('payLoad:' + JSON.stringify(payLoad));
    logout(payLoad.token).then(response => {
        if (response.code === 0) {
            // tslint:disable-next-line:no-console
            console.log('登录:' + JSON.stringify(response));
            if (response.data) {
                // tslint:disable-next-line:no-shadowed-variable
                let data: AuthAction.AuthResp = {...response.data};
                store.dispatch(AuthAction.accountNotify(data));
            }
        }                          
    }).catch(reason => {
        // tslint:disable-next-line:no-console
        console.log(reason);
    });    
}

async function login(req: AuthAction.AuthReqByAccount | string): Promise<IResponse<AuthAction.AuthResp>> {
    let response = await fetch('/login.json', {mode: 'cors'});
    // tslint:disable-next-line:no-shadowed-variable
    let data = response.json();
    return data;        
}

async function logout(req: string): Promise<IResponse<AuthAction.AuthResp>> {
    let response = await fetch('/logout.json', { method: 'POST', headers: {'token': req }, credentials: 'include'});
    // tslint:disable-next-line:no-shadowed-variable
    let data = response.json();
    return data;        
}
