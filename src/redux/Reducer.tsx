import 'whatwg-fetch';

import * as State from './State';
import * as Action from './Action';

const initialState: State.User = {
    name: '',
    icon: '',
    token: localStorage.getItem('token') || ''
};
export function reducer(state: State.User = initialState, action: Action.UserAction): State.User {
    let result: State.User = initialState;
    // tslint:disable-next-line:no-console
    console.log(action.type);
    switch (action.type) {
        case Action.LOGIN :
            result = {...state, ...action.state};
            localStorage.setItem('token', result.token);
            break;
        case Action.LOGOUT:
            result = {...state, ...action.state};
            break;
        default:
            result = state;
            break;
    }
    
    return result; 
}