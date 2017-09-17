import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

import H3 from 'components/H3';
import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import messages from './messages';

function UserContact({ loading, error, loggedinEmail }) {
  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error !== false) {
    const ErrorComponent = () => (
      <ListItem item={'Something went wrong, please try again!'} />
    );
    return <List component={ErrorComponent} />;
  }

  if (loggedinEmail) {
    return <H3>
      <FormattedMessage
        {...messages.loggedUserEmail} 
        values={{
            email: loggedinEmail
          }}
      />
    </H3>;
  }

  return null;
}

UserContact.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  loggedinEmail: PropTypes.string,
};

export default UserContact;