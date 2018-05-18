import React, { Component } from 'react'
import PublicNavbar from '../NavbarNew/PublicNavbar/PublicNavbar'
import AuthenticatedNavbar from '../NavbarNew/AuthenticatedNavbar/AuthenticatedNavbar'
//import { Link } from 'react-router-dom';

// <Link to="/about">About</Link>

class Header extends Component {

	render(){
		let check = JSON.parse( sessionStorage.getItem("isLoggedIn") );
		//@todo update to ternary operator UPDATED
		return (
			check ? <AuthenticatedNavbar /> : <PublicNavbar />
		);

	}
}
export default Header;
