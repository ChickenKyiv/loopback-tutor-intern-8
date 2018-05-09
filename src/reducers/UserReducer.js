const setUser = (state = {
	firstName: '',
	lastName: '',
	email: '',
	username: '',
	id: ''
}, action) => {

	switch(action.type) {
		case "USER_LOGGED_IN":
			state = action.payload;
			console.log("this executed "+state.firstName);
			break;
		case "USER_LOGGED_OUT":
			state = null;
			break;
		default:
			return state;
	}
	return state;
}


export default setUser;
// storing data of logged in user

/*
export default function(state = null, action) {

	switch(action.type) {
		case "USER_LOGGED_IN":
			state = action.payload;
		//	console.log(state);
			break;
		default:
			return state;

	}
	return state;
}
*/
// storing data of logged in user