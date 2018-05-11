import React, { Component } from 'react'
//import config from '../utils/config.json'
import StripeCheckout from 'react-stripe-checkout';
//import CardForm from './CardForm'
//			<CardForm />

class Checkout extends Component {
  onToken = (token) => {
  	//console.log('onToken',token, 'amount:', this.props.amount, 'plan:', this.props.plan)
    //@todo this is not clear. at one place we're using axios, at this place we're using fetch.
    // did you know that this is a similar functions?
    fetch(/*config.url + */'/stripe-token', {
      method: 'POST',
      headers: {
      	Accept: 'application/json',
      	'Content-type': 'application/json'
      },
      body: JSON.stringify({
        stripeToken: token.id,
        plan: this.props.plan,
        email: token.card.email
      }),
    }).then(response => {
      response.json().then(data => {
      //	console.log(data)
        alert(`We are in business, ${data.email}`);
      });
    });
  }

  render() {
    //@todo use key from .env file
    // REACT_APP_TEST_PUBLISHABLE_KEY
    // REACT_APP_TEST_SECRET_KEY
    return (
      <StripeCheckout
        token={this.onToken}
        panelLabel={this.props.amount}
        stripeKey="pk_test_G10A1NPi30iuA6IPjBCXsPH8"
      />
    )
  }
}


export default Checkout;
