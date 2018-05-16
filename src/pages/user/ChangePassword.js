import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { API_ROOT } from '../../utils/api-config-sample'

import axios from 'axios';

// var config = require('../../utils/config.json');

class ChangePassword extends Component {

	validate(e) {
		if(this.refs.password.value === this.refs.cpassword.value){
			this.reset(e);
		}
		else
			alert("Passwords do not match");
	}

	getStatus () {
		return API_ROOT + `/userstatus`
		/api/userData/reset-password?access_token=${accessToken}
	}
	
	generateUrl (accessToken) {
		// @todo i still don't like this long line, but not sure if it can be improved well right now
			return API_ROOT + `/api/userData/invite?access_token=${accessToken}`
	}

	reset (e){
		//@todo move all api urls into one file too., because it's too messy right now
		e.preventDefault();
		//@todo can we move AT variable? will this improve structure?
		let accessToken = sessionStorage.getItem("accessToken");
		console.log( "entered pass is: " + this.refs.password.value +
		", entered cpass is: " + this.refs.cpassword.value )
		axios.request({
			method: 'post',
			url: API_ROOT + `/api/userData/reset-password?access_token=${accessToken}`,//modify the reset method in
			data: {newPassword: this.refs.password.value }//         userdata.js backend call a different method to handle this
		}).then(response => {
			console.log(response.data);
			// @todo replace that link with variable.
			this.props.history.push('/changeresponse');
		}).catch(err => {
			//@todo add sentry
			if(err.response)
				console.log(err.response.data.error.message + "Error at change password");
			else
				console.log(err)
		});

	}
//onSubmit={this.reset.bind(this)} use this to call reset or send a direct call to backend
//method="post" action="http://localhost:3000/reset-password"
	render() {

		//@todo can we move this outside? i don't like this structure with if -> return - else - message
		let check = JSON.parse(sessionStorage.getItem("isLoggedIn"));
		if(check === true){
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
		else{
			console.log("you need to login first");
		//	console.log(sessionStorage.getItem("isLoggedIn"));
			return <Redirect to="/" />
		}


	}

}

export default ChangePassword;
