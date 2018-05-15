import React, { Component } from 'react';
import axios from 'axios';
import { API_ROOT } from '../../utils/api-config-sample'
//var config = require('../../utils/config.json');

class LogOutUser extends Component {

	logOutUser(){
		let at = sessionStorage.getItem("accessToken");
		
		axios.request({
			method: 'post',
			url: API_ROOT + `/api/userData/logout?access_token=${at}`
		}).then(response => {
			console.log(response.data);
			sessionStorage.removeItem("accessToken");
			sessionStorage.removeItem("userId");
			sessionStorage.removeItem("email");
			sessionStorage.setItem("isLoggedIn", JSON.stringify(false));
			console.log(sessionStorage.getItem("accessToken"));
			this.props.history.push('/');
		}).catch(err => {
			if(err.response)
				console.log(err.response.data.error.message + "Error in logging out user")
			else
				console.log(err + ", Error at log out user")
		});
	}

	render() {
		return (
			<div>
				<h1>you have been logged out</h1>
				{this.logOutUser()}
			</div>
		);
	}
}

export default LogOutUser;
