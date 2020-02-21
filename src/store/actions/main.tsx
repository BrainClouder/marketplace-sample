export const initialSetup: string = 'INITIAL-SETUP';
export const addCart: string = 'ADD-TO-CART';
export const removeCart: string = 'REMOVE-CART-ITEM';
export const cartModal: string = 'CART-MODAL-TOGGLE';

export const ACTIONS = {
    initialSetup, addCart, cartModal, removeCart
}

export type Tstate = {
    itemList: Titem[];
    cartList: TcartItem[];    
    cartToggle: boolean;
}

export type Titem = {
    name: string;
    price: string;
    description: string;
    promo: boolean;
    img: number;
    desclong: string;
};

type Tinitial = {
	type: typeof initialSetup;
    payload: Titem[];
};

export type TremoveCart = {
    type: typeof removeCart,
    payload: number
}

export type TcartItem = {
    name: string;
    price: string;
    img: number;
    promo: boolean;
}

type TcartModal = {
    type: typeof cartModal;
    payload: boolean;
}

type Tcart = {
    type: typeof addCart;
    payload: TcartItem[];
}



export type Tactions = Tinitial | Tcart | TcartModal | TremoveCart;