import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

import Form from './Form';
import LoadingIndicator from 'components/LoadingIndicator';
import messages from './messages';

function ContatcForm({ onChangeUserEmail, onSubmitForm, userEmail }) {
  if (userEmail) {
    return <H3>
      <FormattedMessage
        {...messages.loggedUserEmail} 
        values={{
            email: {userEmail} 
          }}
      />
    </H3>;
  }

  return <Form onSubmit={onSubmitForm}>
          <label htmlFor="userEmail">
            <FormattedMessage {...messages.trymeMessage} />
            <Input
              id="userEmail"
              type="text"
              placeholder="your@email"
              value={this.props.userEmail}
              onChange={onChangeUserEmail}
            />
          </label>
        </Form>
  }

ContatcForm.propTypes = {
  userEmail: PropTypes.string,
};

export default ContatcForm;
