import React from 'react';
import gitLight from '../imgs/png/gitHubLight.png';
import soLogo from '../imgs/svg/so-icon.svg';
import lnLogo from '../imgs/png/lnIcon.png';

const FooterCred: React.FC = () => {
    return (
        <div className={`fixed bottom-0 left-0`} style={{zIndex: 5}}>
            <div className={`relative w-screen`}>
                <div className={`w-auto inline-block mx-auto flex flex-row justify-center`}>
                    <div className={`flex flex-row bg-black rounded-t-lg`}>
                        <div className="p-2 transition duration-200 transform hover:scale-125">
                            <a href={'https://github.com/BrainClouder/marketplace-sample'}><img alt="github repo" src={gitLight} /></a>
                        </div>
                        <div className="p-2 transition duration-200 transform hover:scale-125">
                            <a href={'https://stackoverflow.com/users/11518214/celso-wellington'}><img alt="SO profile" src={soLogo} width={32} /></a>
                        </div>
                        <div className="p-2 transition duration-200 transform hover:scale-125">
                            <a href={'https://www.linkedin.com/in/contrateme/'}><img src={lnLogo} alt="LN profile" width={32} /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FooterCred;