import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './PersonNew.css';

import { createPerson, finalizePersonOperation } from '../../../store/actions';

import StructuralContainer from '../../../components/Layout/StructuralContainer/StructuralContainer';
import Breadcrumb from '../../../components/Layout/Breadcrumb/Breadcrumb';
import PersonForm from '../../../components/PersonForm/PersonForm';

class PersonNew extends Component {

	prepareBreadcrumbLinks() {
		return [
			{ to: '/pessoas', text: 'Pessoas Registradas' },
			{ to: '/pessoas/nova', text: 'Registrando nova pessoa' },
		];
	}

	onSubmit(person) {
		this.props.createPerson({ person });
	}

	componentWillUnmount() {
		this.props.finalizePersonOperation();
	}

	render() {

		if (this.props.personOperation.status === 'success') {
			return <Redirect to="/pessoas" />;
		}

		return (
			<React.Fragment>
				<Breadcrumb links={this.prepareBreadcrumbLinks()} />
				<StructuralContainer>
					<aside></aside>
					<article className="PersonNew">
						<h1>Registrar nova pessoa</h1>
						<PersonForm personOperation={this.props.personOperation} onSubmit={person => this.onSubmit(person)}/>
					</article>
				</StructuralContainer>
			</React.Fragment>
		);
	}
}

function mapStateToProps({ personOperation }) {
	return { personOperation };
}

function mapDispatchToProps(dispatch) {
	return {
		createPerson: bindActionCreators(createPerson, dispatch),
		finalizePersonOperation: bindActionCreators(finalizePersonOperation, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonNew);