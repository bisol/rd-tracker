/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */
import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import A from 'components/A';
import H1 from 'components/H1';
import messages from './messages';

export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  // Since state and props are static,
  // there's no need to re-render this component
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div>
        <Helmet
          title="Home Page"
          meta={[
            { name: 'description', content: 'Test home page' },
          ]}
        />
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <p>
          <FormattedMessage
            {...messages.body}
            values={{
              link: <A href="https://github.com/react-boilerplate/react-boilerplate">react-boilerplate</A>
            }}
          />
        </p>
      </div>
    );
  }
}
