import React, { Component } from 'react';
import axios from 'axios';
import  { Redirect } from 'react-router-dom';
import { API_ROOT } from '../../utils/api-config-sample'


class ForgotPassword extends Component {

	reset (e){
		console.log("entered email is: " + this.refs.email.value)
		axios.request({
			method: 'post',
			//modify the reset method in userdata.js backend to send an email with
			url: API_ROOT + '/api/userData/reset',
			//reset link or call a different method to handle this
			data: { email: this.refs.email.value }
		}).then(response => {
		//	console.log(response.data);
		//	console.log("response received for email is: ")
			this.props.history.push('/resetresponse');
		}).catch(err => {
			//add raven and add braces
			if(err.response)
				console.log(err.response.data.error.message + "Error at password reset");
			else
				console.log(err)
		});
		e.preventDefault();
	}
//onSubmit={this.reset.bind(this)} use this to call reset or send a direct call to backend
//method="post" action="http://localhost:3000/request-password-reset"
//@todo i still don't like this way to understand if user logged in
	render() {
		let check = JSON.parse(sessionStorage.getItem("isLoggedIn"));
		if(check !== true){
			return (
				<div>
					<h4> Please enter your registered email</h4>
					<form onSubmit={this.reset.bind(this)} >
						<input type="email" name="email" ref="email" id="email"required />
						<input type="submit" value="Reset Password" />
					</form>
				</div>
			);
		}
		else {
			console.log("you cant be logged in to use this functionality");
		//	console.log(sessionStorage.getItem("isLoggedIn"));
			return <Redirect to="/" />
		}
	}

}

export default ForgotPassword;