import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import About from '../../pages/About';
import acc from '../../pages/Authacc';
import Cart from '../../pages/Cart';
//import Checkout from '../../pages/Checkout';
import ChangePassword from '../../pages/ChangePassword';
import ChangePasswordResponse from '../../pages/ChangePasswordResponse';
import Home from '../../pages/Home';
import MySubscriptions from '../../pages/MySubscriptions';
import NewUser from '../../pages/NewUser';
import p404 from '../../pages/Page404';
import ResetPasswordForm from '../../pages/ResetPasswordForm';
import ResetPasswordRequest from '../../pages/ResetPasswordRequest';
import ResetPasswordResponse from '../../pages/ResetPasswordResponse';
import UserInfo from '../../pages/UserInfo';
import UserLogin from '../../pages/UserLogin';
import UserLogout from '../../pages/UserLogout';
import Verified from '../../pages/Verified';
import Verify from '../../pages/Verify';
import InviteForm from '../../pages/InviteForm';



class Main extends Component {
	render() {
		return (
			<div>
			<main>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/auth/account" component={acc} />
					<Route path="/about" component={About} />
					<Route path="/cart" component={Cart} />			
					<Route path="/change" component={ChangePassword} />
					<Route path="/changeresponse" component={ChangePasswordResponse} />
					<Route path="/mysub" component={MySubscriptions} />
					<Route path="/adduser" component={NewUser} />
					<Route path="/reset-password" component={ResetPasswordForm} />
					<Route path="/forgot" component={ResetPasswordRequest} />
					<Route path="/resetresponse" component={ResetPasswordResponse} />
					<Route path="/profile" component={UserInfo} />
					<Route path="/login" component={UserLogin} />
					<Route path="/logout" component={UserLogout} />
					<Route path="/verified" component={Verified} />
					<Route path="/verify" component={Verify} />
					<Route path="/invite" component={InviteForm} />
					<Route exact path="*" component={p404} />
				</Switch>
				</main>
			</div>
		);
	}
}

export default Main;