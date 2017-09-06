export const authLogin = 'login';
export type AUTH_LOGIN = typeof authLogin;
export const authLogout = 'logout';
export type AUTH_LOGOUT = typeof authLogout;

export type AUTH = AUTH_LOGIN | AUTH_LOGOUT;