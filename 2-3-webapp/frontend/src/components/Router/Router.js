import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// Pages
import Home from '../../containers/Pages/Home/Home';
import PersonList from '../../containers/Pages/PersonList/PersonList';
import NotFound from '../../containers/Pages/NotFound/NotFound';
import PersonDetails from '../../containers/Pages/PersonDetails/PersonDetails';
import PersonNew from '../../containers/Pages/PersonNew/PersonNew';
import PersonEdit from '../../containers/Pages/PersonEdit/PersonEdit';

class Router extends Component {
	render() {
		return (
			<Switch>
				<Route
					exact path="/"
					component={Home}
				/>
				<Route
					exact path="/pessoas"
					component={PersonList}
				/>
				<Route
					exact path="/pessoas/nova"
					component={PersonNew}
				/>
				<Route
					exact path="/pessoas/:person_id"
					component={PersonDetails}
				/>
				<Route
					exact path="/pessoas/:person_id/editar"
					component={PersonEdit}
				/>
				<Route
					component={NotFound}
				/>
			</Switch>
		);
	}
}

function mapStateToProps() {
	return {};
}

export default withRouter(connect(mapStateToProps, null)(Router));