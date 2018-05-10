import React, { Component } from 'react'
import Checkout from './Checkout'

class Plans extends Component {

	constructor(props) {
		super(props)
		this.state = {	//set the state as default plan you gave in radio button
			plan: 'plan_CpWxWWGBjNUSmR',
			amount: 'Pay $4 to Groceristar'
		}
	}

	setValue(e) {
		if(e.target.value === "4"){//monthly
			this.setState({
				plan: 'plan_CpWxWWGBjNUSmR',
				amount: 'Pay $4 to Groceristar'
			})
		}
		else if(e.target.value === "25"){//yearly
			this.setState({
				plan: 'plan_CpWy97TShxsfFK',
				amount: 'Pay $25 to Groceristar'
			})
		}
			
		else
			console.log(e.target.value)

	}

	getValue (){
		return this.state.plan
	}

	render () {
		return (
			<div>
				<div className="radio">
				  <label>
				    <input type="radio" name="optionsRadios" id="optionsRadios1" value="4" onChange={this.setValue.bind(this)} defaultChecked />
				    $4/month
				  </label>
				</div>
				<div className="radio">
				  <label>
				    <input type="radio" name="optionsRadios" id="optionsRadios2" onChange={this.setValue.bind(this)} value="25" />
				    $25/year
				  </label>
				</div>
				<Checkout plan={this.state.plan} amount={this.state.amount} />
			</div>

		);
	}
}

export default Plans