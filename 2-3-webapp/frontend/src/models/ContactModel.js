export default class ContactModel {
	constructor(props) {
		/** @type {string} */
		this.info = props.info;
		/** @type {string} */
		this.type = props.type;
		/** @type {Integer} */
		this.id = props.id;	
	}

	get icon() {
		return `icon-${this.id}`;
	}
}