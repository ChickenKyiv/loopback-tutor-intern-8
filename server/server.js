'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();
var cookieParser = require('cookie-parser');
var session = require('express-session');
// const forestLiana = require('forest-loopback');

//install raven
var Raven = require('raven-js');
if(process.env.NODE_ENV == 'production'){
  const ravenurl = 'https://' + process.env.REACT_APP_SENTRY_KEY + '@sentry.io/' + process.env.REACT_APP_SENTRY_APP;
  Raven.config(ravenurl).install();
}
else {//if not required in development then you can remove this
  Raven.config('https://77aa2ee9a7ce484497f56278982a0809@sentry.io/305339').install();
}


// Passport configurators..
var loopbackPassport     = require('loopback-component-passport');
var PassportConfigurator = loopbackPassport.PassportConfigurator;
var passportConfigurator = new PassportConfigurator(app);
// const FOREST_ENV_SECRET = process.env.LOOPBACK_FOREST_ENV_SECRET;
// const FOREST_AUTH_SECRET = process.env.LOOPBACK_FOREST_AUTH_SECRET;
//body-parser reads a form's input and stores it as a javascript object accessible through `req.body`
var bodyParser = require('body-parser');

//Flash messages for passport can give exact message for what failed

var flash = require('express-flash');

// attempt to build the providers/passport config
var config = {};
try {
  config = require('../providers.json');
} catch (err) {
  Raven.captureException(err);
  console.trace(err);
  process.exit(1); // fatal
}

// -- Add your pre-processing middleware here --

// Setup the view engine (jade or ejs)
var path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// boot scripts mount components like REST API
boot(app, __dirname);

// to support JSON-encoded bodies
app.middleware('parse', bodyParser.json());
// to support URL-encoded bodies
app.middleware('parse', bodyParser.urlencoded({extended: true}));

// The access token is only available after boot
app.middleware('auth', loopback.token({
  model: app.models.accessToken,
}));

app.middleware('session:before', cookieParser(app.get('cookieSecret')));
app.middleware('session', session({
  secret: 'awesome',
  saveUninitialized: true,
  resave: true,
  cookie: { maxAge: 1 * 20 * 60 * 1000 } /*hours minutes seconds milli*/
}));
passportConfigurator.init();

//flash messages to see passport errors
app.use(flash());

passportConfigurator.setupModels({
  userModel: app.models.user,
  userIdentityModel: app.models.userIdentity,
  userCredentialModel: app.models.userCredential,
});
for (var s in config) {
  var c = config[s];
  c.session = c.session !== false;
  passportConfigurator.configureProvider(s, c);
}
//ensure that the user is logged in, if unauthenticated request then return user to login page
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

//forest  NOT DONE NO MODELS DISPLAYED STILL NEED TO CHECK WHATS WRONG
// app.use(
//   forestLiana.init({
//     modelsDir: __dirname + '/../common/models',  // The directory where all of your Loopback models are defined.
//     secretKey: FOREST_ENV_SECRET, // The secret key given my Forest.
//     authKey: FOREST_AUTH_SECRET, // Choose a secret authentication key.
//     loopback: loopback // The loopback instance given by require('loopback').
//   })
// );

/*==Implement if failure messages do not work in react==*/
app.get('*', function(req, res, next) {
  res.locals.user = req.user || null;
  res.locals.session = req.session;
  next();
});

app.get('/', function(req, res, next) {
  res.render('pages/login', {
    user: req.user,
    url: req.url,
  });
});

app.get('/auth/account', ensureLoggedIn('/'), function(req, res, next) {
  //res.redirect('/auth/account');
   res.render('pages/loginProfiles', {
     user: req.user,
     url: req.url,
   });
});

app.get('/auth/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};
// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts
// boot(app, __dirname, function(err) {
//   if (err) throw err;
//   // start the server if `$ node server.js`
   if (require.main === module)
     app.start();
// });
