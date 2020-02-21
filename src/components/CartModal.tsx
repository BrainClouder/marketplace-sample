import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Tstate, ACTIONS, TcartItem } from '../store/actions/main';


interface TCartModal {
    cartList: TcartItem[];
    alive: boolean;
    toggle: () => void;
    remove: (e: number) => void;
}

const CartModal: React.FC<TCartModal> = ({ cartList, alive, toggle, remove }) => {

    const clickHandler = (event: any) => {
        if ([...event.explicitOriginalTarget.classList].indexOf('parent') !== -1) {
            toggle();
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickHandler);
        return () => {
            window.removeEventListener('click', clickHandler);
        }
    }, []);
    if (cartList.length <= 0) toggle();
    const sumTotal = cartList.map((e: any) => e.promo ? parseFloat(e.price)*0.8 : parseFloat(e.price));
    const total = cartList.length > 0 ? sumTotal.reduce((a: number, b: number) => a+b) : 0;
    const promo = [];
    for (let i in cartList) {
        if (cartList[i].promo) {
            promo.push(parseFloat(cartList[i].price)*0.2);
        }
    }
    const totalPromo = promo.length >= 1 ? promo.reduce((a: number, b: number) => a + b) : 0;
    
    return (<>
        <div className={`absolute top-0 left-0 w-screen h-screen parent`} style={{ zIndex: 5 }}>
            <div className="relative mx-auto bg-gray-100 p-2 text-center rounded-lg" style={{ width: '50vw', marginTop: '100px' }}>
                <p>Your item list</p>
                <div className={`flex flex-col justify-center max-w-sm mx-auto`}>
                    {cartList.map((e: TcartItem, i: number) =>
                        <div style={{
                            height: '50px'
                        }}
                            className={`flex flex-row justify-around`} key={e.img + i}>
                            <div className="flex flex-col justify-center">
                                <img src={`https://picsum.photos/${e.img}/${e.img}`} style={{ height: "50px", width: "50px" }} />
                            </div>
                            <div className={`p-2 flex flex-col justify-center ${i % 2 === 0 ? 'bg-gray-300' : 'bg-gray-400'}`}>
                                <p>{e.name}</p>
                            </div>
                            <div className={`p-2 flex flex-col justify-center ${i % 2 === 0 ? 'bg-gray-300' : 'bg-gray-400'}`}>
                                <p>{parseFloat(e.price).toFixed(2)}</p>
                            </div>
                            <div className="p-2 flex flex-col justify-center bg-red-400 px-2">
                                <button onClick={() => remove(i)}>X</button>
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    <p>total: ${total.toFixed(2)}</p>
                    {totalPromo !== 0 ? <p className="text-xs text-red-500">You're saving ${totalPromo.toFixed}</p> : ''}
                </div>
                <button>check out</button>
            </div>
        </div>
    </>
    );
}
const mapStateToProps = (state: Tstate) => {
    const t = state;
    return {
        cartList: t.cartList,
        alive: t.cartToggle,
    }
}


const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        toggle: () => dispatch({ type: ACTIONS.cartModal, payload: false }),
        remove: (e: number) => dispatch({ type: ACTIONS.removeCart, payload: e })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartModal);