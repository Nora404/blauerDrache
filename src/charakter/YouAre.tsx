import React from 'react';
import Header from '../layout/Header/Header';
import { GradientText } from '../utility/GradientText';
import { useGameContext } from '../data/gameStore';

type YouAreProps = {
    nameColor?: string[],
    raseColor?: string[],
    originColor?: string[],
    titelColor?: string[],
    feelingColor?: string[],
};

const YouAre: React.FC<YouAreProps> = (
    {
        nameColor = ['#abcdef', '#EE48F2', '#abcdef'],
        raseColor = ['#E3AD3C', '#78E3B4'],
        originColor = ['#E33030', '#E3D82F', '#2EE3D3', '#5B2EE3'],
        titelColor = ['#aaaaaa'],
        feelingColor = ['#aaaaaa'],
    }
) => {

    const { gameData } = useGameContext();

    return (
        <div>
            <Header>Das bist du</Header>
            <p className='text-left padding-left'>
                Name: <GradientText colors={nameColor}>{gameData.name}</GradientText><br />
                Rasse: <GradientText colors={raseColor}>{gameData.rase}</GradientText><br />
                Herkunft: <GradientText colors={originColor}>{gameData.origin}</GradientText><br />
                Titel: <GradientText colors={titelColor}>{gameData.titel}</GradientText><br />
                Stimmung: <GradientText colors={feelingColor}>{gameData.feeling}</GradientText><br />
            </p>
        </div>
    );
};

export default YouAre;