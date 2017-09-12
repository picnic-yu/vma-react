import * as Auth from '../types/AuthType';
import * as Action from './AuthAction';
// import IResponse from '../../../interfaces/IResponse';

const initAuthState: Action.AuthResp = {
    userName: '',
    portrait: '',
    token: localStorage.getItem('token') || ''
};

export function reducer(state: Action.AuthResp = initAuthState, action: Action.Action): Action.AuthResp {
    let result: Action.AuthResp = state;
    switch (action.type) {
        case Auth.authLogin:
            // tslint:disable-next-line:no-console
            console.log(JSON.stringify(action));
            break;
        case Auth.tokenLogin:
            // tslint:disable-next-line:no-console
            console.log(JSON.stringify(action));
            break;
        case Auth.authNotify:
            // tslint:disable-next-line:no-console
            console.log(JSON.stringify(action));
            localStorage.setItem('token', action.payload.token);
            result = Object.assign({}, result, action.payload);
            break;
        case Auth.authLogout:
            break;
        default:
            break;
    }

    return result;
}
