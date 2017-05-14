import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Footer from '../Footer/FooterContainer';

export default class Root extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
