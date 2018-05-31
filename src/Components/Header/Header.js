import React, { Component } from 'react'
import PublicNavbar         from '../NavBar/PublicNavBar/PublicNavBar'
import AuthenticatedNavbar  from '../NavBar/AuthenticatedNavBar/AuthenticatedNavBar'
//import { Link } from 'react-router-dom';

// <Link to="/about">About</Link>

// const renderNavigation = hasUser => ( hasUser ? <AuthenticatedNavbar /> : <PublicNavbar /> )
//
// const Header = ({ hasUser }) => (
// 	<Navbar>
// 		{ renderNavigation(hasUser) }
// 	</navbar>
// );
// let check = JSON.parse( sessionStorage.getItem("isLoggedIn") );

class Header extends Component {

	render(){
		let check = JSON.parse( sessionStorage.getItem("isLoggedIn") );
		
		return (
			check ? <AuthenticatedNavbar /> : <PublicNavbar />
		);

	}
}
export default Header;