import React, { Component } from 'react';
import { Grid, Cell, Textfield, Button } from 'react-mdl';
import Page from '../Page/PageComponent';
import RemoteForm from '../RemoteForm/RemoteFormComponent';
import { DateField } from 'react-date-picker'
import 'react-date-picker/index.css'
import styles from './FileComplaint.scss';


export default class FileComplaint extends Component {
  state = {
    formDone: false,
    submitDone: false,
    locationDetails: '',
    email: '',
    complaintDetails: '',
    time: '05/03/2017 08:54:44 PM',
  };

  completeForm = () => {
    this.setState({submitDone: true});
  }

  changeLocationDetails = (e) => {
    this.setState({locationDetails: e.target.value});
  }

  changeEmail = (e) => {
    this.setState({email: e.target.value});
  }

  changeComplaintDetails = (e) => {
    this.setState({complaintDetails: e.target.value});
  }

  changeTime = (dateString, e) => {
    console.log(dateString, e);
    this.setState({time: dateString});
  }

  submitComplaint = () => {
    this.setState({formDone: true});
  }

  getFormData() {
    const {address} = JSON.parse(localStorage.user_address);
    return {
      complaint_details: this.state.complaintDetails,
      time_occurrence: this.state.time,
      location_details: this.state.locationDetails,
      address_number: address.street_number,
      street_name: address.route,
      borough: address.sublocality_level_1,
      email: this.state.email,
    };
  }

  completeForm = () => {
    console.log('FORM COMPLETE');
    this.props.router.replace('/file-complaint');
  }

  renderInner() {
    if (this.state.formDone) {
      return (
        <div>
          <RemoteForm
            onComplete={this.completeForm}
            data={this.getFormData()}
          />
        </div>
      );
    }
    const formData = this.getFormData();

    return (
      <div>

        <div>Filing complaint for {formData.address_number} {formData.street_name} in {formData.borough}</div>
        <div> <br /> </div>
        <div>Email</div>
        <Textfield
          onChange={this.changeEmail}
          label="Email"
          required={true}
        />

        <div>Location Details</div>
        <Textfield
          className={styles.multiline}
          label=''
          onChange={this.changeLocationDetails}
          rows={3}
        />

        <div>Complaint time</div>
        <DateField
          forceValidDate
          defaultValue={"05/03/2017 08:54:44 PM"}
          dateFormat="MM/DD/YYYY hh:mm:ss A"
          onChange={this.changeTime}
        />

        <div>
          <div>Complaint Details</div>
          <Textfield
            className={styles.multiline}
            label=''
            onChange={this.changeComplaintDetails}
            rows={3}
          />
        </div>

        <Button onClick={this.submitComplaint}>
          Submit
        </Button>
      </div>
    );
  }

  render() {
    return (
      <Page heading='File an official noise complaint'>
        <div style={{ width: '70%', margin: 'auto' }}>
          {this.renderInner()}
        </div>
      </Page>
    );
  }
}
