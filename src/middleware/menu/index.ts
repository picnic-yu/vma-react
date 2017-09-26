import * as Redux from 'redux';

import * as MenuType from '../../redux/actions/types/MenuType';
import IResponse from '../../interfaces/IResponse';
import * as MenuAction from '../../redux/actions/menu/MenuAction';

export default function dispatch(action: Redux.AnyAction, 
                                 store: Redux.MiddlewareAPI<{}>, 
                                 actionMatch: boolean): boolean {
    if (!actionMatch && isMenuType(action)) {
        actionMatch = actionMatch || true;
        // tslint:disable-next-line:no-console
        console.log(action);
        switch (action.type) {
            case MenuType.menuByToken:
                loadMenu(action, store);
                break;
        
            default:
                break;
        }        
    }

    return actionMatch;
}

function isMenuType(action: Redux.AnyAction): action is MenuAction.Action {
    return action.type === MenuType.menuByToken;
}

function loadMenu(action: MenuAction.Action,  store: Redux.MiddlewareAPI<{}>) {
    let tokenAction: MenuAction.MenuLoadAction = <MenuAction.MenuLoadAction> action;
    let payLoad: string = tokenAction.payload;
    // tslint:disable-next-line:no-console
    console.log('payLoad:' + JSON.stringify(payLoad));
    loadRemoteMenu(payLoad).then(response => {
        if (response.code === 0) {
            // tslint:disable-next-line:no-console
            console.log('菜单:' + JSON.stringify(response));
            if (response.data) {
                // tslint:disable-next-line:no-shadowed-variable
                let data: Array<MenuAction.Menu> = {...response.data};
                store.dispatch(MenuAction.menuNotify(data));
            }
        }                          
    }).catch(reason => {
        // tslint:disable-next-line:no-console
        console.log(reason);
    });
}

async function loadRemoteMenu(token: string): Promise<IResponse<Array<MenuAction.Menu>>> {
    let response = await fetch('/menu.json', { method: 'GET', headers: {'token': token}, credentials: 'include'});
    let data = response.json();
    return data;
}
