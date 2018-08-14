import React, { Component } from 'react';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

import reducers from '../../store/reducers/index';
import errorCatchingMiddleware from '../../middlewares/errorCatching';

import Layout from '../Layout/Layout';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(
	applyMiddleware(errorCatchingMiddleware, promiseMiddleware())
));
class App extends Component {
 render() {
  return (
		<Provider store={store}>
			<BrowserRouter>
				<Layout />
			</BrowserRouter>
		</Provider>
  );
 }
}

export default App;
