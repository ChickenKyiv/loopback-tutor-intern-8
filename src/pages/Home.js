import React, { Component } from 'react';
import config from '../utils/config.json'
import axios from 'axios'

class Home extends Component {

	addToCart () {
		axios.get(config.url + '/add-to-cart')
		.then(response => console.log(response.data))
		.catch(err => console.log(err))
	}

	render() {
		return (
			<div>
				<h1> This is home</h1>
				<div className="row">
					<div className="col-sm-6 col-md-4">
						<div className="thumbnail">
						<img src="img.jpg" alt="img.jpg"/>
						<div className="caption">
							<h3>Thumbnail label</h3>
							<p>Description about product</p>
							<p><button onClick={this.addToCart.bind(this)} className="btn btn-primary" >Add to cart</button></p>
							</div>
						</div>
					</div>
				</div>
			</div>

		);
	}
}

export default Home;