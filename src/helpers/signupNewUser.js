import axios from 'axios'
import { API_ROOT } from '../utils/api-config'

const signupNewUser = (newUser) => {
  return new Promise((resolve, reject) => {
		axios.request({
		method: 'post',
		url: API_ROOT + '/api/userData',//url:'http://localhost:3000/api/Users' if it is not extended in any class
		data: newUser
		}).then(response => {
	       	resolve(response)
		})
		.catch((error) => {
			reject(error)
		})
	})
}

export default signupNewUser