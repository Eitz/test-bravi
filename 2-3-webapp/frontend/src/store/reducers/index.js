import { actionsList } from '../actions';
import { combineReducers } from 'redux';

import PersonModel from '../../models/PersonModel';

function personList(state = null, action) {
	switch (action.type) {
	case actionsList.LOAD_PERSONS + '_FULFILLED':
		state = action.payload.person_list.map(p => (new PersonModel(p)));
		return state;
	case actionsList.DESTROY_PERSON + '_FULFILLED':
		state = state ? state.filter(person => (
			parseInt(person.id, 10) !== parseInt(action.meta.id, 10)
		)) : state;
		return state;
	case actionsList.LOAD_PERSONS + '_REJECTED':
		return [];
	case actionsList.LOAD_PERSONS + '_PENDING':
		return null;
	default:
		return state;
	}
}

function person(state = new PersonModel({}), action) {
	switch (action.type) {
	case actionsList.LOAD_PERSON + '_FULFILLED':
		return new PersonModel(action.payload.person);
	case actionsList.LOAD_PERSON + '_REJECTED':
		return {};
	case actionsList.LOAD_PERSON + '_PENDING':
		return state;
	default:
		return state;
	}
}

let defaultPersonOperationState = { errors: [], status: undefined };
function personOperation(state = defaultPersonOperationState, action) {
	switch (action.type) {
	case actionsList.CREATE_PERSON + '_FULFILLED':
		return { status: 'success' };
	case actionsList.CREATE_PERSON + '_REJECTED':
		return { status: 'error', errors: action.payload };
	case actionsList.CREATE_PERSON + '_PENDING':
		return state;
	case actionsList.CREATE_PERSON + '_END':
		return defaultPersonOperationState;
	default:
		return state;
	}
}

export default combineReducers({
	personList,
	person,
	personOperation
});