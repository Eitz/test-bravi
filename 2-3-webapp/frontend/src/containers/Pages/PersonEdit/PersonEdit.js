import React, { Component } from 'react';

import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './PersonEdit.css';

import { loadPerson, updatePerson, finalizePersonOperation } from '../../../store/actions';

import StructuralContainer from '../../../components/Layout/StructuralContainer/StructuralContainer';
import Breadcrumb from '../../../components/Layout/Breadcrumb/Breadcrumb';
import FormPerson from '../../../components/FormPerson/FormPerson';

class PersonEdit extends Component {

	constructor(props) {
		super(props);
		let person_id = this.props.match.params.person_id;
		this.props.loadPerson({
			id: person_id
		});
	}

	prepareBreadcrumbLinks() {
		let name = this.props.person ? this.props.person.name : this.props.match.params.person_id;
		return [
			{ to: '/pessoas', text: 'Pessoas Registradas' },
			{ to: `/pessoas/${this.props.match.params.person_id}`, text: `Detalhes de ${name}` },
			{ to: `/pessoas/${this.props.match.params.person_id}/editar`, text: `Editando ${name}` },
		];
	}

	componentWillUnmount() {
		this.props.finalizePersonOperation();
	}

	onSubmit(person) {
		this.props.updatePerson({ person });
	}

	render() {
		if (this.props.personOperation.status === 'success') {
			return <Redirect to={`/pessoas/${this.props.match.params.person_id}/`}/>;
		}

		let person = this.props.person;

		return (
			<React.Fragment>
				<Breadcrumb links={this.prepareBreadcrumbLinks()} />
				<StructuralContainer>
					<aside></aside>
					<article className="PersonEdit">
						<h1>Editando Pessoa</h1>
						<FormPerson person={person} personOperation={this.props.personOperation} onSubmit={person => this.onSubmit(person)}/>
					</article>
				</StructuralContainer>
			</React.Fragment>
		);
	}
}

function mapStateToProps({ person, personOperation }) {
	return { person, personOperation };
}

function mapDispatchToProps(dispatch) {
	return {
		loadPerson: bindActionCreators(loadPerson, dispatch),
		updatePerson: bindActionCreators(updatePerson, dispatch),
		finalizePersonOperation: bindActionCreators(finalizePersonOperation, dispatch),
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PersonEdit));