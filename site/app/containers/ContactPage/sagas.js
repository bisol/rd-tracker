/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { POST_FORM } from 'containers/App/constants';
import { formPosted, formPostingError } from 'containers/App/actions';

import request from 'utils/request';
import queryString from 'query-string';
import { makeSelectUserEmail } from 'containers/ContactPage/selectors';

/**
 * Create user contact request
 */
export function* postForm() {
  // Select userEmail from store
  const userEmail = yield select(yield makeSelectUserEmail());
  const qs = queryString.stringify({
    email: userEmail,
  });

  try {
    const requestURL = `https://fierce-plains-91052.herokuapp.com/users/new?${qs}`;
    // Call our request helper (see 'utils/request')
    yield call(request, requestURL);
    yield put(formPosted(userEmail));
  } catch (err) {
    yield put(formPostingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* contactData() {
  // Watches for POST_FORM actions and calls postForm when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(POST_FORM, postForm);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  contactData,
];
