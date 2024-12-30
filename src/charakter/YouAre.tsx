import React from 'react';
import Header from '../layout/Header/Header';
import { GradientText } from '../utility/GradientText';
import { useGameStore } from '../data/gameStore';
import { useGameState } from '../data/gameState';

type YouAreProps = {
};

const YouAre: React.FC<YouAreProps> = ({ }) => {
    const gameState = useGameState();
    if (!gameState) return null;

    const { gameStore } = useGameStore();

    return (
        <div>
            <Header>Das bist du</Header>
            <p className='text-left padding-left'>
                Name: {gameStore.meta.name}<br />
                Rasse: {gameState.selectedRace.label}<br />
                Herkunft: {gameState.selectedOrigin.label}<br />
                Berufung: {gameState.selectedCalling.label}<br />
                Titel: <GradientText>{gameStore.meta.titel}</GradientText><br />
                Stimmung: {gameState.selectedFeeling.label}<br />
            </p>
        </div>
    );
};

export default YouAre;