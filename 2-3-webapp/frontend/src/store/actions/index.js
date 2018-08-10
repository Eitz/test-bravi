import request from './request';

const PUBLIC_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';

export const actionsList = {
	LOAD_PERSONS: 'LOAD_PERSONS',
	LOAD_PERSON: 'LOAD_PERSON',
	
	CREATE_PERSON: 'CREATE_PERSON',
	UPDATE_PERSON: 'UPDATE_PERSON',
	DESTROY_PERSON: 'DESTROY_PERSON'
};

export const loadPersons = props => {
	return {
		type: actionsList.LOAD_PERSONS,
		payload: {
			promise: request(`${PUBLIC_URL}/api/v1/person`)
		}
	};
};

export const loadPerson = props => {
	return {
		type: actionsList.LOAD_PERSON,
		payload: {
			promise: request(`${PUBLIC_URL}/api/v1/person/${props.id}`)
		}
	};
};

export const createPerson = props => {
	let opts = {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({person : props.person })
	};
	return {
		type: actionsList.CREATE_PERSON,
		payload: {
			promise: request(`${PUBLIC_URL}/api/v1/person`, opts)
		}
	};
};

export const updatePerson = props => {
	let opts = {
		method: 'PUT',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ person : props.person })
	};
	return {
		type: actionsList.CREATE_PERSON,
		payload: {
			promise: request(`${PUBLIC_URL}/api/v1/person/${props.person.id}`, opts)
		}
	};
};


export const destroyPerson = props => {
	let opts = {
		method: 'DELETE',
		headers: {
			'Accept': 'application/json'
		}
	};
	return {
		type: actionsList.DESTROY_PERSON,
		payload: {
			promise: request(`${PUBLIC_URL}/api/v1/person/${props.id}`, opts)
		},
		meta : {
			id: props.id
		}
	};
};


export const finalizePersonOperation = props => {
	return {
		type: actionsList.CREATE_PERSON + '_END',
	};
};
