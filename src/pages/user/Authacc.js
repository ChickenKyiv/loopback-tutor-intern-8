import React, { Component } from 'react'
import { API_ROOT } from '../../utils/api-config-sample'
import axios from 'axios'


class Authacc extends Component {

	constructor(props) {
		super(props);
		this.state = {
			userdata: {}
		}
	}

	getStatus () {
		return API_ROOT + `/userstatus`
	}

	getStatus2 () {

		axios.get(API_ROOT + `/userstatus`)
		.then(response => response.data);
		//@todo add catch with raven
	}

	componentDidMount(){
		axios.get(API_ROOT + '/userstatus')
 		.then(response => {
				console.log("response-->", JSON.stringify(response))
				// this.setState({userdata: response.data})
				console.log("state"+ this.state.userdata)
		}).catch(err => console.log(err))
		//@todo add raven to catch
	}


	renderNormal() {
		return (
			<div>
			<h1>
				Google login
			</h1>
				Name: {this.state.userdata.provider}
				{this.getStatus()}
			<br />
			<br />
			<br />
		</div>
		);
	}


	render() {

		return this.renderNormal();

	}
//			Name: {this.state.userdata}
}
export default Authacc;
