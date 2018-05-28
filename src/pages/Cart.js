import React, { Component } from 'react';
//import loadCart from '../helpers/loadCart'
import { API_ROOT } from '../utils/api-config'
import axios  from 'axios'
import { logException } from '../ravenconfig'

class Cart extends Component {

	constructor (props) {
		super(props)
		this.state = {
			quantity: 0
		}

	}
	getItems2() {
		axios.get(API_ROOT + '/cart')
		.then(response => console.log(response.data))
		.catch(err => logException(err))
	}

	getItems() {
		axios.get(API_ROOT + '/cart')
		.then(response => console.log(response.data))
		.catch(err => console.log(err))
	}

	render() {
		return (
		<div>
			<h1>This is your cart</h1>
			<h2>quantity added: {this.state.quantity}</h2>
			{this.getItems()}
		</div>
		)
	}
}

export default Cart;
