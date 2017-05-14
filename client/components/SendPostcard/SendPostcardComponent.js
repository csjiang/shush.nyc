import React, { Component } from 'react';
import Page from '../Page/PageComponent';
import { Textfield, Button, ProgressBar } from 'react-mdl';
import StripeCheckout from 'react-stripe-checkout';
import styles from './SendPostcardComponent.scss';

const TakeMoney = (props) => (
  <StripeCheckout
    token={props.onToken}
    stripeKey='pk_live_mPjCURG9J4tmQZLtb36c1C6k'
    name="shush.nyc Team"
    description="Postcard to Noisy Neighbor"
    image="assets/logo.png"
    amount={100}
    currency="USD"
    shippingAddress={false}
    billingAddress
    zipCode
    allowRememberMe
  />
);

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
      valid: false,
    };
  }

  onToken = (token) => {
    console.log(token);
    fetch('/api/save-stripe-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(token),
    })
    .then(response => response.json())
    .then(data => {
      console.log('data', data);

      const { address } = JSON.parse(localStorage.user_address);

      return fetch('/api/create-postcard', {
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
          token: data.id,
          email: data.email
        })
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
      return this.setState({
        valid: true
      });
    }
  }

  render() {
    const { address } = JSON.parse(localStorage.user_address);

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
              <h5>{JSON.stringify(this.state.error).replace(/"/g, '')}</h5>
            </div>
            : null
          }
          <div>
            <h4>We understand that you may be frustrated with your noisy neighbors, but please don't use any profane language!</h4>
            <p>Here is an example of what your postcard will look like:</p>
            <span className={styles.samplefront}> </span>
            <span className={styles.sampleback}> </span>
          </div>
          <div style={{ width: '80%', margin: 'auto'}}>
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
            <Button primary raised onClick={this.handleSubmit}>Send postcard</Button>
            {
              this.state.valid
              ? <div>
              <h6>Please click the button below to complete a quick checkout flow via <a href='https://www.stripe.com' target='_blank'>Stripe</a>. Once you have paid <strong>$1.00</strong> for the postcard processing and shipping, your postcard will be sent to <strong>{`${address.street_number} ${address.route}${this.state.aptNumber ? ' ' + this.state.aptNumber : ''}, ${address.sublocality_level_1}, NY, ${address.postal_code}`}</strong>.</h6>
              <h6>You will remain completely anonymous to the postcard addressee, and your personal information will only be used for payment processing purposes.</h6>
              <TakeMoney onToken={this.onToken}/>
              </div>
              : null
            }
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
