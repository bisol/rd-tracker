import {
  POST_FORM,
  POST_FORM_SUCCESS,
  POST_FORM_ERROR,
} from '../constants';

import {
  postForm,
  formPosted,
  formPostingError,
} from '../actions';

describe('App Actions', () => {
  describe('postForm', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: POST_FORM,
      };

      expect(postForm()).toEqual(expectedResult);
    });
  });

  describe('formPosted', () => {
    it('should return the correct type and the passed repos', () => {
      const userEmail = 'test@test.com';
      const expectedResult = {
        type: POST_FORM_SUCCESS,
        userEmail,
      };

      expect(formPosted(userEmail)).toEqual(expectedResult);
    });
  });

  describe('formPostingError', () => {
    it('should return the correct type and the error', () => {
      const fixture = {
        msg: 'Something went wrong!',
      };
      const expectedResult = {
        type: POST_FORM_ERROR,
        error: fixture,
      };

      expect(formPostingError(fixture)).toEqual(expectedResult);
    });
  });
});
