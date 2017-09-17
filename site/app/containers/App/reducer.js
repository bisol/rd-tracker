/*
 * AppReducer
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
  POST_FORM_SUCCESS,
  POST_FORM,
  POST_FORM_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  loggedInEmail: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case POST_FORM:
      return state
        .set('loading', true)
        .set('error', false)
        .set('loggedInEmail', false);
    case POST_FORM_SUCCESS:
      return state
        .set('loggedInEmail', action.userEmail)
        .set('loading', false)
        .set('currentUser', action.userEmail);
    case POST_FORM_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
