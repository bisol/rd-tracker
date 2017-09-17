/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import {
  CHANGE_USER_EMAIL,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  userEmail: '',
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USER_EMAIL:
      return state
        .set('userEmail', action.name);
    default:
      return state;
  }
}

export default homeReducer;
