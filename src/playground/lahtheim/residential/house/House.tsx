import React from 'react';

type HouseProps = {
};

const House: React.FC<HouseProps> = () => {
    return (
        <div>
            <h2>Haus</h2>
            <p className='mb-1 text-left'>
                DAS IST NICHT DEIN HAUS!<br />
                <b>RAUS HIER!!!</b>
            </p>
        </div>
    );
};

export default House;