import PublicNavigation from './PublicNavbar.js';
import AuthenticatedNavigation from './AuthenticatedNavbar.js';

let check = JSON.parse(sessionStorage.getItem("isLoggedIn"));
const renderNavigation = hasUser => (hasUser ? <AuthenticatedNavigation /> : <PublicNavigation />);


import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// <Link to="/about">About</Link>


const Navbar = ({ hasUser }) => (
  <div className="nav">
    {/*<ul>
      <li>
      <a href="/profile">My Profile</a>
      </li>
      <li>
      <a href="/logout">logout</a>
      </li>
    </ul>
    */}
    { renderNavigation(hasUser) }
  </div>
);

Navbar.propTypes = {
  hasUser: PropTypes.object,
}

class Navbar extends Component {

	render() {
		let check = JSON.parse(sessionStorage.getItem("isLoggedIn"));
			if(check === true){
				return (
					<div className="nav">
					<ul>
						<li>
						<a href="/profile">My Profile</a>
						</li>
						<li>
						<a href="/logout">logout</a>
						</li>
					</ul>
					</div>
				);
			}
			else{
				return (
					<div>
					</div>
				);
			}

	}
}

export default Navbar;
