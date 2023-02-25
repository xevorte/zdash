import * as CONST from './bootstrapConstants';
import initialStates from './bootstrapInitialStates';

export default function Reducer(states = initialStates, action: any) {
  const { payload, type } = action;

  const actions = {
    [CONST.SET_LOGIN]: () => ({
      ...states,
      ...payload,
    }),
    [CONST.SET_SIDEBAR_TOGGLE]: () => ({
      ...states,
      sidebarToggle: payload
    }),
    DEFAULT: () => states,
  };

  return (actions[type as keyof typeof actions] || actions.DEFAULT)();
};