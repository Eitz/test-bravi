import { actionsList } from '../actions';
import { combineReducers } from 'redux';

import PersonModel from '../../models/PersonModel';

function personList(state = null, action) {
	switch (action.type) {
	case actionsList.PERSON_LIST + '_FULFILLED':
		state = action.payload.person_list.map(p => (new PersonModel(p)));
		return state;
	case actionsList.DESTROY_PERSON + '_FULFILLED':
		state = state ? state.filter(person => (
			parseInt(person.id, 10) !== parseInt(action.meta.id, 10)
		)) : state;
		return state;
	case actionsList.PERSON_LIST + '_REJECTED':
		return [];
	case actionsList.PERSON_LIST + '_PENDING':
		return null;
	default:
		return state;
	}
}

function person(state = new PersonModel({}), action) {
	switch (action.type) {
	case actionsList.PERSON_RETRIEVE + '_FULFILLED':
		return new PersonModel(action.payload.person);
	case actionsList.PERSON_RETRIEVE + '_REJECTED':
		return {};
	case actionsList.PERSON_RETRIEVE + '_PENDING':
		return state;
	default:
		return state;
	}
}

let defaultPersonOperationState = { errors: [], status: undefined };
function personOperation(state = defaultPersonOperationState, action) {
	switch (action.type) {
	case actionsList.PERSON_CREATE + '_FULFILLED':
	case actionsList.PERSON_UPDATE + '_FULFILLED':
		return { status: 'success' };
	case actionsList.PERSON_CREATE + '_REJECTED':
	case actionsList.PERSON_UPDATE + '_REJECTED':
		return { status: 'error', errors: action.payload };
	case actionsList.PERSON_CREATE + '_PENDING':
	case actionsList.PERSON_UPDATE + '_PENDING':
		return state;
	case actionsList.PERSON_CREATE + '_END':
	case actionsList.PERSON_UPDATE + '_END':
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