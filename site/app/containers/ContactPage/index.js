/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectLoading, makeSelectError, makeSelectLoggedInEmail } from 'containers/App/selectors';
import H2 from 'components/H2';
import UserContact from 'components/UserContact';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { postForm } from '../App/actions';
import { changeUserEmail } from './actions';
import { makeSelectUserEmail } from './selectors';

export class ContactPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { loading, error, userEmail } = this.props;
    let { loggedInEmail } = this.props;

    if (!loggedInEmail && document.rdTrackerUser) {
      loggedInEmail = document.rdTrackerUser.email
    }

    const userContactProps = {
      loading,
      error,
      loggedInEmail
    };

    let contactForm = null
    if (loggedInEmail) {
      contactForm = "";
    } else {
      contactForm = <Form onSubmit={this.props.onSubmitForm}>
                      <label htmlFor="userEmail">
                        <FormattedMessage {...messages.trymeMessage} />
                        <Input
                          id="userEmail"
                          type="text"
                          placeholder="your@email"
                          value={this.props.userEmail}
                          onChange={this.props.onChangeUserEmail}
                        />
                      </label>
                    </Form>;
    }

    return (
      <article>
        <Helmet
          title="Contact Page"
          meta={[
            { name: 'description', content: 'A React.js Boilerplate application homepage' },
          ]}
        />
        <div>
          <CenteredSection>
            <H2>
              <FormattedMessage {...messages.startProjectHeader} />
            </H2>
            <p>
              <FormattedMessage {...messages.startProjectMessage} />
            </p>
          </CenteredSection>
          <Section>
            {contactForm}            
            <UserContact {...userContactProps} />
          </Section>
        </div>
      </article>
    );
  }
}

ContactPage.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  userEmail: React.PropTypes.string,
  loggedInEmail: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ]),
  onSubmitForm: React.PropTypes.func,
  onChangeUserEmail: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUserEmail: (evt) => dispatch(changeUserEmail(evt.target.value)),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(postForm());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  userEmail: makeSelectUserEmail(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  loggedInEmail: makeSelectLoggedInEmail(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);
