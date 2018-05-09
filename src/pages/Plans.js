import React, { Component } from 'react'
import Checkout from './Checkout'

class Plans extends Component {

	constructor(props) {
		super(props)
		this.state = {
			interval: 'month',
			amount: '4'
		}
	}

	setValue(e) {
		if(e.target.value === "4"){
			this.setState({
				interval: 'month',
				amount: 4
			})
		}
		else if(e.target.value === "25"){
			this.setState({
				interval: 'year',
				amount: 25
			})
		}
			
		else
			console.log(e.target.value)

	}

	getValue (){
		return this.state.interval+" "+this.state.amount
	}

	render () {
		return (
			<div>
				<div className="radio">
				  <label>
				    <input type="radio" name="optionsRadios" id="optionsRadios1" value="4" onChange={this.setValue.bind(this)} defaultChecked />
				    $4
				  </label>
				</div>
				<div className="radio">
				  <label>
				    <input type="radio" name="optionsRadios" id="optionsRadios2" onChange={this.setValue.bind(this)} value="25" />
				    $25
				  </label>
				</div>
				<Checkout amount={this.state.amount} interval={this.state.interval} />
			</div>

		);
	}
}

export default Plans