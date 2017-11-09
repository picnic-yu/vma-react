import { Dispatch, Action } from 'redux';

/**
 * 异步Action，利用Redux.Action的type为any，用middleware优先处理
 */
export interface AsyncAction<S> extends Action  {
    type: (dispatch: Dispatch<S>, getState: () => S) => void;
}
