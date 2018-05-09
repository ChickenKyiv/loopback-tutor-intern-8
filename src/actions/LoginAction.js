export const setLogIn = (data) => {//this is action creator
	console.log("the login value is " + data);
	return {//this is action
		type: "USER_CAN_LOGIN",
		payload: data
	}	
};