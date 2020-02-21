import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Tstate, ACTIONS, TcartItem } from '../store/actions/main';


interface TCartModal {
    cartList: TcartItem[];
    toggle: () => void;
    remove: (e: number) => void;
}

const CartModal: React.FC<TCartModal> = ({ cartList, toggle, remove }) => {
    useEffect(() => {
        window.addEventListener('click', clickHandler);
        return () => {
            window.removeEventListener('click', clickHandler);
        }
    }, []);
    
    const clickHandler = (event: any) => {
        if ([...event.explicitOriginalTarget.classList].indexOf('parent') !== -1) {
            toggle();
        }
    }
    if (cartList.length <= 0) toggle();
    const sumTotal = cartList.map((e: any) => e.promo ? parseFloat(e.price) * 0.8 : parseFloat(e.price));
    const total = cartList.length > 0 ? sumTotal.reduce((a: number, b: number) => a + b) : 0;
    const promo = [];
    for (let i in cartList) {
        if (cartList[i].promo) {
            promo.push(parseFloat(cartList[i].price) * 0.2);
        }
    }
    const totalPromo = promo.length >= 1 ? promo.reduce((a: number, b: number) => a + b) : 0;
    console.log(totalPromo);
    return (<>
        <div className={`fixed top-0 left-0 w-screen h-screen parent text-gray-800`} style={{ zIndex: 1 }}>
        </div>
        <div className="absolute top-0 left-0 w-screen">
        <div className="relative mx-auto bg-gray-100 text-gray-800 p-2 text-center rounded-lg" style={{ width: '50vw', marginTop: '100px', zIndex: 1 }}>
                <p className={`font-bold text-sm p-2`}>Your cart</p>
                <div className={`flex flex-col justify-center max-w-sm mx-auto`}>
                    <div className={`flex flex-row justify-center font-bold text-gray-700`}>
                        <p className={`w-1/2`}>product name</p>
                        <p className={`w-1/2`}>price</p>
                    </div>
                    {cartList.map((e: TcartItem, i: number) =>
                        <div style={{
                            height: '50px'
                        }}
                            className={`flex flex-row
                            justify-center relative`} key={e.img + i}>
                            <div className={`absolute ${i % 2 === 0 ? 'bg-gray-300' : 'bg-gray-400'} rounded-l-full`} style={{ left: "-50px" }}>
                                <img className={`p-2 rounded-full`} src={`https://picsum.photos/${e.img}/${e.img}`} alt="product img" style={{ height: "50px", width: "50px" }} />
                            </div>
                            <div className={`p-2 flex flex-col justify-center text-sm w-1/2 ${i % 2 === 0 ? 'bg-gray-300' : 'bg-gray-400'}`}>
                                <p>{e.name}</p>
                            </div>
                            <div className={`p-2 flex flex-col justify-center w-1/2 rounded-r-full ${i % 2 === 0 ? 'bg-gray-300' : 'bg-gray-400'}`}>
                                <p>${parseFloat(e.price).toFixed(2)}</p>
                            </div>
                            <div 
                            className="absolute right-0 px-2 h-full text-white font-bold rounded-r-full flex flex-col justify-center">
                                <button className="px-4 py-2 bg-red-400 rounded-full" onClick={() => remove(i)}>X</button>
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    <p>total: ${total.toFixed(2)}</p>
                    {totalPromo !== 0 ? <p className="text-xs text-red-500">You're saving ${totalPromo.toFixed(2)}</p> : ''}
                </div>
                <button onClick={() => alert('to be implemented 😁')} className={`px-4 m-2 rounded-lg transition duration-500 transform py-2 font-bold text-white bg-gray-900 hover:bg-gray-500 hover:scale-125`}>check out</button>
            </div>
        </div>
    </>
    );
}
const mapStateToProps = (state: Tstate) => {
    const t = state;
    return {
        cartList: t.cartList,
    }
}


const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        toggle: () => dispatch({ type: ACTIONS.cartModal, payload: false }),
        remove: (e: number) => dispatch({ type: ACTIONS.removeCart, payload: e }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartModal);