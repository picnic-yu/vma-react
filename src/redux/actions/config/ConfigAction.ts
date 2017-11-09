import { Action } from 'redux';

import * as ConfigType from '../types/ConfigType';

export interface Config {
    toggle?: boolean;
    activeMenuURL?: string;
}

export interface ConfigAction<T> extends Action {
    payload: T;
}

export interface ConfigRefreshAction extends ConfigAction<Config> {
    type: ConfigType.ConfigRefresh;
}

export interface ConfigDispatch {
    // tslint:disable-next-line:no-any
    refresh: (configItem: any) => ConfigRefreshAction;
    // accountLogout: (req: AuthReqByToken) => AuthTokenLoginAction;
}

export function toggleRefresh(toggle: boolean): ConfigRefreshAction {
    return {
        type: ConfigType.configRefresh,
        payload: {
            toggle: toggle
        }
    };
}

export function activeMenuRefresh(activeMenuURL: string): ConfigRefreshAction {
    return {
        type: ConfigType.configRefresh,
        payload: {
            activeMenuURL: activeMenuURL,
        }
    };
}

export type Action = ConfigRefreshAction;