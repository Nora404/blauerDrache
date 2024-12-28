import React from 'react';
import Header from '../layout/Header/Header';
import { GradientText } from '../utility/GradientText';
import { useGameStore } from '../data/gameStore';
import { useGameState } from '../data/gameState';

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
        originColor = ['#E33030', '#E3D82F', '#2EE3D3', '#5B2EE3'],
        titelColor = ['#aaaaaa'],
        feelingColor = ['#aaaaaa'],
    }
) => {
    const gameState = useGameState();
    if (!gameState) return null;

    const { gameData } = useGameStore();

    return (
        <div>
            <Header>Das bist du</Header>
            <p className='text-left padding-left'>
                Name: <GradientText colors={nameColor}>{gameData.meta.name}</GradientText><br />
                Rasse: {gameState.selectedRace.label}<br />
                Herkunft: {gameState.selectedOrigin.label}<br />
                Berufung: <GradientText colors={originColor}>{gameData.meta.calling}</GradientText><br />
                Titel: <GradientText colors={titelColor}>{gameData.meta.titel}</GradientText><br />
                Stimmung: <GradientText colors={feelingColor}>{gameData.meta.feeling}</GradientText><br />
            </p>
        </div>
    );
};

export default YouAre;