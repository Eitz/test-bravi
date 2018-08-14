import React, { Component } from 'react';

// import MaskedInput from 'react-text-mask';

import './FormPerson.css';

export default class FormPerson extends Component {

	state = {
		person: {
			name: '',
			contacts: []
		}
	};

	componentDidUpdate(prevProps) {
		if (prevProps.person !== this.props.person) {
			this.setState({
				...this.state,
				person : this.props.person
			});
		}
	}
	

	selectContactType(type_id, contact, idx) {
		type_id = parseInt(type_id, 10);
		return (
			<select onChange={(e) => this.handleContactChange({ ...contact, type: e.target.value }, idx)} defaultValue={type_id ? type_id : null} className="inline" name="contact_type">
				<option value="1">E-mail</option>
				<option value="2">Celular</option>
				<option value="3">Telefone Fixo</option>
				<option value="4">WhatsApp</option>
				<option value="5">Skype</option>
			</select>
		);
	}

	onSubmit(e) {
		e.preventDefault();
		this.props.onSubmit(this.state.person);
	}

	newContact() {
		let person = this.state.person;
		person.contacts = [
			...person.contacts
		];
		person.contacts.push({
			type : 1,
			info: ''
		});

		this.setState({ ...this.state, person : person});
	}

	removeContact(index) {
		let person = this.state.person;
		person.contacts.splice(index, 1);
		person.contacts = [...person.contacts];
		this.setState({ ...this.state, person : person});
	}

	renderError(field, index) {
		if (this.props.personOperation && this.props.personOperation.errors) {
			for (let err of this.props.personOperation.errors) {
				if (err.field === field) {
					if (index === undefined || index === null || index === err.index) {
						return <span className="TextError">{err.text}</span>;
					}
				} 
			}
		}
		return null;
	}

	handleNameChange(name) {
		let person = this.state.person;
		person.name = name;
		this.setState({
			...this.state,
			person
		});
	}

	handleContactChange(contact, idx) {
		let contacts = [...this.state.person.contacts];
		contacts[idx] = contact;
		this.setState({
			...this.state,
			person: {
				...this.state.person,
				contacts: contacts
			}
		});
	}

	getMaskedInputRegex(type_id) {
		type_id = parseInt(type_id, 10);
		switch(type_id) {
		case 1:
			return [/\b[A-Z0-9._%+-]+/, '@', /[A-Z0-9.-]+\.[A-Z]{2,}\b/];
		case 3:
			return ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
		case 2:
		case 4:
			return ['(', /[1-9]/, /\d/, ')', ' ', /9/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
		case 5:
			return [/^[a-z][a-z\-.]*$/];
		default:
			return [];
		}
	}

	render() {

		let contacts = this.state.person.contacts.map((c, idx) => (
			<div className="Contact" key={idx}>
				<label className="inline"> Tipo </label>
				{this.selectContactType(c.type, c, idx)}
				<label className="inline"> Valor </label>
				{/*<MaskedInput mask={this.getMaskedInputRegex(c.type)} guide={true} onChange={e => this.handleContactChange({ ...c, info: e.target.value }, idx)} className="inline" type="text" name="contact_info" />*/}
				<input value={c.info} onChange={e => this.handleContactChange({ ...c, info: e.target.value }, idx)} className="inline" type="text" name="contact_info" />
				<button type="button" onClick={() => this.removeContact(idx)} className="Remove Primary Inverted Small">&times;</button>
				{this.renderError('contact_info', idx)}
				<hr className="inner" />
			</div>
		));

		return (
			<form className="FormPerson" onSubmit={(e) => this.onSubmit(e)}>
				<label> Nome {this.renderError('name')} </label>
				<input type="text" value={this.state.person.name} onChange={e => this.handleNameChange(e.target.value)} placeholder="Ex: Joe Doe" />
				<p> Contatos desta pessoa </p>
				{contacts}
				<button type="button" onClick={() => this.newContact()} className="Primary Inverted Small">Novo contato</button>
				<hr />
				<button className="Primary Save">Salvar</button>
			</form>
		);
	}
}