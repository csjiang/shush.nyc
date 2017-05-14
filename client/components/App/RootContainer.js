import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Relay from 'react-relay';
import Footer from '../Footer/FooterContainer';

class Root extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    viewer: PropTypes.object.isRequired
  };

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default Relay.createContainer(Root, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        ${Footer.getFragment('viewer')}
      }`
  }
});
