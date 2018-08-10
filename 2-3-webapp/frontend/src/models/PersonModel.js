import ContactModel from './ContactModel';

export default class PersonModel {
	constructor(props) {
		/** @type {string} */
		this.name = props.name;
		/** @type {Integer} */
		this.id = props.id;
		
		this.contacts = props.contacts || [];
		
		this.mainContact = 
			props.contact 
				? new ContactModel(props.contact)
				: this.contacts[0]
					? new ContactModel(this.contacts[0])
					: {};
	}

	get link() {
		return `/pessoas/${this.id}`;
	}
}