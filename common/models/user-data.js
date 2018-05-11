'use strict';


var config = require('../../server/config.json');
var path = require('path');
var senderAddress = "arthur.tkachenko.netweight@gmail.com";
//var senderEmailPassword = "biBcf1K8r4Yn";

//adjust in final build
var host = process.env.HOST || "localhost";
var port = process.env.PORT || config.port;
var customverifyHref = 'https://loopback-react-account.herokuapp.com/api/userData/confirm?uid=';
//to change the default host port for verification
var reacturl = 'https://groceristar.netlify.com';//redirect to this page after verification


module.exports = function(Userdata) {
  //send verification email after registration
  Userdata.afterRemote('create', function(context, user, next) {
    var options = {
      type: 'email',
      to: user.email,
      from: "<no-reply@groceristar.com>",
      subject: 'Thanks for registering.',
      text: "please verify the link",
      template: path.resolve(__dirname, '../../server/views/verify.ejs'),
      verifyHref: customverifyHref + user.id + '&redirect=' + reacturl + '/verified',
      redirect: verifiedRedirecturl + '/verified',
      //redirect:'http://' + host + ':' + port + '/verified',//Take to the successfully verified page remove front part for final build
      user: user
    };

    user.verify(options, function(err, response) {
      if (err) {
        Userdata.deleteById(user.id);
        return next(err);
      }
      //adjust this in react
      context.res.render('response', {
        title: 'Signed up successfully',
        content: 'Please check your email and click on the verification link ' +
            'before logging in.',
        redirectTo: '/',
        redirectToLinkText: 'Log in'
      });
    });
  });
  //Insert one more method to verify email after user has updated the email
  // Userdata.afterRemote('updateAttributes', function(context, user, next) {//unable to call this function/wrong method name
  //   console.log("yessss")
  //   var options = {
  //     type: 'email',
  //     to: user.email,
  //     from: "<no-reply@groceristar.com>",
  //     subject: 'Groceristar profile update.',
  //     text: "please verify the link",
  //     template: path.resolve(__dirname, '../../server/views/verify.ejs'),
  //     redirect: 'http://' + host + ':' + port + '/verified',//Take to the successfully verified page remove front part for final build
  //     user: user
  //   };

  //   user.verify(options, function(err, response) {
  //     if (err) {
  //       //Userdata.deleteById(user.id);
  //       return next(err);
  //     }
  //     context.res.render('response', {
  //       title: 'Updated successfully',
  //       content: 'Please check your email and click on the verification link to verify that changes were made by you',
  //       redirectTo: '/',
  //       redirectToLinkText: 'Log in'
  //     });
  //   });
  // });

  // Method to render when email is sent
  Userdata.afterRemote('prototype.verify', function(context, user, next) {
    context.res.render('response', {
      title: 'A Link to reverify your identity has been sent '+
        'to your email successfully',
      content: 'Please check your email and click on the verification link '+
        'before logging in',
      redirectTo: '/',
      redirectToLinkText: 'Log in'
    });
  });
//invite someone via email
  Userdata.invite = function (email, user) {
  //  console.log(user)
    var url = reacturl;//'http://' + host + ':' + port + '/';
    var html = user.firstName + ' ' + user.lastName + ' invite you to ' +'<a href="' + url + '">url</a> to check us out';
    Userdata.app.models.Email.send({
      to: email,
      from: senderAddress,
      subject: 'Invitation',
      html: html
    }, function(err) {
      if (err) return console.log('> error sending invite email');
      console.log('> sending invite email to:', email);
    });
  };

  Userdata.remoteMethod('invite', 
    {
      http: {path: '/invite', verb: 'post'},
      accepts: [
        {arg:'email', type: 'string'},
        {arg: 'user', type: 'object'}
      ]
    }
  );

  //export user data
  Userdata.csvexport = function(/*id,*/ res, callback) {
    var csvdata = "sending this as data"//get the data from database
    //model.find({where: {userId: req.user.userId}}, function(err, data) { /* set csvdata = data */ });
    var datetime = new Date();
    res.set('Expires', datetime.setDate(datetime.getDate() + 1 ));
    res.set('Cache-Control', 'max-age=0, no-cache, must-revalidate, proxy-revalidate');
    res.set('Last-Modified', datetime );
    res.set('Content-Type','application/force-download');
    res.set('Content-Type','application/octet-stream');
    res.set('Content-Type','application/download');
    res.set('Content-Disposition','attachment;filename=Data.csv');
    res.set('Content-Transfer-Encoding','binary');
    res.status(200).send(csvdata); //send CSV data here.
  };

  Userdata.remoteMethod('csvexport',
  {
    accepts: [
    //  {arg: 'id', type: 'string', required: true },
      {arg: 'res', type: 'object', 'http': {source: 'res'}}
    ],
    returns: {},
    http: {path: '/csvexport', verb: 'get'}
  });

  //send password reset link when requested
  Userdata.on('resetPasswordRequest', function(info) {
    var url = reacturl + '/reset-password'; 
    //var url = 'https://' + host + ':' + port/reset-password;
    //var url = 'http://' + config.host + ':' + config.port + '/api/userData/reset-password'; Testing locally
    var html = 'Click <a href="' + url + '?access_token=' +
        info.accessToken.id + '">here</a> to reset your password';
  //      console.log("yes reset reached here with this access token"+ info.accessToken.id);
    Userdata.app.models.Email.send({
      to: info.email,
      from: senderAddress,
      subject: 'Password reset',
      html: html
    }, function(err) {
      if (err) return console.log('> error sending password reset email');
      console.log('> sending password reset email to:', info.email);
    });
  });

  //render UI page after password change not required if react implementation works
  Userdata.afterRemote('changePassword', function(context, user, next) {
    context.res.render('response', {
      title: 'Password changed successfully',
      content: 'Please login again with new password',
      redirectTo: '/',
      redirectToLinkText: 'Log in'
    });
  });

  //render UI page after password reset
  Userdata.afterRemote('setPassword', function(context, user, next) {
    context.res.render('response', {
      title: 'Password reset success',
      content: 'Your password has been reset successfully',
      redirectTo: '/',
      redirectToLinkText: 'Log in'
    });
  });
};

/*Settings for gmail
  "emailds": {
    "name": "emailds",
    "transports": [
      {
        "type": "smtp",
        "host": "smtp.gmail.com",
        "secure": true,
        "port": 465,
        "tls": {
          "rejectUnauthorized": false
        },
        "auth": {
          "user": "",
          "pass": ""
        }
      }
    ],
    "connector": "mail"
  }

*/