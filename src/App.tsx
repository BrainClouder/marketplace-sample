import React, { useState, useEffect } from 'react';
import './css/tailwind.css';
import './css/main.css';
import FooterCred from './components/FooterCredit';
import { connect } from 'react-redux';
import { Titem, ACTIONS, TcartItem } from './store/actions/main';
import { Dispatch } from 'redux';
import CartModal from './components/CartModal';
import ProductModal from './components/ProductModal';
import Ranking from './components/util/Rank';



interface Iapp {
  items: Titem[];
  cartList: TcartItem[];
  openModal: boolean;
  selected: number;
  isMobile: boolean;
  categories: string[];
  openCartModal: () => void;
  Select: (e: number) => void;
  setMobileDetector: (e: boolean) => void;
}

const App: React.FC<Iapp> = ({ items, openModal, cartList, categories,
  openCartModal, Select, selected, setMobileDetector, isMobile }) => {
  const [category, setCateg] = useState({ mode: -1, item: '' });
  const resizeHandler = () => {
    setMobileDetector(window.innerWidth < 600);
  }
  useEffect(() => {
    window.addEventListener('resize', resizeHandler)
    return () => {
      window.removeEventListener('resize', resizeHandler);
    }
  }, []);

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
  const txtHover = '';
  const totalPriceCart = cartList.length >= 1 ? cartList.map((e: TcartItem) => parseFloat(e.price)) : [0];
 
  const itemsToFilter = () => {
    const a = [];
    for (const i in items) {
      if (i) {
        const e = items[i];
        const v = filterVerify(e);
        if (v) {
          a.push([e, i]);
        }
      }
    }
    return a;
  }
  const itemsFiltered = itemsToFilter();
  itemsFiltered.sort((a: any, b: any) => a[0].rating > b[0].rating ? -1 : 1)
  itemsFiltered.sort((a: any) => a[0].promo ? -1 : 1);
  itemsFiltered.sort((a: any, b: any) => {
    if (a[0].promo || b[0].promo) {
      return 0
    } else {
      return a[0].rating > b[0].rating ? -1 : 1;
    }
  });


  return (<>
    <div className={`text-center subpixel-antialiased`}>
      <div>
        <button onClick={() => {
          if (cartList.length >= 1) openCartModal();
          Select(-1);
        }}><span role="img" aria-label="cartcar">🛒</span>
        </button>{cartList.length >= 1 ? <span>
          {cartList.length} items, ${(totalPriceCart.reduce((a: number, b: number) => a + b)).toFixed(2)}</span> : ''}
      </div>
      <div style={{ marginTop: '50px' }}>
        {categories.map((e: string) => <button className={`text-2xl p-2`} onClick={() => setCateg({ mode: 0, item: e })} key={e} >{e}</button>)}
        <button className={`px-2 py-1 text-white font-bold rounded-full 
        ${category.mode === 1 ? 'bg-black' : ' bg-red-700'}`} onClick={() => setCateg({ mode: 1, item: 'OFFER' })}>OFFER</button>
      </div>
      <div>
        {category.item.length > 0 ? <><span role={category.item !== 'OFFER' ? 'img' : ''}>{category.item}</span><button onClick={() => setCateg({ mode: -1, item: '' })}
          className={`px-2 py-1`}>x</button></> : ''}
      </div>
      <div className={`flex m-4 ${isMobile ? 'flex-col' : 'flex-wrap flex-row justify-center'}`}
        style={{
          filter: `blur(${selected !== -1 || openModal ? 4 : 0}px)`
        }}>
        {itemsFiltered.map((ar: any, i: number) => {
          const e = ar[0];
          const iRef = ar[1];
          const active = selected === iRef;
          const pair = i % 2 === 0;
          const upPrice = e.promo ? <div className="flex flex-col justify-center">
            <span className="line-through text-red-600">${e.price}
            </span>
            <span className={`text-xl`} style={{marginTop: '-5px'}}>${(e.price * 0.8).toFixed(2)}</span>
          </div> : '$' + e.price;
          return <div onClick={() => {
            window.scrollTo(0,0);
            Select(iRef);
          }} className={`flex flex-col m-2 justify-center`} key={i + e.name}>
            <div className={`relative bg-center bg-cover text-gray-800 p-2
                flex flex-col justify-center cursor-pointer rounded-lg 
                text-gray-200 w-auto inline-block`}
              style={{
                transition: "500ms", width: isMobile ? 'auto' : '220px', height: isMobile ? '120px' : '250px',
                backgroundImage: (isMobile ? pair ?
                  'linear-gradient(to right, rgba(255,255,255,0.7), rgba(255,255,255,0.9)' :
                  'linear-gradient(to left, rgba(255,255,255,0.7), rgba(255,255,255,0.9)'
                  : `linear-gradient(to bottom, #fff, #eee)`), transform: `scale(${active ? 0.5 : 1})`,
                opacity: active ? 0.4 : 0.98,
              }}>
              <div className={`flex ${isMobile ? `flex-row${pair ? '-reverse' : ''} justify-around` :
                'flex-col-reverse'} ${active ? 'invisible' : ''}`}
                style={{
                  zIndex: 1
                }}>
                <div className={`m-2 relative ${isMobile ? 'flex flex-col justify-center' : ''}`}>
                  <p className={`${txtHover} text-sm font-bold p-1`}>{e.name.slice(2, e.name.length)}</p>
                  <Ranking rate={e.rating}/>
                  {upPrice}
                  {/* {isMobile ? '' : <p className={`${txtHover} text-xs`}>{e.description}</p>} */}
                </div>
                <div className={`relative flex flex-col justify-center`}>
                  <div className={`bg-center bg-cover ${isMobile ? '' : 'mx-auto'}`}
                    style={{
                      height: '90px', width: "90px",
                      backgroundImage: `url(https://picsum.photos/${e.img}/${e.img})`
                    }}></div>
                </div>
              </div>
            </div>

          </div>

        })}
      </div>
    </div>
    {selected !== -1 ? <ProductModal /> : ''}
    <FooterCred />
    {openModal ? <CartModal /> : ''}
  </>
  );
}
const mapStateToProps = (state: any) => {
  const t = state;
  return {
    items: t.itemList,
    cartList: t.cartList,
    openModal: t.cartToggle,
    selected: t.selectedProduct,
    isMobile: t.isMobile,
    categories: t.categories,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openCartModal: () => dispatch({ type: ACTIONS.cartModal, payload: true }),
    Select: (e: number) => dispatch({ type: ACTIONS.selectProduct, payload: e }),
    setMobileDetector: (e: boolean) => dispatch({ type: ACTIONS.mobileDetect, payload: e })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
