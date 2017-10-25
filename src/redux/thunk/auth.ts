import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import { AuthReqByAccount } from '../../redux/actions/auth/AuthAction';
import { Root as State } from '../state/index';
import IResponse from '../../interfaces/IResponse';
import { AuthResp, accountNotify } from '../../redux/actions/auth/AuthAction';

export const login: (param: AuthReqByAccount) => ThunkAction<void, State, null> = (param: AuthReqByAccount) => {
    return (dispatch: Dispatch<State>, getState: () => State) => {
        fetch('/login.json', {mode: 'cors'}).then(response =>  {
            response.json().then((data: IResponse<AuthResp>) => {
                if (data.code === 0) {
                    // tslint:disable-next-line:no-console
                    console.log('登录:' + JSON.stringify(data));
                    if (data.data) {
                        dispatch(accountNotify(data.data));
                    }
                }                          
            }).catch(reason => {
                // tslint:disable-next-line:no-console
                console.log(reason);
            });
        }).catch(ex => {
            // tslint:disable-next-line:no-console
            console.log(ex);
        });
    };
};