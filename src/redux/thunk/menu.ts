import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import { Root as State } from '../state/index';
import IResponse from '../../interfaces/IResponse';
import * as MenuAction from '../../redux/actions/menu/MenuAction';

export const loadMenu: (token: string) => ThunkAction<void, State, null> = (token: string) => {
    return (dispatch: Dispatch<State>, getState: () => State) => {
        fetch('/menu.json', { method: 'GET', headers: {'token': token}, credentials: 'include'}).then(response =>  {
            response.json().then((data: IResponse<Array<MenuAction.Menu>>) => {
                if (data.code === 0) {
                    // tslint:disable-next-line:no-console
                    console.log('登录:' + JSON.stringify(data));
                    if (data.data) {
                        dispatch(MenuAction.menuNotify(data.data));
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
