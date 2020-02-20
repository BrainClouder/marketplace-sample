export const initialSetup: string = 'INITIAL-SETUP';


export const ACTIONS = {
    initialSetup,
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



export type Tactions = Tinitial;