import * as Auth from '../types/AuthType';
import * as Action from './AuthAction';
import IResponse from '../../../interfaces/IResponse';

const initAuthState: Action.AuthResponse = {
    token: localStorage.getItem('token') || ''
};

export function reducer(state: Action.AuthResponse = initAuthState, action: Action.AuthAction): Action.AuthResponse {
    let result: Action.AuthResponse = state;
    switch (action.type) {
        case Auth.authLogin:
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
            // result = {userName: 'xuefli', token: 'yyyyy'};
            // tslint:disable-next-line:no-console
            console.log('----------------------');
            break;

        case Auth.authLogout:
            if (state.token) {
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
            }
            break;

        default:
            break;
    }

    return result;
}

async function login(req: Action.AuthRequest | string): Promise<IResponse<Action.AuthResponse>> {
    let response = await fetch('/login.json', {mode: 'cors'});
    let data = response.json();
    return data;        
}

async function logout(req: string): Promise<IResponse<Action.AuthResponse>> {
    let response = await fetch('/logout.json', { method: 'POST', headers: {'token': req }, credentials: 'include'});
    let data = response.json();
    return data;        
}