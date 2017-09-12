export const authLogin = 'accountLogin';
export const tokenLogin = 'tokenLogin';
export const authLogout = 'logout';
export const authNotify = 'authNotify';

export type AUTH_LoginByAccount = typeof authLogin;
export type AUTH_LoginByToken = typeof tokenLogin;
export type AUTH_LOGOUT = typeof authLogout;
export type AUTH_NOTIFY = typeof authNotify;
export type AUTH = AUTH_LoginByAccount | AUTH_LoginByToken | AUTH_LOGOUT | AUTH_NOTIFY;