/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Textfield } from 'react-mdl';
import styles from './Splash.scss';

export default class Splash extends React.Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className={ styles.outercontainer }>
        <div className={ styles.innercontainer }>
          <div className={ styles.videooverlay }>
            <div className={ styles.logotext } />
            <div>
              <h5>shush.nyc empowers New Yorkers to take action on neighborhood noise pollution.</h5>
              <h5>To begin, please enter the location (or your best estimate) of the offending noise.</h5>
            </div>
            <Textfield
              onChange={ () => { }}
              label='Enter an address.'
              floatingLabel
              style={{ width: '50vw' }}
            />
            <Button ripple>Let's Go</Button>
          </div>
          <video src='/splashvid.mp4' autoPlay loop muted />
        </div>
      </div>
    );
  }
}
