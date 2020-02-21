import { AnyAction, createStore, applyMiddleware } from 'redux';
import { ACTIONS, Tstate, Titem } from '../actions/main';
import thunk from 'redux-thunk';

const firstName = [
	'🎧Headset',
	'🖱Mouse',
	'🍷Wine',
	'👞Boots',
	'🛸Spaceship',
	'🕶X-ray glasses',
	'🛠Hammer',
	'🛠Screwdriver',
	'🎸Electric Guitar',
];

const itemGenerator = () => {
	const nameRandomizer = () => {
		const returnRandom = (e: number) => {
			return Math.floor(Math.random() * e);
		};
		const secondName = ['slim', 'compact', 'special', 'deluxe', 'plus', 'mega'];
		const brandName = ['macrosuft', 'ipear', 'giordanno', 'volvet', 'raize'];
		const q1 = [
			'innovative',
			'premium',
			'awesome',
			'regular',
			'provoking',
			'audacious',
		];
		const q2 = ['lifestyle', 'disruptive ideas', 'office', 'house'];
		const q3 = ['disruptive', 'straightforward', 'simple'];
		const desc = [
			`If this ${q1[returnRandom(q1.length)]} product fits well with your ${q2[
				returnRandom(q2.length)
			]}, dont wait any time! Buy it now!`,
			`Check out this ${q3[returnRandom(q3.length)]} and ${q1[
				returnRandom(q1.length)
			]} product!`,
		];
		const nameSelect = firstName[returnRandom(firstName.length)];
		const modelName = secondName[returnRandom(secondName.length)];
		const brand = brandName[returnRandom(brandName.length)];
		const desclong = `This ${nameSelect.slice(
			2,
			nameSelect.length,
		)} is a perfect model of ${q1[returnRandom(q1.length)]} ${q2[
			returnRandom(q2.length)
		]} for the current era. Order it now!
		Only model ${modelName} is available! Acquire this ${q3[
			returnRandom(q3.length)
		]} product today!`;

		return [
			`${nameSelect} ${modelName} ${brand}`,
			desc[returnRandom(desc.length)],
			desclong,
		];
	};
	const a: Titem[] = [];
	for (let i = 0; i < 50; i++) {
		const exe = nameRandomizer();
		a.push({
		  name: exe[0],
		  price: (Math.random() * 400 + 50).toFixed(2),
		  description: exe[1],
		  promo: Math.random() > 0.8,
		  img: Math.floor(Math.random() * 100 + 100),
		  desclong: exe[2],
		  slides: Math.floor(Math.random() * 6),
		  rating: parseFloat((Math.random() * 2 + 3).toFixed(1))
		});
	  }
	return a;
};

const catHandler = () => {
	const cat = [];
	for (let i in firstName) {
	  // console.log(i)
	  if (i) {
		cat.push(firstName[i].slice(0, 2));
	  }
	}
	const cater: any = new Set(cat);
	const after: string[] = [...cater];
	return after;
}

const initialItem = itemGenerator();
const initialCat = catHandler();

const initialState: Tstate = {
	itemList: initialItem,
	categories: initialCat,
	cartList: [],
	cartToggle: false,
	selectedProduct: -1,
	isMobile: false,
};

const main = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case ACTIONS.mobileDetect:
			return {
				...state,
				isMobile: action.payload,
			};
		case ACTIONS.cartModal:
			return {
				...state,
				cartToggle: action.payload,
			};
		case ACTIONS.selectProduct:
			return {
				...state,
				selectedProduct: action.payload,
			};
		case ACTIONS.removeCart:
			const a = [...state.cartList];
			a.splice(action.payload, 1);
			return {
				...state,
				cartList: a,
			};
		case ACTIONS.addCart:
			return {
				...state,
				cartList: action.payload,
			};
		default:
			return state;
	}
};

export default createStore(main, applyMiddleware(thunk));

