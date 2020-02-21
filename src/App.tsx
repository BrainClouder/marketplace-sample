import React, { useState, useEffect } from 'react';
import './css/tailwind.css';
import './css/main.css';
import FooterCred from './components/FooterCredit';
import { connect } from 'react-redux';
import { Titem, ACTIONS, TcartItem } from './store/actions/main';
import { Dispatch } from 'redux';
import CartModal from './components/CartModal';



interface Iapp {
  items: Titem[];
  cartList: TcartItem[];
  openModal: boolean;
  setItem: (e: Titem[]) => void;
  addToCart: (e: TcartItem) => void;
  openCartModal: () => void;
}

const App: React.FC<Iapp> = ({ items, openModal, setItem, addToCart, cartList, openCartModal }) => {
  const [selected, Select] = useState(-1);
  const [category, setCateg] = useState({ mode: -1, item: '' });
  const [isMobile, setMobileDetector] = useState(window.innerWidth < 500);
  const [productSlide, setSlide] = useState(0);
  const returnRandom = (e: number) => {
    return Math.floor(Math.random() * e)
  }
  const filterVerify = (e: any) => {
    switch (category.mode) {
      case 0:
        return e.name.slice(0, 2) === category.item;
      case 1:
        return e.promo;
      default:
        return true;
    }
  }
  const firstName = ['🎧Headset', '🖱Mouse', '🍷Wine', '👞Boots', '🛸Spaceship', '🕶X-ray glasses', '🛠Hammer', '🛠Screwdriver', '🎸Electric Guitar'];

  const nameRandomizer = () => {
    const secondName = ['slim', 'compact', 'special', 'deluxe', 'plus', 'mega'];
    const brandName = ['macrosuft', 'ipear', 'giordanno', 'volvet', 'raize'];
    const q1 = ['innovative', 'premium', 'awesome', 'regular', 'provoking', 'audacious'];
    const q2 = ['lifestyle', 'disruptive ideas', 'office', 'house']
    const q3 = ['disruptive', 'straightforward', 'simple'];
    const desc = [`If this ${q1[returnRandom(q1.length)]} product fits well with your ${q2[returnRandom(q2.length)]}, dont wait any time! Buy it now!`,
    `Check out this ${q3[returnRandom(q3.length)]} and ${q1[returnRandom(q1.length)]} product!`]
    const nameSelect = firstName[returnRandom(firstName.length)];
    const modelName = secondName[returnRandom(secondName.length)];
    const brand = brandName[returnRandom(brandName.length)];
    const desclong = `This ${nameSelect.slice(2, nameSelect.length)} is a perfect model of ${q1[returnRandom(q1.length)]} ${q2[returnRandom(q2.length)]} for the current era. Order it now!
    Only model ${modelName} is available! Acquire this ${q3[returnRandom(q3.length)]} product today!`

    return [`${nameSelect} ${modelName} ${brand}`, desc[returnRandom(desc.length)], desclong];
  }
  const slider: number[] = [];
  for (let i = 0; i < 5; i++) {
    slider.push(i);
  }
  const addToCartHandler = (e: any) => {
    const a: any = [...cartList];
    a.push({
      name: e.name.slice(2, e.name.length),
      price: e.promo ? parseFloat(e.price) * 0.8 : e.price,
      img: e.img,
      promo: e.promo,
    })
    addToCart(a);
  }

  const optWindowConstructor = () => {
    const e = items[selected];
    const active = true;
    const upPrice = e.price;
    return (
      <div>
        <div className={`window-appear`}>
          <div className={`${active ? 'visible' : 'invisible'} fixed p-2`} style={{ zIndex: 3, top: '13vh', left: (1 - (isMobile ? 300 : 500) / window.innerWidth) * 50 + 'vw' }}>
            <div>
              <button className={`px-2 absolute py-1 bg-red-600 text-white font-bold`}
                style={{ top: "-5px", right: "-5px", zIndex: 2 }} onClick={() => Select(-1)}>X
            </button>
            </div>
            <div className={`text-center bg-white flex flex-col justify-center shadow rounded-lg p-4 m-2 
          ${active ? '' : 'invisible absolute'}`}
              style={{
                transition: '200ms', width: active ? isMobile ? '300px' : '500px' : '0px',
                opacity: active ? 1 : 1, transform: `scale(${active ? 1 : 0})`, zIndex: 1
              }}>

              <div><p>{e.name.slice(0, 2)}</p></div>
              <div className={`rounded-lg mx-auto m-2 bg-center bg-cover`}
                style={{
                  height: isMobile ? '150px' : '200px', width: isMobile ? '150px' : '400px',
                  backgroundImage: `url(https://picsum.photos/${e.img + 100 + 2 * productSlide}/${e.img + 100 + 2 * productSlide}`
                }}></div>
              <div className={`flex flex-row justify-center`}>
                {slider.map((a: number) => <div onClick={() => setSlide(a)} className={`${a === productSlide ? 'bg-indigo-400' : 'bg-orange-500 hover:bg-orange-200'} 
                m-1 cursor-pointer rounded-full transform transition duration-200 hover:scale-125`} style={{ width: '15px', height: '15px' }}></div>)}
              </div>

              <p>{e.name.slice(2, e.name.length)}</p>
              <p>{upPrice}</p>
              <p className={`text-sm`}>{e.desclong}</p>
              <div>
                <button className={`bg-green-600 text-white w-auto font-bold py-1 px-2 rounded-lg m-1`}
                  onClick={() => {
                    addToCartHandler(e);
                  }}>Add to cart 🛒</button>
                <button onClick={() => {
                  addToCartHandler(e);
                  Select(-1)
                  openCartModal();

                }}
                  className={`bg-red-600 text-white font-bold py-1 px-2 rounded-lg m-1 w-auto inline-block`}>Buy now</button>
              </div>
            </div>
          </div>
        </div>
      </div>)
  }
  const resizeHandler = () => {
    setMobileDetector(window.innerWidth < 500);
  }
  useEffect(() => {
    window.addEventListener('resize', resizeHandler)
    return () => {
      window.removeEventListener('resize', resizeHandler);
    }
  }, []);

  const cat = [];
  for (let i in firstName) {
    // console.log(i)
    if (i) {
      cat.push(firstName[i].slice(0, 2));
    }
  }
  const cater: any = new Set(cat);
  const ater = [...cater];
  const txtHover = '';
  const a: Titem[] = [];
  if (items.length <= 1) {
    for (let i = 0; i < 50; i++) {
      const exe = nameRandomizer();
      a.push({
        name: exe[0],
        price: (Math.random() * 400 + 50).toFixed(2),
        description: exe[1],
        promo: Math.random() > 0.8,
        img: Math.floor(Math.random() * 100 + 100),
        desclong: exe[2]
      });
    }
    setItem(a);
  }
  const totalPriceCart = cartList.length >= 1 ? cartList.map((e: TcartItem) => parseFloat(e.price)) : [0];
  const itemsFiltered: any = [];
  items.map((e: Titem, i) => {
    const v = filterVerify(e);
    if (v) {
      itemsFiltered.push([e, i]);
    }
  })

  return (<>
    <div className={`text-center subpixel-antialiased`} style={{ filter: `blur(${openModal ? '4px' : 0})` }}>
      <div>
        <button onClick={() => {
          if (cartList.length >= 1) openCartModal();
          Select(-1);
        }}>🛒
        </button>{cartList.length >= 1 ? <span>
          {cartList.length} items, ${(totalPriceCart.reduce((a: number, b: number) => a + b)).toFixed(2)}</span> : ''}
      </div>
      <div style={{ marginTop: '50px' }}>
        {ater.map((e: string) => <button className={`text-2xl p-2`} onClick={() => setCateg({ mode: 0, item: e })} key={e} >{e}</button>)}
        <button className={`px-2 py-1 text-white font-bold rounded-full 
        ${category.mode === 1 ? 'bg-black' : ' bg-red-700'}`} onClick={() => setCateg({ mode: 1, item: 'OFFER' })}>OFFER</button>
      </div>
      <div>
        {category.item.length > 0 ? <>{category.item}<button onClick={() => setCateg({ mode: -1, item: '' })}
          className={`px-2 py-1`}>x</button></> : ''}
      </div>
      <div className={`flex m-4 ${isMobile ? 'flex-col' : 'flex-wrap flex-row justify-center'}`} >
        {itemsFiltered.map((ar: any, i: number) => {
          const e = ar[0];
          const iRef = ar[1];
          const active = selected === i;
          const pair = i % 2 === 0;
          const upPrice = e.promo ? <>
            <span className="line-through text-red-400 opacity-50">${e.price}
            </span> <span className={`text-xl`}>${(e.price * 0.8).toFixed(2)}</span>
          </> : '$' + e.price;
          return <div className={`flex flex-col m-2 justify-center`} key={i + e.name}>
            <div>
              <div className={`relative div-animate bg-center bg-cover 
                flex flex-col justify-center  cursor-pointer rounded-lg 
                text-gray-200 w-auto inline-block`} style={{
                  transition: "500ms", width: isMobile ? 'auto' : '250px',
                  height: isMobile ? '120px' : '250px',
                  backgroundImage: (isMobile ? pair ? 'linear-gradient(to left, rgba(0,0,0,0.7), rgba(0,0,0,0.9))' :
                    'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.9))'
                    : ``), transform: `scale(${active ? 0.7 : 1})`,
                  opacity: active ? 0.4 : 0.98,
                }}>

                {isMobile ? '' : <><div className={`${active ? 'invisible' : 'visible'} 
                  absolute top-0 left-0 rounded-lg w-full h-full bg-center bg-cover`}
                  style={{ transition: "500ms", width: isMobile ? 'auto' : '250px',
                  height: isMobile ? '120px' : '250px',
                  backgroundImage: (isMobile ? pair ? 'linear-gradient(to left, rgba(0,0,0,0.7), rgba(0,0,0,0.9))' :
                    'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.9))'
                    : `url(https://picsum.photos/${e.img}/${e.img})`), transform: `scale(${active ? 0.7 : 1})`,
                  opacity: active ? 0.4 : 0.7 }}>
                </div>
                <div className={`${active ? 'invisible' : 'visible'} 
                  bg-black opacity-50 absolute top-0 left-0 rounded-lg w-full h-full`}
                  style={{ zIndex: 0 }}>
                </div></>}
                <div className={`flex ${isMobile ? `flex-row${pair ? '-reverse' : ''} justify-around` : 'flex-col-reverse'}
                  ${active ? 'invisible' : ''}`} style={{ zIndex: 1 }}>
                  <div className={`icon-cat flex flex-col justify-center`}>
                      <div className={`m-2`}>
                    <p className={`px-2 bg-gray-500 w-auto inline-block rounded-full text-black`}>
                    <span className="invisible">a</span>{e.name.slice(0, 2)}<span className="invisible">a</span></p>
                      </div>
                    <div className={`flex flex-row justify-center`}>
                      <button onClick={() => addToCartHandler(e)} className={`px-2 py-1 bg-green-700 hover:bg-green-500 rounded-l-lg my-1`}>
                        🛒
                      </button>
                      <button onClick={() => {
                        addToCartHandler(e);
                        Select(-1)
                        openCartModal();
                      }} className={`px-2 py-1 bg-red-700 hover:bg-red-500 rounded-r-lg my-1`}>
                        Buy
                      </button>
                    </div>
                  </div>
                  <div onClick={() => Select(iRef)} className={`relative flex flex-col justify-center p-2`}>
                    {isMobile ? <div className={`bg-center bg-cover m-1 p-1`} style={{ height: '90px', width: "90px", backgroundImage: `url(https://picsum.photos/${e.img}/${e.img})` }}></div> : ''}
                  </div>
                  <div className={`m-2 relative ${isMobile ? 'flex flex-col justify-center' : ''}`}>
                    <p className={`${txtHover} text-md font-bold`}>{e.name.slice(2, e.name.length)}</p>
                    <p className={`${txtHover}`}>{upPrice}</p>
                    {isMobile ? '' : <p className={`${txtHover} text-xs`}>{e.description}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>

        })}
      </div>
    </div>
    {selected !== -1 ? optWindowConstructor() : ''}
    <FooterCred />
    {openModal ? <CartModal /> : ''}
    {/* <div className={`bg-gray-200 w-screen h-screen fixed top-0 left-0`} style={{zIndex: -1}}></div> */}
  </>
  );
}
const mapStateToProps = (state: any) => {
  const t = state;
  return {
    items: t.itemList,
    cartList: t.cartList,
    openModal: t.cartToggle,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openCartModal: () => dispatch({ type: ACTIONS.cartModal, payload: true }),
    setItem: (e: Titem[]) => dispatch({ type: ACTIONS.initialSetup, payload: e }),
    addToCart: (e: TcartItem) => dispatch({ type: ACTIONS.addCart, payload: e }),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
