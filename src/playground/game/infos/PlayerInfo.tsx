import React from 'react';
import { useGameStore } from '../../../data/gameStore';
import { useGameState } from '../../../data/gameState';
import Header from '../../../layout/Header/Header';

type PlayerInfoProps = {
};

const PlayerInfo: React.FC<PlayerInfoProps> = () => {
    const { gameStore } = useGameStore();
    const gameState = useGameState();
    if (!gameState) return null;

    const items = gameStore.equipment.items;
    // Object.entries(items) gibt ein Array zurück, in dem jedes Element [itemName, count] ist.
    const entries = Object.entries(items);

    return (
        <div className='max-width'>
            <h2>Dein Steckbrief</h2>

            <p className='mb-1'>{gameState.selectedRace.ascii}</p>

            <Header>{gameStore.meta.name}</Header>
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

            <br />
            <Header>Werte</Header>

            <p className='text-left'>
                Level: {gameState.combinedStats.level}<br />

                Grundleben: {gameStore.stats.life} Aktuelles Leben: {gameState.combinedStats.life} <br />

                Grundangriff: {gameStore.stats.attack} Aktueller Angriff: {gameState.combinedStats.attack}<br />

                Grundverteidigung: {gameStore.stats.defense} Aktuelle Verteidigung: {gameState.combinedStats.defense}
            </p>

            <Header>Inventar</Header>
            <ul className='text-left'>
                {entries.map(([itemName, count]) => (
                    <li key={itemName}>
                        {itemName} x {count}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PlayerInfo;