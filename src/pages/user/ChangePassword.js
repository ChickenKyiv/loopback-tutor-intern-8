import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import changePassword from '../../helpers/changePassword'

class ChangePassword extends Component {

	validate(e) {
		if(this.refs.password.value === this.refs.cpassword.value){
			this.reset(e);
		}
		else
			alert("Passwords do not match");
	}

	renderNormal() {
		return (
			<div>
				<form onSubmit={this.validate.bind(this)} >
					<label>New Password</label>
					<input type="password" name="password" ref="password" id="password" />
					<br />
					<label>Confirm New Password</label>
					<input type="cpassword" name="cpassword" ref="cpassword" id="cpassword" />
					<br />
					<input type="submit" value="Reset Password" />
				</form>
			</div>
		);
	}

	reset (e){
		e.preventDefault();
		let accessToken = sessionStorage.getItem("accessToken");
		console.log( "entered pass is: " + this.refs.password.value +
		", entered cpass is: " + this.refs.cpassword.value )

		changePassword(this.refs.password.value, accessToken)
		.then(response => {
			console.log(response.data);
			this.props.history.push('/changeresponse');
		}).catch(err => {
			if(err.response)
				console.log(err.response.data.error.message + "Error at change password");
			else
				console.log(err)
		});
	}

	render() {
		let check = JSON.parse(sessionStorage.getItem("isLoggedIn"));
		if(check === true){
			return this.renderNormal();
		}
		else{
			console.log("you need to login first");
		//	console.log(sessionStorage.getItem("isLoggedIn"));
			return <Redirect to="/" />
		}
	}
}

export default ChangePassword;
