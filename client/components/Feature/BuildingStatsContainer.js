import React, {Component} from 'react';
import {ProgressBar} from 'react-mdl';
import styles from './Feature.scss';


export default class BuildingStatsContainer extends Component {
  state = {
    address: null,
    building: null,
    buildingSmall: null,
  }
  componentWillMount() {
    const addressInfo = localStorage.user_address;
    if (addressInfo) {
      const address = JSON.parse(addressInfo);
      this.setState({address});
      const {lat, lng} = address.geo;
      fetch(`/api/building-info?lat=${lat}&lng=${lng}`)
        .then(resp => resp.json())
        .then(building => this.setState({building}));
        fetch(`/api/building-info?lat=${lat}&lng=${lng}&range=30`)
          .then(resp => resp.json())
          .then(buildingSmall => this.setState({buildingSmall}));
    }
  }
  render() {
    if (!this.state.address) {
      return <div>Couldn’t find your address</div>;
    }
    if (this.state.address && !this.state.building && !this.state.buildingSmall) {
      return (
        <div>
          <h4>Loading stats for {this.state.address.place.formatted_address}</h4>
          <ProgressBar indeterminate />
        </div>
      );
    }
    return (
      <div>
        {this.state.building && <h4>The area around {this.state.address.place.formatted_address} has had {this.state.building.docs} noise complaints.</h4>}
        {this.state.buildingSmall && <h4>The building has had {this.state.buildingSmall.docs} noise complaints.</h4>}
      </div>
    );
  }
}
