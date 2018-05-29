import axios from 'axios'
import { API_ROOT } from '../utils/api-config'

const loginUser = (user) => {
  return new Promise((resolve, reject) => {
		axios.request({
			method: 'post',
			url: API_ROOT + '/api/userData/login',
			data: user
			}).then(response => {
	        	resolve(response)
			})
			.catch((error) => {
				reject(error)
			})
		})
}

export default loginUser