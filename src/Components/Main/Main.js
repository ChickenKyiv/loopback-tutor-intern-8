import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import About from '../../pages/About';
import acc from '../../pages/user/Authacc';
import Cart from '../../pages/Cart';
//import Checkout from '../../pages/Checkout';
import ChangePassword from '../../pages/user/ChangePassword';
import ChangePasswordResponse from '../../pages/user/ChangePasswordResponse';
import Home from '../../pages/Home';
import MySubscriptions from '../../pages/subscription/MySubscriptions';
import NewUser from '../../pages/user/NewUser';
import p404 from '../../pages/Page404';
import ResetPasswordForm from '../../pages/user/ResetPasswordForm';
import ResetPasswordRequest from '../../pages/user/ResetPasswordRequest';
import ResetPasswordResponse from '../../pages/user/ResetPasswordResponse';
import UserInfo from '../../pages/user/UserInfo';
import UserLogin from '../../pages/user/UserLogin';
import UserLogout from '../../pages/user/UserLogout';
import Verified from '../../pages/user/Verified';
import Verify from '../../pages/user/Verify';
import InviteForm from '../../pages/user/InviteForm';



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