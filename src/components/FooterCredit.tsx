import React, { useState } from 'react';
import gitLight from '../imgs/png/gitHubLight.png';
import soLogo from '../imgs/svg/so-icon.svg';
import lnLogo from '../imgs/png/lnIcon.png';
import { connect } from 'react-redux';
import { Tstate } from '../store/actions/main';

interface Ifooter {
    cartToggle: boolean;
}

const FooterCred: React.FC<Ifooter> = ({cartToggle}) => {
    const [clicked, setClick] = useState(false);

    const [waterSeed] = useState(() => {
        const a = [];
        for (let i = 0; i < 50; i++) {
            // const seeder = Math.floor(Math.random() * 75) + 25;
            const seeder = 100;
            a.push(seeder);
        }
        return a;
    })


    return (<>
        <div className={`absolute top-0 left-0`} style={{ zIndex: -1 }}>
            <div className="fixed" style={{ left: '-200px', top: '-15px' }}>
                <div>

                </div>
                {waterSeed.map((e: number, i: number) => {
                    return (
                        <div className="wave-animate absolute" key={e + i + 'bg'} style={{ left: 200 * i + 'px' }}>
                        </div>
                    )
                })}
                <div className={`fixed bottom-0 left-0 right-0 water-blue`} style={{ top: '115px', zIndex: -2, opacity: 0.9 }}>

                </div>
            </div>
                
        </div>
        {/* <div className="">
                {bubbles.map((e: number[]) => <div className={`fixed rounded-full bg-white`} style={{zIndex: -1, height: '5px', width: '5px', top: e[0]*80 + 20 - (e[0] * e[1] * scrollY/100) + 'vh', left: e[1]*80 + 10 + "vw"}}></div>)}
            </div> */}

        <div className={`fixed top-0 left-0 w-screen`}>
            <div className={`relative mx-auto ${clicked ? 'footer-clicked' : ''}`}>
                <div className={`w-auto inline-block mx-auto flex flex-row justify-center ${clicked? 'visible' : 'invisible'}`}>
                    <div className="flex flex-col">
                        <div className={`flex flex-row bg-black justify-center m-auto absolute`} style={{ left: '50px', top: '50px', width: '150px'}}>
                            <div className="p-2 transition duration-200 transform hover:scale-125">
                                <a href={'https://github.com/BrainClouder/marketplace-sample'}><img alt="github repo" src={gitLight} /></a>
                            </div>
                            <div className="p-2 transition duration-200 transform hover:scale-125">
                                <a href={'https://stackoverflow.com/users/11518214/celso-wellington'}><img alt="SO profile" src={soLogo} width={32} /></a>
                            </div>
                            <div className="p-2 transition duration-200 transform hover:scale-125">
                                <a href={'https://www.linkedin.com/in/contrateme/'}><img src={lnLogo} alt="LN profile" width={32} /></a>
                            </div>
                            <div className={`p-2 bg-red-500 cursor-pointer font-bold text-white`} onClick={() => setClick(false)} >
                        X    
                        </div>   
                        </div>                
                    </div>
                </div>
                <div onClick={() => setClick(true)} className={`absolute alien cursor-pointer ${clicked ? 'invisible' : 'visible'}`} 
                style={{left: cartToggle ? '45vw' : '50px', top: '5px'}}>
                <span role="img" aria-label="alien ship">🛸</span>
                </div>           
            </div>
        </div>
        
    </>
    )
}
const mapStateToProps = (state: Tstate) => {
    const t = state;
    return {
        cartToggle: t.cartToggle
    }
}


export default connect(mapStateToProps)(FooterCred);