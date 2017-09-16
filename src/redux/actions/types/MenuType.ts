export const menuByToken = 'menuLoad';
export const menuNotify = 'menuNotify';

export type MENU_LOAD = typeof menuByToken;
export type MENU_NOTIFY = typeof menuNotify;

export type MENU = MENU_LOAD | MENU_NOTIFY;