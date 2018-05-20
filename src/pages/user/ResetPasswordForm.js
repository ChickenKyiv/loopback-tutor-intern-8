import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { API_ROOT } from '../../utils/api-config-sample'


class ChangePassword extends Component {

	validate(e) {
		if(this.refs.password.value === this.refs.cpassword.value){
			this.reset(e);
		}
		else
			alert("Passwords do not match");
	}

	reset (e){
		e.preventDefault();
		console.log( "entered pass is: " + this.refs.password.value +
		", entered cpass is: " + this.refs.cpassword.value )
		axios.request({
			method: 'post',
			// @todo i don't like this long url
			url: API_ROOT + `/api/userData/reset-password${window.location.search}`,//?access_token=${this.props.params.access_token}`,
			data: {newPassword: this.refs.password.value }//         userdata.js backend call a different method to handle this
		}).then(response => {
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
		if(check !== true){
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
