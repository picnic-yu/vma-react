// import { Action } from 'redux';
import * as State from './State';
import * as Action from './Action';

const initialState: State.User = {
    name: '',
    icon: '',
    token: ''
};
export function reducer(state: State.User = initialState, action: Action.UserAction): State.User {
    let result: State.User = initialState;
    // tslint:disable-next-line:no-console
    console.log('action.type');
    // tslint:disable-next-line:no-console
    console.log(action.type);
    switch (action.type) {
        case Action.LOGIN :
            result = {...state, ...action.state};
            // Object.assign(result, {token: 'xxxx'});

            // tslint:disable-next-line:no-console
            console.log('result:' + JSON.stringify(result));
            break;
        case Action.LOGOUT:
            // let name = '';
            // let icon = '';
            // Object.assign(result, {token: 'xxxx'}, {name: name}, {icon: icon});
            result = {...state, ...action.state};
            break;
        default:
            result = state;
            break;
    }
    
    return result; 
}