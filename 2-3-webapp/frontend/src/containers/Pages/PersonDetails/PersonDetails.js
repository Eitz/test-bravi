import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './PersonDetails.css';

import { loadPerson, destroyPerson } from '../../../store/actions';

import StructuralContainer from '../../../components/Layout/StructuralContainer/StructuralContainer';
import Breadcrumb from '../../../components/Layout/Breadcrumb/Breadcrumb';
import PersonCard from '../../../components/PersonCard/PersonCard';

class PersonDetails extends Component {

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
		];
	}

	destroy() {
		this.props.destroyPerson({
			id: this.props.match.params.person_id
		});
		this.props.history.push('/pessoas');
	}

	render() {

		let person;
		if (!this.props.person) {
			person = <p>Carregando...</p>;
		} else {
			person = <PersonCard showDetails={true} person={this.props.person} />;
		}

		return (
			<React.Fragment>
				<Breadcrumb links={this.prepareBreadcrumbLinks()} />
				<StructuralContainer>
					<aside></aside>
					<article className="PersonDetails">
						<h1>
							Detalhes da Pessoa
							{ 
								this.props.person
									? 
									<React.Fragment>
										<button onClick={e => this.destroy()} className="Primary Inverted Small">Excluir</button>
										<Link to={`${this.props.person.link}/editar`} className="Primary Inverted Small">
											Editar
										</Link>	
									</React.Fragment>
									: null
							}				
						</h1>
						{person}
					</article>
				</StructuralContainer>
			</React.Fragment>
		);
	}
}

function mapStateToProps({ person }) {
	return { person };
}

function mapDispatchToProps(dispatch) {
	return {
		loadPerson: bindActionCreators(loadPerson, dispatch),
		destroyPerson: bindActionCreators(destroyPerson, dispatch),
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PersonDetails));