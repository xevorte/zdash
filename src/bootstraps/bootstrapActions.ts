import * as CONST from './bootstrapConstants'

export const setLogin = (payload: any) => ({
  type: CONST.SET_LOGIN,
  payload
});

export const setSidebar = (payload: any) => ({
  type: CONST.SET_SIDEBAR_TOGGLE,
  payload
});