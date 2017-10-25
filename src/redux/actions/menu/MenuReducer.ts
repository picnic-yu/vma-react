import * as Menu from '../types/MenuType';
import * as Action from './MenuAction';

export const initMenuState: Array<Action.Menu> = [];

export function reducer(state: Array<Action.Menu> = initMenuState, action: Action.Action): Array<Action.Menu> {
    let result: Array<Action.Menu> = state;
    switch (action.type) {
        case Menu.menuNotify:
            // tslint:disable-next-line:no-console
            console.log(JSON.stringify(action));
            result = Object.assign([], result, action.payload);
            break;
        default:
            break;
    }

    return result;
}