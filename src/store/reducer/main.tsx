import { AnyAction, createStore } from 'redux';
import { ACTIONS } from '../actions/main';

const initialState = {
	itemList: [
		{
			name: '',
			price: '',
			description: '',
			promo: false,
			img: 0,
			desclong: '',
		},
	],
};

const main = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case ACTIONS.initialSetup:
			return {
				...state,
				itemList: action.payload,
			};
		default:
			return state;
	}
};

export default createStore(main);
