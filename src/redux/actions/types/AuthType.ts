export const authNotify = 'authNotify';
export const permitNotify = 'permitNotify';

export type AUTH_Notify = typeof authNotify;
export type AUTH_PERMIT = typeof permitNotify;
export type AUTH = AUTH_Notify | AUTH_PERMIT;