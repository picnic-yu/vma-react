import * as Redux from 'redux';

import authDispatch from './middleware/auth';
import menuDispatch from './middleware/menu';
import permitDispatch from './middleware/permit';

export default <S>(store: Redux.MiddlewareAPI<S>) => 
    (next: Redux.Dispatch<S>) => 
    <A extends Redux.Action>(action: A): A  => {
    let result = action;
    let actionMatch: boolean = false;
    actionMatch = authDispatch(action, store, actionMatch);
    actionMatch = menuDispatch(action, store, actionMatch);
    actionMatch = permitDispatch(action, store, actionMatch);
    
    if (!actionMatch) {
        result = next(action);        
    }
    return result;
};
