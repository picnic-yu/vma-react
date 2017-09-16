import { Action } from 'redux';
import * as MenuType from '../types/MenuType';

export interface Menu {
    menuID: number;
    name: string;
    url: string;
    children: Array<Menu>;
}

export interface MenuAction<T> extends Action {
    payload: T;
}

export interface MenuLoadAction extends MenuAction<string> {
    type: MenuType.MENU_LOAD;
}

export interface MenuNotifyAction extends MenuAction<Array<Menu>> {
    type: MenuType.MENU_NOTIFY;
}

export interface MenuDispatch {
    menuLoad: (token: string) => MenuLoadAction;
    // accountLogout: (req: AuthReqByToken) => AuthTokenLoginAction;
}

export function menuLoad(token: string): MenuLoadAction {
    return {
        type: MenuType.menuByToken,
        payload: token
    };
}

export function menuNotify(data: Array<Menu>): MenuNotifyAction {
    return {
        type: MenuType.menuNotify,
        payload: data
    };
}

export type Action = MenuLoadAction | MenuNotifyAction;
