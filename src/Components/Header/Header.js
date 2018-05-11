import React, { Component } from 'react';
//import { Link } from 'react-router-dom';

// <Link to="/about">About</Link>

class Header extends Component {

	isNotLoggedIn () {
		return(
	     <nav className="navbar navbar-default">
		  <div className="container-fluid">
		    <div className="navbar-header">
		      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse" aria-expanded="false">
		        <span className="sr-only">Toggle navigation</span>
		        <span className="icon-bar"></span>
		        <span className="icon-bar"></span>
		        <span className="icon-bar"></span>
		      </button>
		      <a className="navbar-brand" href="/about" title="About Us"><img src="/logo.png" width="30" height="30" alt="logo.png" /></a>
		    </div>


		    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
		      <ul className="nav navbar-nav">
		        <li className="active"><a href="/">Home <span className="sr-only">(current)</span></a></li>
		        <li className="dropdown">
		          <a href="/link" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Categories <span className="caret"></span></a>
		          <ul className="dropdown-menu">
		            <li><a href="/link">Action</a></li>
		            <li><a href="/link">Another action</a></li>
		            <li><a href="/link">Something else here</a></li>
		            <li role="separator" className="divider"></li>
		            <li><a href="/link">Separated /link</a></li>
		            <li role="separator" className="divider"></li>
		            <li><a href="/link">One more separated link</a></li>
		          </ul>
		        </li>
		      </ul>
		      <form className="navbar-form navbar-left">
		        <div className="form-group">
		          <input type="text" className="form-control" placeholder="Search"/>
		        </div>
		        <button type="submit" className="btn btn-default">Submit</button>
		      </form>
		      <ul className="nav navbar-nav navbar-right">
		        <li><a href="/cart">Shopping Basket</a></li>
		        <li><a href="/login">LogIn</a></li>
		      </ul>
		    </div>
		  </div>
		</nav>
		);
	}

	isLoggedIn () {
		return(
        <nav className="navbar navbar-default">
		  <div className="container-fluid">
		    <div className="navbar-header">
		      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="linkbs-example-navbar-collapse-1" aria-expanded="false">
		        <span className="sr-only">Toggle navigation</span>
		        <span className="icon-bar"></span>
		        <span className="icon-bar"></span>
		        <span className="icon-bar"></span>
		      </button>
              <a className="navbar-brand" href="/about" title="About Us"><img src="/logo.png" width="30" height="30" alt="logo.png" /></a>
		    </div>


		    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
		      <ul className="nav navbar-nav">
		        <li className="active"><a href="/">Home <span className="sr-only">(current)</span></a></li>
		        <li className="dropdown">
		          <a href="/link" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Categories <span className="caret"></span></a>
		          <ul className="dropdown-menu">
		            <li><a href="/link">Action</a></li>
		            <li><a href="/link">Another action</a></li>
		            <li><a href="/link">Something else here</a></li>
		            <li role="separator" className="divider"></li>
		            <li><a href="/link">Separated link</a></li>
		            <li role="separator" className="divider"></li>
		            <li><a href="/link">One more separated link</a></li>
		          </ul>
		        </li>
		      </ul>
		      <form className="navbar-form navbar-left">
		        <div className="form-group">
		          <input type="text" className="form-control" placeholder="Search"/>
		        </div>
		        <button type="submit" className="btn btn-default">Submit</button>
		      </form>
		      <ul className="nav navbar-nav navbar-right">
		        <li><a href="/cart">Shopping Basket</a></li>
		        <li className="dropdown">
		          <a href="/link" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Your Account <span className="caret"></span></a>
		          <ul className="dropdown-menu">
		            <li><a href="/profile">My Profile</a></li>
		            <li><a href="/link">My Orders</a></li>
		            <li><a href="/mysub">My Subscription</a></li>
		            <li role="separator" className="divider"></li>
		            <li><a href="/logout">Log Out</a></li>
		          </ul>
		        </li>
		      </ul>
		    </div>
		  </div>
		</nav>
		);
	}

	render(){
		let check = JSON.parse( sessionStorage.getItem("isLoggedIn") );
		//@todo update to ternary operator
			if( check === true ){
				return this.isLoggedIn()
			}
			else{
				return this.isNotLoggedIn()
			}


	}
}
export default Header;
