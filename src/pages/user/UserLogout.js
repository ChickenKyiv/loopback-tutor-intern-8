import React, { Component } from 'react';
import logoutUser from '../../helpers/logoutUser';

class LogOutUser extends Component {

	logOutUser(){
		let at = sessionStorage.getItem("accessToken");

		logoutUser(at)
		.then(response => {
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