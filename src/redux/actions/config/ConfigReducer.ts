import * as Config from '../types/ConfigType';
import * as Action from './ConfigAction';

export const initConfigState: Action.Config = {
    toggle: false,
    activeMenuID: 0,
    curDeep: 0
};

export function reducer(state: Action.Config = initConfigState, action: Action.Action): Action.Config {
    let result: Action.Config = state;
    switch (action.type) {
        case Config.configRefresh:
            // tslint:disable-next-line:no-console
            console.log(JSON.stringify(action));
            result = Object.assign({}, result, action.payload);
            break;
        default:
            break;
    }

    return result;
}
