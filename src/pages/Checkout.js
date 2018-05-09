import React, { Component } from 'react'
import config from '../utils/config.json'
import StripeCheckout from 'react-stripe-checkout';
//import CardForm from './CardForm'
//			<CardForm />

class Checkout extends Component {
  onToken = (token) => {
  	console.log('onToken',token, 'amount:', this.props.amount, 'interval:', this.props.interval)
    fetch(config.url + '/stripe-token', {
      method: 'POST',
      headers: {
      	Accept: 'application/json',
      	'Content-type': 'application/json'
      },
      body: JSON.stringify({stripeToken: token.id, amount: this.props.amount, interval: this.props.interval}),
    }).then(response => {
      response.json().then(data => {
      	console.log(data)
        alert(`We are in business, ${data.email}`);
      });
    });
  }

  render() {
    return (
      <StripeCheckout
        token={this.onToken}
        stripeKey="pk_test_G10A1NPi30iuA6IPjBCXsPH8"
      />
    )
  }
}


export default Checkout;