import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { loadPersons } from '../../store/actions';

import './Filters.css';

class Filters extends Component {
	render() {
		return <div></div>;
		/*
		return (
			<section className="Filters">
				<h3>Filtrar</h3>
				<h4>Nome</h4>
			</section>
		);*/
	}
}

function mapStateToProps() {
	return { };
}

function mapDispatchToProps(dispatch) {
	return {
		loadPersons: bindActionCreators(loadPersons, dispatch),
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Filters));