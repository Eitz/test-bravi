import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import './PersonCard.css';

class PersonCard extends PureComponent {

	prepareContacts() {
		if (this.props.showDetails && this.props.person.contacts) {
			return this.props.person.contacts.map((contact, idx) => (
				<p key={idx}>
					{contact.typeName}: {contact.info}
				</p>
			));
		}
		return null;
	}

	render() {

		let style = {
			backgroundImage: 'url(\'/img/example/person-placeholder.jpg\')'
		};

		let person = this.props.person;
	
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
				{this.prepareContacts()}
			</React.Fragment>
		);
	}
}


export default PersonCard;