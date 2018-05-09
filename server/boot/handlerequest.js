'use strict';

var dsConfig = require('../datasources.json');
var stripe = require('stripe')("sk_test_XEZV6072P6OvYs3uLcXLSeTF");

// const product = stripe.products.create({
//   name: 'My SaaS Platform',
//   type: 'service',
// });

// const plan = stripe.plans.create({
//   product: 'prod_CbvTFuXWh7BPJH',
//   nickname: 'SaaS Platform USD',
//   currency: 'usd',
//   interval: 'month',
//   amount: 400,
// }, function(err, plan) {
//   if(err)
//   	console.log(err)
//   else
//   	console.log(plan)
// });

module.exports = function(handle) {

	handle.post('/stripe-token', function(req, res, next){
		const token = req.body.stripeToken;
		const amt = req.body.amount;
		console.log(req.body);
		stripe.charges.create({
			amount: amt*100,
			currency: 'usd',
			description: 'Example charge',
			source: token,
		}, function(err, charge) {
			if(err){
				console.log(err);
				res.send({success: false, message: 'error'});
			}
			else{
				//console.log(charge);
				res.send({success: true, message: 'success', email: charge.source.name})
			}
		});
	});

	handle.get('/userstatus', function(req, res, next){
	//	res.json(req.user);JSON.stringify(req.user)
		if(req.user){
			let username = req.user.id;
			console.log("Req.user", username )
			res.status(200).send(username)
		}
	});
}