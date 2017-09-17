/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectContact = (state) => state.get('contact');

const makeSelectUserEmail = () => createSelector(
  selectContact,
  (contactState) => contactState.get('userEmail')
);

export {
  selectContact,
  makeSelectUserEmail,
};
