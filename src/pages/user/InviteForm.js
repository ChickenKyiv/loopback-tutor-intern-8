import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import fetchUserData from '../../helpers/fetchUserData'
import inviteUser from '../../helpers/inviteUser'

class InviteForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			userdata: {}
		}
	}

	send (e){
		e.preventDefault();
		console.log("entered email is: " + this.refs.email.value )
		let at = sessionStorage.getItem("accessToken");
		let userId = sessionStorage.getItem("userId");
		fetchUserData(userId, at)
		.then(response => {
			// console.log(response)
			this.setState({userdata: response})
			inviteUser(this.refs.email.value, this.state.userdata, at)
			.then(res => {
		// 		console.log(res);
				this.props.history.push('/profile');
			}).catch(err => {
				if(err.response)
					console.log(err.response.data.error.message + "Error at sending invite");
				else
					console.log(err)
			})
		})
		.catch(error => {
			console.log(error + "Error in getting user data")
		});
	}

	render() {
		let check = JSON.parse(sessionStorage.getItem("isLoggedIn"));
		if( check === true ){
			return (
				<div>
					<h4> Please enter your friend's email</h4>

					<form onSubmit={this.send.bind(this)} >
						<input type="email" name="email" ref="email" id="email" />
						<input type="submit" value="Send email" />
					</form>
				</div>
			);
		} else {
			console.log("you need to login first");
		//	console.log(sessionStorage.getItem("isLoggedIn"));
			return <Redirect to="/" />
		}
	}
}

export default InviteForm;
