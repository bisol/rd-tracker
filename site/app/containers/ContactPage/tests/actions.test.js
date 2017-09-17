import {
  CHANGE_USER_EMAIL,
} from '../constants';

import {
  changeUserEmail,
} from '../actions';

describe('Home Actions', () => {
  describe('changeUserEmail', () => {
    it('should return the correct type and the passed name', () => {
      const fixture = 'Max';
      const expectedResult = {
        type: CHANGE_USER_EMAIL,
        name: fixture,
      };

      expect(changeUserEmail(fixture)).toEqual(expectedResult);
    });
  });
});
