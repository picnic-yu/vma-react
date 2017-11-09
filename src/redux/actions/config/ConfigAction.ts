import { Action } from 'redux';

import * as ConfigType from '../types/ConfigType';

export interface Config {
    toggle?: boolean;
    activeMenuURL?: string;
}

export interface ConfigAction<T> extends Action {
    payload: T;
}

/**
 * 全局配置信息刷新Action
 */ 
export interface ConfigRefreshAction extends ConfigAction<Config> {
    type: ConfigType.ConfigRefresh;
}

/**
 * 全局配置信息刷新Dispatch
 */
export interface ConfigDispatch {
    // tslint:disable-next-line:no-any
    refresh: (configItem: any) => ConfigRefreshAction;
    // accountLogout: (req: AuthReqByToken) => AuthTokenLoginAction;
}

/**
 * 折叠左侧菜单Dispatch
 * 
 * @param toggle 是否折叠左侧菜单
 */
export function toggleRefresh(toggle: boolean): ConfigRefreshAction {
    return {
        type: ConfigType.configRefresh,
        payload: {
            toggle: toggle
        }
    };
}

/**
 * 当前菜单项Dispatch
 * @param activeMenuURL 当前菜单项的URL
 */
export function activeMenuRefresh(activeMenuURL: string): ConfigRefreshAction {
    return {
        type: ConfigType.configRefresh,
        payload: {
            activeMenuURL: activeMenuURL,
        }
    };
}

export type Action = ConfigRefreshAction;