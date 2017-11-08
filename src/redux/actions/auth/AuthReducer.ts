import * as Auth from '../types/AuthType';
import * as Action from './AuthAction';
// import IResponse from '../../../interfaces/IResponse';

export const initAuthState: Action.AuthResp = {
    userName: '',
    portrait: '',
    token: localStorage.getItem('token') || '',
    permits: []
};

export function reducer(state: Action.AuthResp = initAuthState, action: Action.Action): Action.AuthResp {
    let result: Action.AuthResp = state;
    switch (action.type) {
        case Auth.authNotify:
            // tslint:disable-next-line:no-console
            console.log(JSON.stringify(action));
            localStorage.setItem('token', action.payload.token);
            result = Object.assign({}, result, action.payload);
            break;
        case Auth.permitNotify:
            // tslint:disable-next-line:no-console
            console.log(JSON.stringify(action));
            result = Object.assign({}, result, {permits: action.payload});
            break;
        default:
            break;
    }

    return result;
}
