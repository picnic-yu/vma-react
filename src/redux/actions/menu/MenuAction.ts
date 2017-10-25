import { Action } from 'redux';
import * as MenuType from '../types/MenuType';

import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import { Root as State } from '../../state/index';
import IResponse from '../../../interfaces/IResponse';

export interface Menu {
    menuID: number;
    name: string;
    url: string;
    children: Array<Menu>;
}

export interface MenuAction<T> extends Action {
    payload: T;
}

export interface MenuNotifyAction extends MenuAction<Array<Menu>> {
    type: MenuType.MENU_NOTIFY;
}

export function menuNotify(data: Array<Menu>): MenuNotifyAction {
    return {
        type: MenuType.menuNotify,
        payload: data
    };
}

export type Action = MenuNotifyAction;

export const loadMenu: (token: string) => ThunkAction<void, State, null> = (token: string) => {
    return (dispatch: Dispatch<State>, getState: () => State) => {
        fetch('/menu.json', { method: 'GET', headers: {'token': token}, credentials: 'include'}).then(response =>  {
            response.json().then((data: IResponse<Array<Menu>>) => {
                if (data.code === 0) {
                    // tslint:disable-next-line:no-console
                    console.log('登录:' + JSON.stringify(data));
                    if (data.data) {
                        dispatch(menuNotify(data.data));
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
