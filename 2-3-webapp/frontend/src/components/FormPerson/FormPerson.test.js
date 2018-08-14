import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App/App';
import FormPerson from './FormPerson';

describe('FormPerson', () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render((
			<FormPerson person={{}} personOperation={{}}/>
		), div);
		ReactDOM.unmountComponentAtNode(div);
	 });
});
