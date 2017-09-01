import * as State from './State';
import * as Action from './Action';

export function reducer(state: State.User, action: Action.UserAction): State.User {
    let result: State.User = {name: '', icon: '', token: ''};
    switch (action.type) {
        case Action.LOGIN :
            // todo
            Object.assign(result, {token: 'xxxx'});
            break;
        case Action.LOGOUT:
            // todo
            let name = '';
            let icon = '';
            Object.assign(result, {token: 'xxxx'}, {name: name}, {icon: icon});
            break;
        default:
            break;
    }
    
    return result; 
}