import React from 'react';
import { useGameStore } from '../../../data/gameStore';
import { useGameState } from '../../../data/gameState';
import Header from '../../../layout/Header/Header';
import { useApplyGameAction } from '../../../utility/ApplyGameAction';
import { getCombinedStats, useNewGameStore } from '../../../store/newGameStore';
import { GradientText } from '../../../utility/GradientText';

type PlayerInfoProps = {
};

const PlayerInfo: React.FC<PlayerInfoProps> = () => {
    const { gameStore } = useGameStore();
    const gameState = useGameState();
    if (!gameState) return null;

    const items = gameStore.equipment.items;
    // Object.entries(items) gibt ein Array zurück, in dem jedes Element [itemName, count] ist.
    const entries = Object.entries(items);


    //TEST
    const { store, updateLife, updateRounds, newDay } = useNewGameStore();
    const combined = getCombinedStats(store);

    const handelLifeAdd = () => {
        updateLife(1);
    }
    const handelLifeSub = () => {
        updateLife(-1);
    }

    const handelRoundsAdd = () => {
        updateRounds(1);
    }
    const handelRoundsSub = () => {
        updateRounds(-1);
    }
    const handleNewDay = () => {
        newDay();
    }
    const handleWeapon = () => {

    }
    const handleArmor = () => {

    }
    const handleBuff = () => {

    }
    const handleDebuff = () => {

    }

    return (
        <div className='max-width'>
            <h2>Dein Steckbrief</h2>

            <div className='mb-1'>{gameState.selectedRace.ascii}</div>

            <Header>{gameStore.meta.name}</Header>
            <div className='mb-1 text-left'>
                {gameState.selectedRace.label}<br />
                {gameState.selectedRace.description}
            </div>

            <div className='mb-1 text-left'>
                {gameState.selectedOrigin.label}<br />
                {gameState.selectedOrigin.description}
            </div>

            <div className='mb-1 text-left'>
                {gameState.selectedCalling.label}<br />
                {gameState.selectedCalling.description}
            </div>

            <br />
            <Header>Werte</Header>
            <p className='text-left'></p>

            <Header>Inventar</Header>
            <div className='text-left'>
                {entries.map(([itemName, count]) => (
                    <span key={itemName}>
                        {itemName} x {count}<br />
                    </span>
                ))}
            </div>

            <GradientText>Leben: {store.playerStats.life}</GradientText> ---
            <GradientText>Leben von Combi: {combined.life}</GradientText><br /><br />
            <GradientText>Runden: {store.playerStats.rounds}</GradientText> ---
            <GradientText>Runden von Combi: {combined.rounds}</GradientText><br /><br />
            <GradientText>Attack: {store.playerStats.attack}</GradientText> ---
            <GradientText>Attack von Combi: {combined.attack}</GradientText><br /><br />
            <GradientText>Defence: {store.playerStats.defense}</GradientText> ---
            <GradientText>Defence von Combi: {combined.defense}</GradientText><br /><br />

            <GradientText>Buff: {store.playerFlux.buff.length}</GradientText><br /><br />
            <GradientText>Debuff: {store.gameState.temperature}</GradientText><br /><br />
            <GradientText>Debuff: {store.gameState.weather}</GradientText><br /><br />
            <GradientText>Debuff: {store.playerFlux.feeling.name}</GradientText><br /><br />

            <button onClick={handelRoundsAdd}>Runde +</button><br />
            <button onClick={handelRoundsSub}>Runde -</button><br />

            <button onClick={handelLifeAdd}>Leben +</button><br />
            <button onClick={handelLifeSub}>Leben -</button><br />

            <button onClick={handleNewDay}>Neuer Tag</button><br /><br />

            <button>Nimm eine Waffe</button>
            <button>Nimm ein Schild</button>
            <button>Bekomme einen Buff</button>
            <button>Bekomme einen Debuff</button>
        </div>
    );
};

export default PlayerInfo;
