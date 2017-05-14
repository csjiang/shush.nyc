import React, {Component} from 'react';
import {ProgressBar} from 'react-mdl';
import styles from './Feature.scss';


export default class BuildingStatsContainer extends Component {
  state = {
    address: null,
    building: null,
  }
  componentWillMount() {
    const addressInfo = localStorage.user_address;
    if (addressInfo) {
      this.setState({address: JSON.parse(addressInfo)});
      fetch('/api/building-info')
        .then(resp => resp.json())
        .then(building => this.setState({building}));
    }
  }
  render() {
    if (!this.state.address) {
      return <div>Couldn’t find your address</div>;
    }
    if (this.state.address && !this.state.building) {
      return (
        <div>
          <h4>Loading stats for {this.state.address.place.formatted_address}</h4>
          <ProgressBar indeterminate />
        </div>
      );
    }
    return (
      <div>
        {this.state.address.place.formatted_address} has had zero noise complaints this week.
      </div>
    );
  }
}
