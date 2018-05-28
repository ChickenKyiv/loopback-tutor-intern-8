import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { API_ROOT } from '../../../utils/api-config'

//import CardForm from './CardForm'
//			<CardForm />

class Checkout extends Component {
  onToken = (token) => {
  	//console.log('onToken',token, 'amount:', this.props.amount, 'plan:', this.props.plan)
    //feels like axios doesnt work and gives some error
    fetch(API_ROOT + '/stripe-token', {
      method: 'POST',
      headers: {
      	Accept: 'application/json',
      	'Content-type': 'application/json'
      },
      body: JSON.stringify({
        stripeToken: token.id,
        plan: this.props.plan,
        email: token.email  //check if stripe makes any changes in object structure
      }),
    }).then(response => {
      response.json().then(data => {
      //	console.log(data)
        alert(`We are in business, ${data.email}`);
      });
    });
  }

  render() {
    //@todo use key from .env file tried this
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
