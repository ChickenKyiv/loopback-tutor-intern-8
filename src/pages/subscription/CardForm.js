//Used stripe checkout instead of custom form
import React, { Component } from 'react'

class CardForm extends Component  {

	isMaxLen (next, e) {
		if (e.target.value.length === 4) {
    		document.getElementById(next).focus();
		}
		//e.preventDefault();
	}

	isName(e) {
		var keyCode = e.keyCode || e.which
		if((keyCode >=97 && keyCode <=122) || (keyCode >=65 && keyCode <=90)){
			//alert(keyCode)
		}
		else{
			//alert(keyCode)
			e.preventDefault();
		}

	}

	isNumberKey(e) {
		var keyCode = e.keyCode || e.which
		if(keyCode >=48 && keyCode <=57){
			//alert(keyCode)
		}
		else{
			//alert()
			e.preventDefault();
		}

	}



	render () {
		var date = new Date()
		var curryear = date.getFullYear();
		var years = [], months = ["01","02","03","04","05","06","07","08","09","10","11","12"]
		for(let i = 0 ; i < 12; i++){
			years[i] = curryear
			curryear++
		}
		const year = years.map((year,i) => {
			return (
				<option key={i}>
					{year}
				</option>
			)
		});

		const month = months.map((month,i) => {
			return (
				<option key={i}>
					{month}
				</option>
			)
		});
		return (
			<div>
			<h1> This is checkout form </h1>
			
			<form id="checkout-form" method="post">
			  <div className="form-group">
			    <label>Card holders name</label>
			    <input type="text" id="name" maxLength="30" size="30" autoComplete="off" onKeyPress={this.isName.bind(this)} />
			    <br/>
			    <label>Card number</label>
			    <input type="text" id="none" minLength="4" maxLength="4" size="4" required autoComplete="off" onKeyPress={this.isNumberKey.bind(this)} onKeyUp={this.isMaxLen.bind(this,"ntwo")} />
				<input type="text" id="ntwo" minLength="4" maxLength="4" size="4" autoComplete="off" required onKeyPress={this.isNumberKey.bind(this)} onKeyUp={this.isMaxLen.bind(this,"nthree")}/>
				<input type="text" id="nthree" minLength="4" maxLength="4" size="4" autoComplete="off" required onKeyPress={this.isNumberKey.bind(this)} onKeyUp={this.isMaxLen.bind(this,"nfour")}/>
				<input type="text" id="nfour" minLength="4" maxLength="4" size="4" autoComplete="off" required onKeyPress={this.isNumberKey.bind(this)} onKeyUp={this.isMaxLen.bind(this,"cvv")}/>
				<br />
				<label>Expiration date</label>
				<select required >{month}</select>
				<select required >{year}</select>
				<label>CVV</label>
				<input type="text" id="cvv" minLength="3" maxLength="3" size="3" required autoComplete="off" onKeyPress={this.isNumberKey.bind(this)} />
				<br />
				<input type="submit" />
			  </div>
			</form>
			</div>
		);
	}
}

export default CardForm;
