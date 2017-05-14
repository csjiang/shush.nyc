import React, { Component } from 'react';
import Page from '../Page/PageComponent';
import { Textfield, Button, ProgressBar } from 'react-mdl';

export default class SendPostcard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: 'Dear neighbor, I am writing to inform you that the amount of noise you have been making recently interferes with my quality of life. For the good of the neighborhood and our beautiful world, would you mind turning it down? Thanks so much.',
      aptNumber: '',
      sent: false,
      error: false,
      url: '',
      expected_delivery_date: '',
      loading: false,
    };
  }


  handleChange = field => event => {
    const value = event.target.value;

    this.setState({
      [`${field}`]: value
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.message.length > 350) {
      return this.setState({ error: 'Please limit your message to no more than 350 characters in length.'});
    } else {

      const { address } = JSON.parse(localStorage.user_address);

      fetch('/api/create-postcard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: this.state.message,
            address_line1: address.street_number + ' ' + address.route,
            address_line2: this.state.aptNumber ? this.state.aptNumber : '',
            address_city: address.sublocality_level_1,
            address_zip: address.postal_code,
          })
        })
        .then(resp => resp.json())
        .then(({ url, expected_delivery_date }) => this.setState({
          sent: true,
          loading: true,
          url,
          expected_delivery_date
        }))
        .then(() => setTimeout(() => this.setState({ loading: false }), 3000))
        .catch(err => this.setState({ error: err }));
      }
    }

  render() {
    return (
      <div>
      {
        !this.state.sent
        ? <Page heading='Customize and send an anonymous postcard to your noisy neighbor.'>
          {
            this.state.error
            ? <div style={{
              width: '70%',
              margin: 'auto',
            }}>
              <h4>Oh no, an error occurred!</h4>
              <h5>{JSON.stringify(this.state.error).replace('"', '')}</h5>
            </div>
            : null
          }
          <div style={{ width: '70%', margin: 'auto' }}>
            <Textfield
              onChange={this.handleChange('message')}
              label='Write a custom message, or go with our handy-dandy one!'
              value={this.state.message}
              floatingLabel
              rows={5}
              style={{width: '80%'}}
            />
            <div><small>Characters: {this.state.message.length} / 350</small></div>
            <Textfield
              onChange={this.handleChange('aptNumber')}
              label='Enter the apartment or unit number, if you know it...'
              value={this.state.aptNumber}
              floatingLabel
              style={{width: '60%', display: 'block'}}
            />
            <Button primary raised onClick={this.handleSubmit}>Send!</Button>
          </div>
        </Page>
        :
        this.state.loading
        ? <ProgressBar indeterminate />
        : <Page heading='Your postcard was successfully sent!'>
          <div>
          <h3>View your postcard <a target='_blank' href={this.state.url}>here.</a></h3>
          <h3>Your expected delivery date is {this.state.expected_delivery_date}. Thanks for using shush.nyc! If you like our service, please tell your friends.</h3>
          </div>
        </Page>
      }
    </div>
    );
  }
}
