import { cancel, take, takeLatest } from 'redux-saga/effects';
import { createMockTask } from 'redux-saga/lib/utils';

import { LOCATION_CHANGE } from 'react-router-redux';

import { POST_FORM } from 'containers/App/constants';

import { postForm, contactData } from '../sagas';

/* eslint-disable redux-saga/yield-effects */
describe('contactDataSaga Saga', () => {
  const contactDataSaga = contactData();
  const mockedTask = createMockTask();

  it('should start task to watch for POST_FORM action', () => {
    const takeLatestDescriptor = contactDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(POST_FORM, postForm));
  });

  it('should yield until LOCATION_CHANGE action', () => {
    const takeDescriptor = contactDataSaga.next(mockedTask).value;
    expect(takeDescriptor).toEqual(take(LOCATION_CHANGE));
  });

  it('should cancel the forked task when LOCATION_CHANGE happens', () => {
    const cancelDescriptor = contactDataSaga.next().value;
    expect(cancelDescriptor).toEqual(cancel(mockedTask));
  });
});
