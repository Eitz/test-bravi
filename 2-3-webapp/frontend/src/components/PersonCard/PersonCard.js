import React, { PureComponent } from 'react';
// import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// import {  } from '../../store/actions';

import './PersonCard.css';

class PersonCard extends PureComponent {

	render() {

		let style = {
			backgroundImage: 'url(\'/img/example/person-placeholder.jpg\')'
		};

		let person = this.props.person;
		person.mainContact = person.mainContact || person.contacts[0];

		let contacts = [];

		if (this.props.showDetails) {
			person.contacts = person.contacts || [];

			contacts = person.contacts.map((contact, idx) => (
				<p key={idx}>
					{contact.typeName}: {contact.info}
				</p>
			));
		}

		return (
			<React.Fragment>
				<div className="PersonCard">
					<Link className="ImageWrapper" to={person.link}>
						<div className="Image" style={style}></div>
					</Link>
					<div className="Content">
						<div className="Info">
							<h3 className="Name">{person.name}</h3>
							<p className="MainContact">{ person.mainContact.typeName? person.mainContact.typeName + ':' : '' } {person.mainContact.info || <small>Nenhum contato registrado até o momento</small>}</p>
						</div>
					</div>
					{
						!this.props.showDetails ? 
							<Link to={person.link} className="MoreInfo Expand">
								Ver Detalhes
							</Link>
							: null
					}
				</div>
				{contacts}
			</React.Fragment>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		// pesquisarLeis: bindActionCreators(pesquisarLeis, dispatch)
	};
}

export default connect(null, mapDispatchToProps)(PersonCard);