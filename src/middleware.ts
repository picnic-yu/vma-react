import * as Redux from 'redux';

export default <S>(store: Redux.MiddlewareAPI<S>) => 
    (next: Redux.Dispatch<S>) => 
    <A extends Redux.Action>(action: A): A  => {
    let result = action;
    let actionMatch: boolean = false;
    
    if (!actionMatch) {
        result = next(action);        
    }
    return result;
};
