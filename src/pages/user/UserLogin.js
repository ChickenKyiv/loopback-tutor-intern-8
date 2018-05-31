import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import loginUser from '../../helpers/loginUser';

class LogInUser extends Component {

	onSubmit(e) {
		const user = {
			username: this.refs.username.value,
		//	email: this.refs.email.value,
			password: this.refs.password.value
		}

		this.submitUser(user);
		e.preventDefault();
	}

	submitUser(user){
		loginUser(user)
		.then(response => {
			sessionStorage.setItem("accessToken",response.data.id);
			sessionStorage.setItem("userId",response.data.userId);
			sessionStorage.setItem("isLoggedIn",JSON.stringify(true));
			//console.log("Token:"+sessionStorage.getItem("accessToken"));
			this.props.history.push('/profile');//push the page you want to display
		}).catch(err => {
			if(err.response.data.error.message){
				alert(err.response.data.error.message + " Please check the username and password")
				console.log(err.response.data.error.message)
			}
			else if(err.response)
				console.log(err.response)
			else
				console.log(err + "Error at login verification")
		});
	}

	// @todo don't know why thie url doesnt work
	renderNormal() {
		//document.getElementById('google').href = API_ROOT + "/auth/google";
		return (
			<div>
				<h1>LogIn</h1>
				<div>
					<form className="entryForm" method="post"
					onSubmit={this.onSubmit.bind(this)}>
						<br />
						<label>Username</ label>
						<input type="text" name="username" ref="username" required />
						<br />
						<label>Password</ label>
						<input type="password" name="password" ref="password" required />
						<br />
						<input type="submit" value="Login" />
						<a href="/adduser" >New User?</a>
						<br />
						<a href="/forgot" >Forgot password? </a>
					</form>
					<br />
					<br />
					<a href="https://loopback-react-account.herokuapp.com/auth/google" id="google">
						Signin with google
					</a>
					<br />
					<a href="https://loopback-react-account.herokuapp.com/auth/twitter" id="twitter">
						Signin with twitter
					</a>
				</div>
			</div>
		);
	}

	render() {
		let check = false;
		if( check === false ){
			return this.renderNormal();
		}
		else{
			console.log(sessionStorage.getItem("isLoggedIn"));
			return <Redirect to="/users" />
		}
	}
}

export default LogInUser;