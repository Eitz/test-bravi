import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './components/App/App';
// import registerServiceWorker from './registerServiceWorker';
import promiseMiddleware from 'redux-promise-middleware';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './store/reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(
	applyMiddleware(promiseMiddleware())
));

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('app')
);


// registerServiceWorker();