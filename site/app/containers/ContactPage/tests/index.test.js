import React from 'react';
import { shallow, mount } from 'enzyme';
import { IntlProvider } from 'react-intl';

import { ContactPage, mapDispatchToProps } from '../index';
import { changeUserEmail } from '../actions';
import { postForm } from '../../App/actions';

describe('<ContactPage />', () => {
  describe('mapDispatchToProps', () => {
    describe('onChangeUserEmail', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onChangeUserEmail).toBeDefined();
      });

      it('should dispatch changeUserEmail when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const userEmail = 'mxstbr';
        result.onChangeUserEmail({ target: { value: userEmail } });
        expect(dispatch).toHaveBeenCalledWith(changeUserEmail(userEmail));
      });
    });
  });

  describe('onSubmitForm', () => {
    it('should be injected', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      expect(result.onSubmitForm).toBeDefined();
    });

    it('should dispatch postForm when called', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      result.onSubmitForm();
      expect(dispatch).toHaveBeenCalledWith(postForm());
    });

    it('should preventDefault if called with event', () => {
      const preventDefault = jest.fn();
      const result = mapDispatchToProps(() => {});
      const evt = { preventDefault };
      result.onSubmitForm(evt);
      expect(preventDefault).toHaveBeenCalledWith();
    });
  });
});
