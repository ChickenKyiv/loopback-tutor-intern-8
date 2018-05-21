import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { API_ROOT } from '../../utils/api-config-sample'
import axios from 'axios'



class InviteForm extends Component {


	generateUrl (accessToken) {	
			return API_ROOT + `/api/userData/invite?access_token=${accessToken}`
	}

	send (e){
		e.preventDefault();
		console.log("entered email is: " + this.refs.email.value )
		let at = sessionStorage.getItem("accessToken");
		axios.request({
			method: 'post',
			url: API_ROOT + `/api/userData/invite?access_token=${at}`,//modify the reset method in userdata.js backend to send an email with
			data: {
				email: this.refs.email.value,
				user: {								//need to get the user's name here somehow
					firstName: "testfirstname",
					lastName: "testlastname"
				}
			}
		}).then(response => {
		//	console.log(response.data);
			this.props.history.push('/users');
		}).catch(err => {
			//@todo add raven. add braces
			if(err.response)
				console.log(err.response.data.error.message + "Error at sending invite");
			else
				console.log(err)
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
			//@todo add raven here. maybe we'll need to update this block. i just didn't like this way. it's not juicy
		//	console.log(sessionStorage.getItem("isLoggedIn"));
			return <Redirect to="/" />
		}
	}

}

export default InviteForm;