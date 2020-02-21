import { AnyAction, createStore } from 'redux';
import { ACTIONS, Tstate } from '../actions/main';

const initialState: Tstate = {
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
	cartList: [],
	cartToggle: false,
};

const main = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case ACTIONS.cartModal:
			return {
				...state,
				cartToggle: action.payload
			}
		case ACTIONS.removeCart:
			const a = [...state.cartList];
			a.splice(action.payload, 1);
			return {
				...state,
				cartList: a
			}
		case ACTIONS.addCart:
			return {
				...state,
				cartList: action.payload
			}
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
