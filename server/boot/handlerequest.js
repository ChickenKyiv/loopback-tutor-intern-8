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
//For subscription
		//console.log("user:"+req.user+"\n");
		const token = req.body.stripeToken;
		//const amt = req.body.amount;//amount can be used for one time purchase
		const email = req.body.email;//email given by user to stripe
		const planName = req.body.plan;//id which is generated in stripe
		stripe.customers.create({
			email: email,
			source: token,
		}, function (err, customer) {
			if(err){
				console.log(err);
				res.send({success: false, message: 'error'});
			}
			else{
				console.log("customer:"+ JSON.stringify(customer)+"\n");
				stripe.subscriptions.create({
					customer: customer.id,
					items: [{
						plan: planName,
						quantity: 1,
					}]
				}, function(err, subscription) {
				// asynchronously called
					if(err){
					console.log(err);
					res.send({success: false, message: 'error'});
					}
					else{
						console.log("subscription:"+JSON.stringify(subscription)+"\n");
						res.send({success: true, message: 'sub success', email: email});
					}
				});
			}
		});
	});

/*
========Charge customer for once========
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
*/
	handle.get('/userstatus', function(req, res, next){//try to pass context object and send user data to frontend
	//	res.json(req.user);JSON.stringify(req.user)
	//	console.log(context);
		if(req.user){
			let username = req.user.id;
			console.log("Req.user", username );
			res.status(200).send(username);
		}
		else
			res.status(200).send("Please login");
	});
}