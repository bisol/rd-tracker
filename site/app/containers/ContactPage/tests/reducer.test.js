import { fromJS } from 'immutable';

import homeReducer from '../reducer';
import {
  changeUserEmail,
} from '../actions';

describe('homeReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      userEmail: '',
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(homeReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the changeUserEmail action correctly', () => {
    const fixture = 'mxstbr';
    const expectedResult = state.set('userEmail', fixture);

    expect(homeReducer(state, changeUserEmail(fixture))).toEqual(expectedResult);
  });
});
