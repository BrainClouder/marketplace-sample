import React from 'react'

interface IRank {
    rate: number;
    scaler?: number;
}

const Ranking: React.FC<IRank> = ({rate, scaler = 5}) => {
        let imarray = [];
        let tempor = (rate !== undefined ? rate : 0);
        let tempstring = "";
        let tempstroke = "black"
        for(let i = 1;i<=5; i++){
            if(tempor < 1 && tempor > 0){
                const classer = `${Math.floor(Math.random() * 800)}-${tempor}`
                imarray.push(<svg key={classer + tempor} style={{width:"0", height:"0", position:"absolute"}} aria-hidden="true" focusable="false">
                <linearGradient id={classer} gradientTransform="rotate(0)">
                <stop offset="0%" stopColor="#fb4" />
                <stop offset={`${(tempor * 100)}%`} stopColor="#fb4" />
                <stop offset={`${(tempor * 100) + 5}%`} stopColor="rgba(0,0,0,0)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                </linearGradient>
                </svg>);
                tempstring = `url(#${classer})`;
                tempstroke = "#999";         
            } else if(tempor <= 0){
                tempstring = "rgba(0,0,0,0)";
                tempstroke = "#999";   
            } else {
                tempstring = "#fb4";
                tempstroke = "#999";
            }
            imarray.push(<svg width={`${(80 / scaler) + 5}`} height={`${80 / scaler}`} key={i}>
                <path  d={`M ${40 / scaler} ${40 / scaler}
                    M ${40 / scaler} ${60 / scaler}
                    L ${63.511 / scaler} ${72.361 / scaler}
                    L ${59.021 / scaler} ${46.180 / scaler}
                    L ${78.042 / scaler} ${27.639 / scaler}
                    L ${51.756 / scaler} ${23.820 / scaler}
                    L ${40.000 / scaler} 0.000
                    L ${28.244 / scaler} ${23.820 / scaler}
                    L ${1.958  / scaler} ${27.639 / scaler}
                    L ${20.979 / scaler} ${46.180 / scaler}
                    L ${16.489 / scaler} ${72.361 / scaler}
                    L ${40.000 / scaler} ${60.000 / scaler}
                    `} stroke={tempstroke} strokeWidth="1" fill={tempstring}></path>
                </svg>);
            tempor--;

        }     

        return(
            <div className="mx-auto" style={{width: `${500/scaler}px`}}>
            <div className="flex flex-row items-center"><div className="flex justify-around">
                {imarray}<span className="text-xs opacity-50">{rate}</span></div>            
            </div>
            </div>
        );
}

export default Ranking;