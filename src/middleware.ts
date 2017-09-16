import * as Redux from 'redux';

import * as AuthType from './redux/actions/types/AuthType';
import * as AuthAction from './redux/actions/auth/AuthAction';

import * as MenuType from './redux/actions/types/MenuType';
import * as MenuAction from './redux/actions/menu/MenuAction';
import IResponse from './interfaces/IResponse';

function isAuthType(action: Redux.AnyAction): action is AuthAction.Action {
    return action.type === AuthType.authLogin || 
        action.type === AuthType.tokenLogin || 
        action.type === AuthType.authLogout ||
        action.type === AuthType.permitLoad;
}

function isMenuType(action: Redux.AnyAction): action is MenuAction.Action {
    return action.type === MenuType.menuByToken;
}
export default <S>(store: Redux.MiddlewareAPI<S>) => 
    (next: Redux.Dispatch<S>) => 
    <A extends Redux.Action>(action: A): A  => {
    let result = action;
    if (isAuthType(action)) {
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
            case AuthType.permitLoad:
            permitLoad(action, store);
            break;
            default:
            break;
        }
    } else if (isMenuType(action)) {
        // tslint:disable-next-line:no-console
        console.log(action);
        switch (action.type) {
            case MenuType.menuByToken:
                loadMenu(action, store);
                break;
        
            default:
                break;
        }        
    } else {
        result = next(action);
    }
    return result;
};

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

function permitLoad(action: AuthAction.Action,  store: Redux.MiddlewareAPI<{}>) {
    let tokenAction: AuthAction.AuthTokenLoginAction = <AuthAction.AuthTokenLoginAction> action;
    let payLoad: AuthAction.AuthReqByToken = tokenAction.payload;
    // tslint:disable-next-line:no-console
    console.log('payLoad:' + JSON.stringify(payLoad));
    loadRemotePermit(payLoad.token).then(response => {
        if (response.code === 0) {
            // tslint:disable-next-line:no-console
            console.log('登录:' + JSON.stringify(response));
            if (response.data) {
                // tslint:disable-next-line:no-shadowed-variable
                let data: Array<AuthAction.Permit> = {...response.data};
                store.dispatch(AuthAction.permitNotify(data));
            }
        }                          
    }).catch(reason => {
        // tslint:disable-next-line:no-console
        console.log(reason);
    });    
}

function loadMenu(action: MenuAction.Action,  store: Redux.MiddlewareAPI<{}>) {
    let tokenAction: MenuAction.MenuLoadAction = <MenuAction.MenuLoadAction> action;
    let payLoad: string = tokenAction.payload;
    // tslint:disable-next-line:no-console
    console.log('payLoad:' + JSON.stringify(payLoad));
    loadRemoteMenu(payLoad).then(response => {
        if (response.code === 0) {
            // tslint:disable-next-line:no-console
            console.log('菜单:' + JSON.stringify(response));
            if (response.data) {
                // tslint:disable-next-line:no-shadowed-variable
                let data: Array<MenuAction.Menu> = {...response.data};
                store.dispatch(MenuAction.menuNotify(data));
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

async function loadRemoteMenu(token: string): Promise<IResponse<Array<MenuAction.Menu>>> {
    let response = await fetch('/menu.json', { method: 'GET', headers: {'token': token}, credentials: 'include'});
    let data = response.json();
    return data;
}

async function loadRemotePermit(token: string): Promise<IResponse<Array<AuthAction.Permit>>> {
    let response = await fetch('/permit.json', { method: 'GET', headers: {'token': token}, credentials: 'include'});
    let data = response.json();
    return data;
}