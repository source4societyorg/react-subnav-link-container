import { fromJS } from 'immutable';

import {
  TOGGLE_SUBNAV,
  CLOSE_SUBNAV,
} from './constants';

const initialState = fromJS({});

const initialSubstate = fromJS({
  visible: false,
});

const subNavTitleContainerReducer = (state = initialState, action) => {
  const subnavObject = {};
  let clonedState = null;
  if (typeof action.subnavKey !== 'undefined') {
    subnavObject[action.subnavKey] = initialSubstate;
    clonedState = state.set(fromJS(subnavObject));
  }

  switch (action.type) {
    case CLOSE_SUBNAV:
      return clonedState
        .setIn([action.subnavKey, 'visible'], false);
    case TOGGLE_SUBNAV:
      return clonedState
        .setIn([action.subnavKey, 'visible'], !action.visible);
    default:
      return state;
  }
};

export default subNavTitleContainerReducer;
