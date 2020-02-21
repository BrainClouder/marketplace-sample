import { Dispatch } from "redux";

export const addCart: string = 'ADD-TO-CART';
export const removeCart: string = 'REMOVE-CART-ITEM';
export const cartModal: string = 'CART-MODAL-TOGGLE';
export const selectProduct: string = 'SELECT-PRODUCT';
export const mobileDetect: string = 'MOBILE-DETECT'

export const ACTIONS = {
	addCart,
	cartModal,
	removeCart,
    selectProduct,
    mobileDetect,
};

export type Tstate = {
	itemList: Titem[];
	cartList: TcartItem[];
    cartToggle: boolean;
    selectedProduct: number;
    isMobile: boolean;
    categories: string[];
};

export type Titem = {
	name: string;
	price: string;
	description: string;
	promo: boolean;
	img: number;
    desclong: string;    
    slides: number;
    rating: number;
};

// type Tinitial = {
// 	type: typeof initialSetup;
// 	payload: [Titem[], string[]];
// };

export type TremoveCart = {
	type: typeof removeCart;
	payload: number;
};

export type TcartItem = {
	name: string;
	price: string;
	img: number;
    promo: boolean;
};

export const addToCartAction = (e: Titem) => {
    return (dispatch: Dispatch, getState: () => Tstate) => {
        const s = getState();
        const a: any = [...s.cartList];
        a.push({
          name: e.name.slice(2, e.name.length),
          price: e.promo ? parseFloat(e.price) * 0.8 : e.price,
          img: e.img,
          promo: e.promo,
        })
        dispatch({type:ACTIONS.addCart, payload: a})
    }
}

type TcartModal = {
	type: typeof cartModal;
	payload: boolean;
};

type Tcart = {
	type: typeof addCart;
	payload: TcartItem[];
};

type TmobileDetect = {
    type: typeof mobileDetect,
    payload: boolean,
}

type TselectProduct = { type: typeof selectProduct; payload: number };

export type Tactions =
    | Tcart
	| TcartModal
    | TremoveCart
    | TmobileDetect
	| TselectProduct;
