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

<<<<<<< HEAD:src/pages/MySubscriptions.js
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
=======
	hidePlans () {
		this.setState({viewplans: false})
	}

	render() {
		return (
			<div>
				<h1>MY Subscriptions</h1>
				<h3>Your current plan is: free</h3>
				{!this.state.viewplans && <button  type="button" className="btn btn-primary" onClick={this.viewPlans.bind(this)}>Choose a new plan</button>}
>>>>>>> 26f44bd783bc811aeb927c5d2ae68f2c9107f951:src/pages/subscription/MySubscriptions.js
				{this.state.viewplans && <Plans />}
				<br />
				{this.state.viewplans && <button  type="button" className="btn btn-primary" onClick={this.hidePlans.bind(this)}>Cancel</button>}
			</div>
		);
	}

}

export default MySubscriptions
