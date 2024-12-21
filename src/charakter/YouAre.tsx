import React from 'react';
import Header from '../layout/Header';
import { GradientText } from '../utility/GradientText';

type YouAreProps = {
    name?: string;
    nameColor?: string[],
    rase?: string;
    raseColor?: string[],
    origin?: string;
    originColor?: string[],
};

const YouAre: React.FC<YouAreProps> = (
    { name = 'Nora404', rase = 'Entwickler', origin = 'Kinderzimmer',
        nameColor = ['#abcdef', '#EE48F2', '#abcdef'],
        raseColor = ['#E3AD3C', '#78E3B4'],
        originColor = ['#E33030', '#E3D82F', '#2EE3D3', '#5B2EE3']
    }
) => {

    return (
        <div>
            <Header>Das bist du</Header>
            <p className='text-left padding-left'>
                Name: <GradientText colors={nameColor}>{name}</GradientText><br />
                Rasse: <GradientText colors={raseColor}>{rase}</GradientText><br />
                Herkunft: <GradientText colors={originColor}>{origin}</GradientText><br />
            </p>
        </div>
    );
};

export default YouAre;