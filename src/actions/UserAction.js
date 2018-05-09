export function setUser(data) {//this is action creator
	console.log("this guy is" + JSON.stringify(data));
	return {//this is action
		type: "USER_LOGGED_IN",
		payload: data
	}	
};

export function resetUser(data) {//this is action creator
	console.log("this guy is" + JSON.stringify(data));
	return {//this is action
		type: "USER_LOGGED_OUT",
		payload: data
	}	
};