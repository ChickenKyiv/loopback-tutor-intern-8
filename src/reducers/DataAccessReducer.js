const setData = (state = {
	id:      '',
	ttl:     '',
	created: '',
	userId:  ''
	},
	action) => {

	switch(action.type) {
		case "ACCESS_GRANTED":
			state = action.payload;
			console.log(state);
			break;
		case "ACCESS_RESET":
			state = null;
			break;
		default:
			return state;
	}
	return state;
}

export default setData;
