import * as Redux from 'redux';

export default <S>(store: Redux.MiddlewareAPI<S>) => 
    (next: Redux.Dispatch<S>) => 
    <A extends Redux.Action>(action: A): A  => {
    let result = action;
    // let actionMatch: boolean = false;

    let groupTitle = '';
    if (typeof action === 'function') {
        groupTitle = 'async action[redux-thunk]';
    } else if (typeof action.type === 'function') {
        groupTitle = 'async action[asyncAction]';        
    } else {
        groupTitle = `sync action[${action.type}]`;
    }
    console.group(groupTitle);
    // tslint:disable-next-line:no-console
    console.log('%c pre state', 'color: gray', store.getState());
    // tslint:disable-next-line:no-console
    console.log('%c action', 'color: blue', action);
    result = next(action);
    // tslint:disable-next-line:no-console
    console.log('%c next state', 'color: green', store.getState());
    console.groupEnd();
    
    // if (!actionMatch) {
    //     result = next(action);        
    // }
    return result;
};
