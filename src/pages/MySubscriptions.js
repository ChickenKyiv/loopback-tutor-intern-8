import React, { Component } from 'react';
import Plans from './Plans'
//import axios from 'axios';
//var config = require('../utils/config.json');

class MySubscriptions extends Component {

	constructor (props) {
		super(props);
		this.state = {
			viewplans: false
		}
	}

	viewPlans () {
		this.setState({viewplans: true})
	}

	//@todo add variable that will display your current plan at h3
	render() {
		return (
			<div>
				<h1>
					MY Subscriptions
				</h1>
				<h3>
					Your current plan is: free
				</h3>
				<button  type="button"
				className="btn btn-primary"
				onClick={this.viewPlans.bind(this)}>
				Choose a new plan
				</button>
				{this.state.viewplans && <Plans />}
			</div>
		);
	}

}

export default MySubscriptions
