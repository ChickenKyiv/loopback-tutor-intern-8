import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import About  from '../../pages/About';
import acc    from '../../pages/user/Authacc';
import Cart   from '../../pages/Cart';
//import Checkout from '../../pages/Checkout';
import ChangePassword from '../../pages/user/ChangePassword';
import ChangePasswordResponse from '../../pages/user/ChangePasswordResponse';
import Home from '../../pages/Home';
import MySubscriptions from '../../pages/subscription/MySubscription/MySubscriptions';
import NewUser from '../../pages/user/NewUser';
import p404    from '../../pages/Page404';
import ResetPasswordForm     from '../../pages/user/ResetPasswordForm';
import ResetPasswordRequest  from '../../pages/user/ResetPasswordRequest';
import ResetPasswordResponse from '../../pages/user/ResetPasswordResponse';
import UserInfo   from '../../pages/user/UserInfo';
import UserLogin  from '../../pages/user/UserLogin';
import UserLogout from '../../pages/user/UserLogout';
import Verified   from '../../pages/user/Verified';
import Verify     from '../../pages/user/Verify';
import InviteForm from '../../pages/user/InviteForm';



class Main extends Component {
	render() {
		return (
			<div>
			<main>
			<Router>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/auth/account" component={acc} />
					<Route path="/cart" component={Cart} />
					{/*
						where is checkout form?
						<Route path="/checkout" component={Checkout} />
				 */}
				 <Route path="/mysub"   component={MySubscriptions} />
				 <Route path="/adduser" component={NewUser} />
				 <Route path="/profile" component={UserInfo} />

				 {/* I add this separation in order to make more recognizible*/}
					<Route path="/change"         component={ChangePassword} />
					<Route path="/changeresponse" component={ChangePasswordResponse} />
					<Route path="/reset-password" component={ResetPasswordForm} />
					<Route path="/forgot"         component={ResetPasswordRequest} />
					<Route path="/resetresponse"  component={ResetPasswordResponse} />

					{/* I add this separation in order to make more recognizible*/}
					<Route path="/login"    component={UserLogin} />
					<Route path="/logout"   component={UserLogout} />
					<Route path="/verified" component={Verified} />
					<Route path="/verify"   component={Verify} />
					<Route path="/invite"   component={InviteForm} />

					<Route path="/about"    component={About} />
					<Route exact path="*"   component={p404} />
				</Switch>
				</Router>
				</main>
			</div>
		);
	}
}

export default Main;

// ```
 //   <Route name="newDocument" path="/documents/new" component={ NewDocument } onEnter={ authenticate } />
 // ```

// const authenticate = (nextState, replace) => {
//   if (!Meteor.loggingIn() && !Meteor.userId()) {
//     replace({
//       pathname: '/login',
//       state: { nextPathname: nextState.location.pathname },
//     });
//   }
// };
