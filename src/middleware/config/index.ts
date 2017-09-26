import * as Redux from 'redux';

import * as ConfigType from '../../redux/actions/types/ConfigType';
import * as ConfigAction from '../../redux/actions/config/ConfigAction';
// import IResponse from '../../interfaces/IResponse';

export default function dispatch(action: Redux.AnyAction, 
                                 store: Redux.MiddlewareAPI<{}>, 
                                 actionMatch: boolean): boolean {
    if (!actionMatch && isConfigType(action)) {
        actionMatch = actionMatch || true;
        // tslint:disable-next-line:no-console
        console.log(action);
        switch (action.type) {
            case ConfigType.configRefresh:
            break;
            default:
            break;
        }
    }

    return actionMatch;
}

function isConfigType(action: Redux.AnyAction): action is ConfigAction.Action {
    return action.type === ConfigType.configRefresh;
}
