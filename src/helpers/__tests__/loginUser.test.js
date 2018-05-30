import React from 'react'
import loginUser from '../loginUser'

describe('LogInUser axios call', () => {

	it('logs in user correctly', (done) => {
		let user = {
			username: "nishith",
			password:"123"
		};
		expect.assertions(1);
		return loginUser(user).then(data => {
			expect(true).toBeTruthy();
			done();
		})
	});

	it('log in user failed', () => {
		let user = {
			username: "nishith",
			password:"1234"
		};
		expect.assertions(1);
		return loginUser(user).catch(error => {
			expect(true).toBeTruthy();
		})
	});

});