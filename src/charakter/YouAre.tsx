import React from 'react';
import Header from '../layout/Header';

type YouAreProps = {
    name?: string;
    rase?: string;
    origin?: string;
};

const YouAre: React.FC<YouAreProps> = (
    { name = 'Nora404', rase = 'Entwickler', origin = 'Kinderzimmer' }
) => {

    return (
        <div>
            <Header>Das bist du</Header>
            <p className='text-left'>
                Name: {name}<br />
                Rasse: {rase}<br />
                Herkunft: {origin}<br />
            </p>
        </div>
    );
};

export default YouAre;