import request from './request';

const PUBLIC_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';

export const actionsList = {
	PERSON_LIST: 'PERSON_LIST',
	PERSON_RETRIEVE: 'PERSON_RETRIEVE',
	
	PERSON_CREATE: 'PERSON_CREATE',
	PERSON_UPDATE: 'PERSON_UPDATE',
	DESTROY_PERSON: 'DESTROY_PERSON'
};

export const loadPersons = props => {
	return {
		type: actionsList.PERSON_LIST,
		payload: {
			promise: request(`${PUBLIC_URL}/api/v1/person`)
		},
		meta: {
			globalError: true
		}
	};
};

export const loadPerson = props => {
	return {
		type: actionsList.PERSON_RETRIEVE,
		payload: {
			promise: request(`${PUBLIC_URL}/api/v1/person/${props.id}`)
		},
		meta: {
			globalError: true
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
		type: actionsList.PERSON_CREATE,
		payload: {
			promise: request(`${PUBLIC_URL}/api/v1/person`, opts)
		},
		meta: {
			globalError: true
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
		type: actionsList.PERSON_UPDATE,
		payload: {
			promise: request(`${PUBLIC_URL}/api/v1/person/${props.person.id}`, opts)
		},
		meta: {
			globalError: true
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
			id: props.id,
			globalError: true
		}
	};
};


export const finalizePersonOperation = props => {
	return {
		type: actionsList.PERSON_CREATE + '_END',
	};
};
