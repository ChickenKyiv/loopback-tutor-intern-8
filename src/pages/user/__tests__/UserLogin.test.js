jest.mock('../UserLogin');

import submitUser from '../UserLogin'

describe('LogInUser component', () => {

	it('logs in user correctly', () => {
		let user = {
			username: "test",
			password:"123"
		};
		expect.assertions(1);
		return submitUser(user).then(data => {
			expect(data).toEqual('success');
		})
	});

	it('log in user failed', () => {
		let user = {
			username: "test",
			password:"1234"
		};
		expect.assertions(1);
		return submitUser(user).catch(error => {
			expect(error).toEqual('error');
		})
	});

});