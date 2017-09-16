export const authLogin = 'accountLogin';
export const tokenLogin = 'tokenLogin';
export const authLogout = 'logout';
export const authNotify = 'authNotify';
export const permitLoad = 'permitLoad';
export const permitNotify = 'permitNotify';

export type AUTH_LoginByAccount = typeof authLogin;
export type AUTH_LoginByToken = typeof tokenLogin;
export type AUTH_Logout = typeof authLogout;
export type AUTH_Notify = typeof authNotify;
export type AUTH_PermitLoad = typeof permitLoad;
export type AUTH_PERMIT = typeof permitNotify;
export type AUTH = AUTH_LoginByAccount | AUTH_LoginByToken | AUTH_Logout | AUTH_Notify | AUTH_PermitLoad | AUTH_PERMIT;