export default class ContactModel {
	constructor(props) {
		/** @type {string} */
		this.info = props.info;
		/** @type {string} */
		this.typeName = props.typeName;
		/** @type {Integer} */
		this.type = props.type;
		/** @type {Integer} */
		this.id = props.type;	
	}

	get icon() {
		return `icon-${this.id}`;
	}
}