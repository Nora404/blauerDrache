import React from 'react';
import { useGameStore } from '../../../data/gameStore';
import { useGameState } from '../../../data/gameState';
import Header from '../../../layout/Header/Header';

type PlayerInfoProps = {
};

const PlayerInfo: React.FC<PlayerInfoProps> = () => {
    const { gameStore: gameData } = useGameStore();
    const gameState = useGameState();
    if (!gameState) return null;

    return (
        <div className='max-width'>
            <h2>Dein Steckbrief</h2>

            <p className='mb-1'>{gameState.selectedRace.ascii}</p>

            <Header>{gameData.meta.name}</Header>
            <p className='mb-1 text-left'>
                {gameState.selectedRace.label}<br />
                {gameState.selectedRace.description}
            </p>

            <p className='mb-1 text-left'>
                {gameState.selectedOrigin.label}<br />
                {gameState.selectedOrigin.description}
            </p>

            <p className='mb-1 text-left'>
                {gameState.selectedCalling.label}<br />
                {gameState.selectedCalling.description}
            </p>
        </div>
    );
};

export default PlayerInfo;