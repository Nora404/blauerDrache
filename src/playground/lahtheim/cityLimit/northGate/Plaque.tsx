import React from 'react';

type PlaqueProps = {
};

const Plaque: React.FC<PlaqueProps> = () => {
    return (
        <div>
            <h2>Plakette</h2>
            <p className='mb-1 text-left'>
                Du erkennst an der steinernden Mauer eine alte vermoose Plakette. Es ist nicht mehr zu erkennen was dort einmal gestanden haben könnte.
            </p>
        </div>
    );
};

export default Plaque;