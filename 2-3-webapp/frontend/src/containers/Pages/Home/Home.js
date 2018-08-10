import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './Home.css';

class Home extends Component {
	render() {
		return (
			<Redirect to="/pessoas" />
		);
	}
}

export default Home;