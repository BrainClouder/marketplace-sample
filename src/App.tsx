import React, { useState } from 'react';
import './css/tailwind.css';
import './css/main.css';

const App = () => {
  const [selected, Select] = useState(-1);
  const [category, setCateg] = useState({ mode: -1, item: '' });
  const [cartList, setCart] = useState({ itemList: [''], prices: [0] })

  const returnRandom = (e: number) => {
    return Math.floor(Math.random() * e)
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
  const [itemSeed] = useState(() => {
    const a = [];
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
    return a;
  })

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

  return (
    <div className="text-center bg-gray-200 subpixel-antialiased">
      <div>
        {/* <button>🛒</button>{cartList.itemList.length > 1 ? <span>{cartList.itemList.length - 1} items, ${cartList.prices.reduce((a: number, b: number) => a + b)}</span> : ''} */}
      </div>
      <div>
        {ater.map((e: string) => <button className={`text-2xl p-2`} onClick={() => setCateg({ mode: 0, item: e })} key={e} >{e}</button>)}
        <button className={`px-2 py-1 text-white font-bold rounded-full ${category.mode === 1 ? 'bg-black' : ' bg-red-700'}`} onClick={() => setCateg({ mode: 1, item: 'OFFER' })}>OFFER</button>
      </div>
      <div>
        {category.item.length > 0 ? <>{category.item}<button onClick={() => setCateg({ mode: -1, item: '' })} className={`px-2 py-1`}>x</button></> : ''}
      </div>
      <div className={`flex flex-wrap flex-row justify-center`}>
        {itemSeed.map((e: any, i: any) => {
          const v = filterVerify(e);
          if (v) {
            const active = selected === i;
            const upPrice = e.promo ? <><span className="line-through text-red-400 opacity-50">${e.price}</span> ${(e.price * 0.8).toFixed(2)}</> : '$' + e.price;
            return <div className={`flex flex-col m-1 justify-center`} key={i + e.name}>
              <div>
                <div onClick={() => active ? Select(-1) : Select(i)} className={`p-2 m-2 relative div-animate bg-center bg-cover flex flex-col justify-around ${active ? 'absolute' : ''} 
          cursor-pointer text-gray-200 rounded-lg w-auto ${active ? '' : ''}
          inline-block`} style={{
                    transition: "500ms", width: active ? '0' : '200px', height: active ? '0' : '200px', backgroundImage: `url(https://picsum.photos/${e.img}/${e.img})`,
                    transform: `scale(${active ? 0 : 1})`
                  }}>
                  <div className={`${active ? 'invisible' : 'visible'} bg-black opacity-50 absolute top-0 left-0 w-full h-full`} style={{ zIndex: 0 }}></div>
                  <div className={`${active ? 'invisible' : 'visible'}`} style={{ zIndex: 1 }}>
                    <p className={`icon-cat`}>{e.name.slice(0, 2)}</p>
                    <p className={`${txtHover} text-md font-bold`}>{e.name.slice(2, e.name.length)}</p>
                    <p className={`${txtHover}`}>{upPrice}</p>
                    <p className={`${txtHover} text-xs`}>{e.description}</p>
                  </div>
                </div>
              </div>
              <div className={`flex flex-col inline-block ${active ? 'visible' : 'invisible'} relative`}>
                <div><button className={`px-2 absolute py-1 bg-red-600 text-white font-bold`} style={{ top: "-5px", right: "-5px", zIndex: 2 }} onClick={() => Select(-1)}>X</button></div>
                <div className={`bg-white flex flex-col justify-center shadow rounded-lg p-4 m-2 ${active ? 'visible' : 'invisible absolute'}`}
                  style={{ transition: '500ms', width: active ? '300px' : '0px', opacity: active ? 1 : 1, transform: `scale(${active ? 1 : 0})`, zIndex: 1 }}>
                  <img className={`rounded-full mx-auto m-2`} width={150} height={150} src={`https://picsum.photos/${e.img}/${e.img}`} />
                  <p>{upPrice}</p>
                  <p className={`text-sm`}>{e.desclong}</p>
                  <button className={`bg-green-600 text-white font-bold p-1 rounded-lg m-1`}
                    onClick={() => {
                      const a: any = cartList;
                      a.itemList.push(e.name);
                      a.prices.push(e.promo ? e.price * 0.8 : e.price);
                      setCart(a);
                    }}>Add to cart 🛒</button>
                  <button className={`bg-red-600 text-white font-bold p-1 rounded-lg m-1 w-auto inline-block`}>Buy now</button>
                </div>
              </div>
            </div>
          }
        })}
      </div>
    </div>
  );
}

export default App;
