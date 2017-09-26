import * as Redux from 'redux';

import * as AuthType from '../../redux/actions/types/AuthType';
import * as AuthAction from '../../redux/actions/auth/AuthAction';
import IResponse from '../../interfaces/IResponse';

export default function dispatch(action: Redux.AnyAction, 
                                 store: Redux.MiddlewareAPI<{}>, 
                                 actionMatch: boolean): boolean {
    if (isAuthType(action)) {
        actionMatch = actionMatch || true;
        // tslint:disable-next-line:no-console
        console.log(action);
        switch (action.type) {
            case AuthType.permitLoad:
            permitLoad(action, store);
            break;
            default:
            break;
        }
    }    

    return actionMatch;
}

function isAuthType(action: Redux.AnyAction): action is AuthAction.Action {
    return action.type === AuthType.permitLoad;
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

async function loadRemotePermit(token: string): Promise<IResponse<Array<AuthAction.Permit>>> {
    let response = await fetch('/permit.json', { method: 'GET', headers: {'token': token}, credentials: 'include'});
    let data = response.json();
    return data;
}