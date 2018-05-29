import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom';
import forgotPassword from '../../helpers/forgotPassword';

class ForgotPassword extends Component {

	reset (e){
		console.log("entered email is: " + this.refs.email.value)
		forgotPassword(this.refs.email.value)
		.then(response => {
		//	console.log(response.data);
		//	console.log("response received for email is: ")
			this.props.history.push('/resetresponse');
		}).catch(err => {
			if(err.response)
				console.log(err.response.data.error.message + "Error at password reset");
			else
				console.log(err)
		});
		e.preventDefault();
	}
//onSubmit={this.reset.bind(this)} use this to call reset or send a direct call to backend

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