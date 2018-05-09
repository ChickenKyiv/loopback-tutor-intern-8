export default function(state = null, action) {

	switch(action.type) {
		case "USER_CAN_LOGIN":
			state = !action.payload;
			return state;
		default:
			return state;
	}

}

// storing data of logged in user