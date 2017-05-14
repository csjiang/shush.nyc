/* eslint-disable global-require */
import React from 'react';
import { Redirect } from 'react-router';
import { Textfield } from 'react-mdl';
import styles from './Splash.scss';

export default class Splash extends React.Component {
  state = {
    hasAddress: false,
  };

  componentDidMount() {
    this.initAutocomplete();
  }

  initAutocomplete() {
    this.googleAutocomplete = new google.maps.places.Autocomplete(
      document.querySelectorAll('.autocomplete-input')[0],
      {types: ['geocode']}
    );
    const circle = new google.maps.Circle({
      center: {
        lat: 40.730610,
        lng: -73.935242,
      },
      radius: 50,
    });
    this.googleAutocomplete.setBounds(circle.getBounds());
    this.googleAutocompleteListener = this.googleAutocomplete.addListener(
      'place_changed',
      this.placeChanged
    );
  }

  placeChanged = () => {
    const place = this.googleAutocomplete.getPlace();
    const address = {
      sublocality_level_1: null,
      street_number: null,
      route: null,
      postal_code: null,
      administrative_area_level_1: null,
    };

    for (const component_name of Object.keys(address)) {
      const part = place.address_components.find(address_component =>
        address_component.types.indexOf(component_name) !== -1
      );
      address[component_name] = part.long_name;
    }

    const geo = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    }

    localStorage.setItem('user_address', JSON.stringify({geo, address, place}));
    this.setState({ hasAddress: true });
    this.props.router.push('/home');
  }

  componentWillUnmount() {
    if (this.googleAutocompleteListener) {
      google.maps.event.removeListener(this.googleAutocompleteListener);
    }
  }

  render() {
    return (
      <div className={ styles.outercontainer }>
        <div className={ styles.innercontainer }>
          <div className={ styles.videooverlay }>
            <div className={ styles.logotext } />
            <div style={{ textShadow: '2px 3px rgba(0, 0, 0, 0.5)' }}>
              <h5>shush.nyc helps New Yorkers take action on neighborhood noise pollution.</h5>
              <h5>Where is the offending noise coming from?</h5>
              <h6>If you don't know the exact address, please make your best guess.</h6>
            </div>
            <div className={styles.locationfield}>
              <Textfield
                inputClassName="autocomplete-input"
                ref={autocomplete => this.autocomplete = autocomplete}
                id='autocomplete'
                label='Enter a location'
                floatingLabel
                style={{ width: '50vw' }}
              />
            </div>
          </div>
          <video src='/splashvid.mp4' autoPlay loop muted />
        </div>
      </div>
    );
  }
}
