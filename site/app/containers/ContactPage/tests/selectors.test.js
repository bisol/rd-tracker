import { fromJS } from 'immutable';

import {
  selectContact,
  makeSelectUserEmail,
} from '../selectors';

describe('selectContact', () => {
  it('should select the home state', () => {
    const contactState = fromJS({
      userEmail: {},
    });
    const mockedState = fromJS({
      contact: contactState,
    });
    expect(selectContact(mockedState)).toEqual(contactState);
  });
});

describe('makeSelectUserEmail', () => {
  const userEmailSelector = makeSelectUserEmail();
  it('should select the username', () => {
    const userEmail = 'mxstbr';
    const mockedState = fromJS({
      contact: {
        userEmail,
      },
    });
    expect(userEmailSelector(mockedState)).toEqual(userEmail);
  });
});
