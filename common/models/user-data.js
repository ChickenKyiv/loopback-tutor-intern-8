'use strict';


var config = require('../../server/config.json');
var path = require('path');
var senderAddress = "arthur.tkachenko.netweight@gmail.com";//what has to be displayed in from in email 
//var senderEmailPassword = "biBcf1K8r4Yn";//can be different for different emails

//adjust in final build
var host = process.env.HOST || "localhost";
var port = process.env.PORT || config.port;
//will need to be set separately
if(process.env.NODE_ENV == 'production'){
  var customverifyHref = process.env.LOOPBACK_SERVER_API_URL + '/api/userData/confirm?uid=';//This url depends on model
  //to change the default host port for verification
  var reacturl = process.env.REACT_APP_FRONTEND_URL;//redirect to this page after verification
}
else{
  var customverifyHref = 'http://localhost:3000' + '/api/userData/confirm?uid=';
  var reacturl = 'http://localhost:3001';//redirect to this page after verification
}

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
      redirect: reacturl + '/verified',
      //redirect:'http://' + host + ':' + port + '/verified',//Take to the successfully verified page remove front part for final build
      user: user
    };

    user.verify(options, function(err, response) {
      if (err) {
        Userdata.deleteById(user.id);
        return next(err);
      }
      context.res.status(200).send('success');
      //adjust this in react
      // context.res.render('response', {
      //   title: 'Signed up successfully',
      //   content: 'Please check your email and click on the verification link ' +
      //       'before logging in.',
      //   redirectTo: '/',
      //   redirectToLinkText: 'Log in'
      // });
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
  Userdata.invite = function (email, user, res) {
  //  console.log(user)
    var url = reacturl;//'http://' + host + ':' + port + '/';
    var html = user.firstName + ' ' + user.lastName + ' invited you to ' +'<a href="' + url + '">groceristar</a> to check us out';
    Userdata.app.models.Email.send({
      to: email,
      from: senderAddress,
      subject: 'Invitation',
      html: html
    }, function(err, ctx) {
      if (err) return console.log('> error sending invite email');
      else{
        console.log('> sending invite email to:', email);
        res.status(200).send('sent');
      }
    });
  };

  Userdata.remoteMethod('invite', 
    {
      http: {path: '/invite', verb: 'post', status: 200, errorStatus: 400},
      accepts: [
        {arg:'email', type: 'string'},
        {arg: 'user', type: 'object'},
        {arg: 'res', type: 'object', 'http': {source: 'res'}}
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
    //  {arg: 'id', type: 'string', required: true }, pass userid
      {arg: 'res', type: 'object', 'http': {source: 'res'}}
    ],
    returns: {},
    http: {path: '/csvexport', verb: 'get'}
  });

  //send password reset link when requested
  Userdata.on('resetPasswordRequest', function(info) {
    var url = reacturl + '/reset-password'; 
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