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
    const { store, updateLife, updateRounds, setPlayerFlux, updatePlayerBuff, newDay } = useNewGameStore();
    const combined = getCombinedStats(store);

    const handelLifeAdd = () => {
        updateLife(10);
    }
    const handelLifeSub = () => {
        updateLife(-10);
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
        const weapon = { name: "Schwert", stats: { attack: 5 } }
        setPlayerFlux({ weapon })
    }
    const handleWeaponOff = () => {
        const weapon = { name: "Nichts", stats: {} }
        setPlayerFlux({ weapon })
    }
    const handleBuff1 = () => {
        const newBuff = { name: "Stärke", stats: { attack: 10 } };
        updatePlayerBuff(newBuff);
    }
    const handleBuff2 = () => {
        const newBuff = { name: "Glück", stats: { luck: 10 } };
        updatePlayerBuff(newBuff);
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
            <GradientText>Leben von Combi: {combined.life}</GradientText><br />
            <GradientText>Runden: {store.playerStats.rounds}</GradientText> ---
            <GradientText>Runden von Combi: {combined.rounds}</GradientText><br />
            <GradientText>Attack: {store.playerStats.attack}</GradientText> ---
            <GradientText>Attack von Combi: {combined.attack}</GradientText><br />
            <GradientText>Defence: {store.playerStats.defense}</GradientText> ---
            <GradientText>Defence von Combi: {combined.defense}</GradientText><br />
            <GradientText>Glück: {store.playerStats.luck}</GradientText> ---
            <GradientText>Glück von Combi: {combined.luck}</GradientText><br />

            <GradientText>Temperatur: {store.gameState.temperature}</GradientText><br /><br />
            <GradientText>Wetter: {store.gameState.weather}</GradientText><br /><br />
            <GradientText>Buff: {store.playerFlux.buff.length}</GradientText><br />

            {store.playerFlux.buff.length === 0 ? (
                <p>Keine Buffs aktiv</p>
            ) : (
                <ul>
                    {store.playerFlux.buff.map((buff, index) => (
                        <li key={index}>
                            <strong>{buff.name}</strong>
                            <ul>
                                {Object.entries(buff.stats).map(([stat, value]) => (
                                    <li key={stat}>
                                        {stat}: {value}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}

            <GradientText>Feeling: {store.playerFlux.feeling.name}</GradientText> <br />
            <GradientText>angriff: {store.playerFlux.feeling.stats.attack}</GradientText><br />
            <GradientText>vert: {store.playerFlux.feeling.stats.defense}</GradientText><br />
            <GradientText>leben: {store.playerFlux.feeling.stats.life}</GradientText><br />
            <GradientText>glück: {store.playerFlux.feeling.stats.luck}</GradientText><br />
            <GradientText>runden: {store.playerFlux.feeling.stats.rounds}</GradientText><br /><br />

            <button onClick={handelRoundsAdd}>Runde +</button><br />
            <button onClick={handelRoundsSub}>Runde -</button><br />

            <button onClick={handelLifeAdd}>Leben +</button><br />
            <button onClick={handelLifeSub}>Leben -</button><br />

            <button onClick={handleNewDay}>Neuer Tag</button><br /><br />

            <button onClick={handleWeapon}>Nimm eine Waffe (+5 att)</button>
            <button onClick={handleWeaponOff}>Nimm die Waffe runter (-5 att)</button>
            <button onClick={handleBuff1}>Bekomme Buff Stärke</button>
            <button onClick={handleBuff2}>Bekomme Buff Glück</button>
        </div>
    );
};

export default PlayerInfo;
