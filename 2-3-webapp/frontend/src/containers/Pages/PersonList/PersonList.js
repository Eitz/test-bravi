import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './PersonList.css';

import { loadPersons } from '../../../store/actions';

import StructuralContainer from '../../../components/Layout/StructuralContainer/StructuralContainer';
import Breadcrumb from '../../../components/Layout/Breadcrumb/Breadcrumb';
import PersonCard from '../../../components/PersonCard/PersonCard';
import Filters from '../../../components/Filters/Filters';

class PersonList extends Component {

	constructor(props) {
		super(props);
		this.props.loadPersons();
	}

	prepareBreadcrumbLinks() {
		return [
			{ to: '/pessoas', text: 'Pessoas Registradas' },
		];
	}

	render() {

		let personList;
		if (!this.props.personList) {
			personList = <p>Carregando...</p>;
		} else {
			personList = this.props.personList.map((person, idx) => (
				<PersonCard key={idx} person={person} />
			));
		}

		return (
			<React.Fragment>
				<Breadcrumb links={this.prepareBreadcrumbLinks()} />
				<StructuralContainer>
					<aside>
						<Filters />
					</aside>
					<article className="PersonList">
						<h1>
							Pessoas Registradas <Link className="Primary" to="/pessoas/nova">Registrar nova pessoa</Link>
						</h1>
						{personList}
					</article>
				</StructuralContainer>
			</React.Fragment>
		);
	}
}

function mapStateToProps({ personList }) {
	return { personList };
}

function mapDispatchToProps(dispatch) {
	return {
		loadPersons: bindActionCreators(loadPersons, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonList);