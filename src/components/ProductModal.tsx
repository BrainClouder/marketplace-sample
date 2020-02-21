import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Tstate, ACTIONS, Titem, addToCartAction, TcartItem } from '../store/actions/main';
import { Dispatch } from 'redux';
import Ranking from './util/Rank';

interface IproductModal {
    selected: number;
    items: Titem[];
    isMobile: boolean;
    AddCart: (e: Titem) => void;
    Select: (e: number) => void;
    openCartModal: () => void;
}

const ProcuctModal: React.FC<IproductModal> = ({ selected, items, Select, isMobile, AddCart, openCartModal }) => {
    const [productSlide, setSlide] = useState(0);    
    useEffect(() => {
        window.addEventListener('click', clickHandler);
        return () => {
            window.removeEventListener('click', clickHandler);
        }
    }, []);
    
    const clickHandler = (event: any) => {
        if ([...event.explicitOriginalTarget.classList].indexOf('parent') !== -1) {
            Select(-1);
        }
    }


    const slider: number[] = [];
    for (let i = 0; i < items[selected].slides; i++) {
        slider.push(i);
    }
    const e = items[selected];
    const upPrice = e.promo ? <div className="flex flex-col justify-center">
        <span className="line-through text-red-600">${e.price}
        </span>
        <span className={`text-xl`} style={{ marginTop: '-5px' }}>${(parseFloat(e.price) * 0.8).toFixed(2)}</span>
    </div> : '$' + e.price;
    return (<>
    <div className="fixed w-screen h-screen top-0 left-0 parent"></div>
    <div className={`window-appear`}>
                <div
                    className={`absolute p-2`}
                    style={{
                        zIndex: 3,
                        top: '13vh',
                        left: (1 - (isMobile ? 300 : 500) / window.innerWidth) * 50 + 'vw',
                    }}
                >
                    <div>
                        <button
                            className={`px-2 absolute py-1 bg-red-600 text-white font-bold`}
                            style={{ top: '-5px', right: '-5px', zIndex: 2 }}
                            onClick={() => Select(-1)}
                        >
                            X
						</button>
                    </div>
                    <div
                        className={`text-center 
                        bg-white flex flex-col justify-center shadow rounded-lg p-4 m-2 `}
                        style={{
                            transition: '200ms',
                            width: isMobile ? '300px' : '500px',                           
                            zIndex: 1,
                        }}
                    >
                        <div>
                            <span role="img" aria-label="category">
                                {e.name.slice(0, 2)}
                            </span>
                        </div>
                        <div
                            className={`rounded-lg mx-auto m-2 bg-center bg-cover`}
                            style={{
                                height: isMobile ? '150px' : '200px',
                                width: isMobile ? '150px' : '400px',
                                backgroundImage: `url(https://picsum.photos/${e.img +
                                    100 +
                                    2 * productSlide}/${e.img + 100 + 2 * productSlide}`,
                            }}
                        />
                        <div className={`flex flex-row justify-center`}>
                            {slider.map((a: number) =>
                                <div
                                    onClick={() => setSlide(a)}
                                    className={`${a === productSlide
                                        ? 'bg-indigo-400'
                                        : 'bg-orange-500 hover:bg-orange-200'} 
                m-1 cursor-pointer rounded-full transform transition duration-200 hover:scale-125`}
                                    style={{ width: '15px', height: '15px' }}
                                />,
                            )}
                        </div>

                        <p>
                            {e.name.slice(2, e.name.length)}
                        </p>
                        <div className="p-2">
                            <Ranking rate={e.rating} scaler={4} />
                        </div>
                        {upPrice}
                        <p className={`text-sm m-2`}>
                            {e.desclong}
                        </p>
                        <div className={`flex flex-row justify-around`}>
                            <button
                                className={`bg-green-600 text-white w-auto font-bold
                                 py-1 px-2 rounded-lg m-1`}
                                onClick={() => {
                                    AddCart(e);
                                }}
                            >
                                Add to cart{' '}
                                <span role="img" aria-label="cartcar">
                                    🛒
								</span>
                            </button>
                            <button
                                onClick={() => {
                                    AddCart(e);
                                    Select(-1);
                                    openCartModal();
                                }}
                                className={`bg-red-600 text-white font-bold py-1 px-2 rounded-lg m-1 w-auto inline-block`}
                            >
                                Buy now
							</button>
                        </div>
                    </div>
                </div>
            </div>
            </>
    );
};

const mapStateToProps = (state: Tstate) => {
    const t = state;
    return {
        items: t.itemList,
        selected: t.selectedProduct,
        isMobile: t.isMobile,
    };
};

const mapDispatchToProps = (dispatch: Dispatch | any) => {
    return {
        Select: (e: number) => dispatch({ type: ACTIONS.selectProduct, payload: e }),
        AddCart: (e: Titem) => dispatch(addToCartAction(e)),
        openCartModal: () => dispatch({ type: ACTIONS.cartModal, payload: true }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProcuctModal);
