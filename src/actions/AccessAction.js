export function setData(data) {//this is action creator
	console.log("login data is " + data.id);
	return {//this is action
		type: "ACCESS_GRANTED",
		payload: data
	}	
};

export function resetData(data) {//this is action creator
//	console.log("login data is " + data.id);
	return {//this is action
		type: "ACCESS_REVOKED",
		payload: data
	}	
};