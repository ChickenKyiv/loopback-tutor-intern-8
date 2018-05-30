import React     from 'react';
import ReactDOM  from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
//import { unregister } from './registerServiceWorker';

import registerServiceWorker from './registerServiceWorker';
import { logException } from '../ravenconfig'

const rootElement = document.getElementById('root')

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
, rootElement)

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    ReactDOM.render(
      <NextApp />,
      rootElement
    )
  })
}
registerServiceWorker();
///unregister();
