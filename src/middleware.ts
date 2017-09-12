import * as Redux from 'redux';

import * as AuthType from './redux/actions/types/AuthType';
import * as Action from './redux/actions/auth/AuthAction';
import IResponse from './interfaces/IResponse';

function isType(action: Redux.AnyAction): action is Action.Action {
    return action.type === AuthType.authLogin || 
        action.type === AuthType.tokenLogin || 
        action.type === AuthType.authLogout;
}

export default <S>(store: Redux.MiddlewareAPI<S>) => 
    (next: Redux.Dispatch<S>) => 
    <A extends Redux.Action>(action: A): A  => {
    let result = action;
    if (isType(action)) {
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
    } else {
        result = next(action);
    }
    return result;
};

function accountLogin(action: Action.Action, store: Redux.MiddlewareAPI<{}>) {
    let loginAction: Action.AuthAccountLoginAction = <Action.AuthAccountLoginAction> action;
    let payLoad: Action.AuthReqByAccount = loginAction.payload;
    // tslint:disable-next-line:no-console
    console.log('payLoad:' + JSON.stringify(payLoad));
    login(payLoad).then(response => {
        if (response.code === 0) {
            // tslint:disable-next-line:no-console
            console.log('登录:' + JSON.stringify(response));
            if (response.data) {
                let data: Action.AuthResp = {...response.data};
                store.dispatch(Action.accountNotify(data));
            }
        }                          
    }).catch(reason => {
        // tslint:disable-next-line:no-console
        console.log(reason);
    });    
}

function tokenLogin(action: Action.Action,  store: Redux.MiddlewareAPI<{}>) {
    let tokenAction: Action.AuthTokenLoginAction = <Action.AuthTokenLoginAction> action;
    let payLoad: Action.AuthReqByToken = tokenAction.payload;
    // tslint:disable-next-line:no-console
    console.log('payLoad:' + JSON.stringify(payLoad));
    login(payLoad.token).then(response => {
        if (response.code === 0) {
            // tslint:disable-next-line:no-console
            console.log('登录:' + JSON.stringify(response));
            if (response.data) {
                let data: Action.AuthResp = {...response.data};
                store.dispatch(Action.accountNotify(data));
            }
        }                          
    }).catch(reason => {
        // tslint:disable-next-line:no-console
        console.log(reason);
    });
}

function tokenLogout(action: Action.Action,  store: Redux.MiddlewareAPI<{}>) {
    let tokenAction: Action.AuthLogoutAction = <Action.AuthLogoutAction> action;
    let payLoad: Action.AuthReqByToken = tokenAction.payload;
    // tslint:disable-next-line:no-console
    console.log('payLoad:' + JSON.stringify(payLoad));
    logout(payLoad.token).then(response => {
        if (response.code === 0) {
            // tslint:disable-next-line:no-console
            console.log('登录:' + JSON.stringify(response));
            if (response.data) {
                let data: Action.AuthResp = {...response.data};
                store.dispatch(Action.accountNotify(data));
            }
        }                          
    }).catch(reason => {
        // tslint:disable-next-line:no-console
        console.log(reason);
    });    
}
/*
login(action.req).then((response) => {
    if (response.code === 0) {
        // tslint:disable-next-line:no-console
        console.log('登录:' + JSON.stringify(response));
        if (response.data) {
            let data: Action.AuthResponse = {...response.data};
            result = data;
            // tslint:disable-next-line:no-console
            console.log('result:' + JSON.stringify(result));
            localStorage.setItem('token', result.token || '');
        }
    }
});

logout(state.token).then((response) => {
    if (response.code) {
        // tslint:disable-next-line:no-console
        console.log('登出:' + JSON.stringify(response));
        let data: Action.AuthResponse = { token: ''};
        result = {...data};
        delete result.portrait;
        delete result.userName;
    }
});
*/

async function login(req: Action.AuthReqByAccount | string): Promise<IResponse<Action.AuthResp>> {
    let response = await fetch('/login.json', {mode: 'cors'});
    let data = response.json();
    return data;        
}

async function logout(req: string): Promise<IResponse<Action.AuthResp>> {
    let response = await fetch('/logout.json', { method: 'POST', headers: {'token': req }, credentials: 'include'});
    let data = response.json();
    return data;        
}
