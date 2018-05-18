import Raven from 'raven-js';

// REACT_APP_SENTRY_KEY
// REACT_APP_SENTRY_APP

const sentry_key = process.env.REACT_APP_SENTRY_KEY || '77aa2ee9a7ce484497f56278982a0809';
const sentry_app = process.env.REACT_APP_SENTRY_APP || '305339';
// @todo where did we use the sentry_url variable?
// or we will install raven here?
export const sentry_url = `https://${sentry_key}@sentry.io/${sentry_app}`;

export function logException(ex, context) {
	Raven.captureException(ex, { extra: context });
	console.error && console.error(ex);
}

/*
the last line is to check if the console is supported or not in browser
can pass the error object from catch or include some other data as used above
 Raven.captureException(e)

To log additional informtion
logException(new Error('text'),{
	//attach anything like
	email:user.email}
);

//won't display as error but to check if it went in your undesired block
Raven.captureMessage('Write your message');

//for feedback from user or like that
Raven.showReportDialog();

*/
