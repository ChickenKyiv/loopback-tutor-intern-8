// @todo let's keep that version in someplace. maybe later we'll use a different versions of API
let backendHost;
// const apiVersion = 'v1';

const hostname = window && window.location && window.location.hostname;

if(hostname === 'https://groceristar.netlify.com') {
  backendHost = 'https://loopback-react-account.herokuapp.com';
} else if(hostname === 'staging.realsite.com') {
  backendHost = 'https://staging.api.realsite.com';
} else if(/^qa/.test(hostname)) {
  backendHost = `https://api.${hostname}`;
} else {
  backendHost = process.env.REACT_APP_BACKEND_HOST || 'http://localhost:3000';
}

export const API_ROOT = `${backendHost}`;
