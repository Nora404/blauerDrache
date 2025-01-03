import React from 'react';
import { useGameStore } from '../../../data/gameStore';
import { useGameState } from '../../../data/gameState';
import Header from '../../../layout/Header/Header';
import { getCombinedStats, Item, useNewGameStore } from '../../../store/newGameStore';
import { GradientText } from '../../../utility/GradientText';
import PlayerInventory from './PlayerInventory';


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
    const { store, updateLife, updateRounds, setPlayerFlux, updatePlayerBuff, updateItems, newDay, resetGameData } = useNewGameStore();
    const combined = getCombinedStats(store);

    const apple: Item = {
        name: "Apfel",
        description: "Ein saftiger roter Apfel. Heilt 5 Lebenspunkte.",
        effects: { life: 5 },
    };
    const stick: Item = {
        name: "Stock",
        description: "Ein einfacher Stock",
    };

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
    const handleReset = () => {
        resetGameData();
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
    const handelAddAppel = () => {
        updateItems(apple, 2);
    }
    const handleRemoveAppel = () => {
        updateItems(apple, -1);
    }
    const handelAddStick = () => {
        updateItems(stick, 1);
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
            <GradientText>Glück von Combi: {combined.luck}</GradientText><br /><br />

            <GradientText>Temperatur: {store.gameState.temperature}</GradientText><br />
            <GradientText>Wetter: {store.gameState.weather}</GradientText><br /><br />

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

            <PlayerInventory />

            <GradientText>Feeling: {store.playerFlux.feeling.name}</GradientText> <br />
            <GradientText>angriff: {store.playerFlux.feeling.stats.attack}</GradientText><br />
            <GradientText>vert: {store.playerFlux.feeling.stats.defense}</GradientText><br />
            <GradientText>leben: {store.playerFlux.feeling.stats.life}</GradientText><br />
            <GradientText>glück: {store.playerFlux.feeling.stats.luck}</GradientText><br />
            <GradientText>runden: {store.playerFlux.feeling.stats.rounds}</GradientText><br /><br />

            {combined.life <= 0 && <>TOT!!! <br /><br /></>}

            <button onClick={handelRoundsAdd}>Runde +</button>
            <button onClick={handelRoundsSub}>Runde -</button>

            <button onClick={handelLifeAdd}>Leben +</button>
            <button onClick={handelLifeSub}>Leben -</button>

            <button onClick={handleNewDay}>Neuer Tag</button>
            <button onClick={handleReset}>Reset Data</button>

            <button onClick={handleWeapon}>Nimm eine Waffe (+5 att)</button>
            <button onClick={handleWeaponOff}>Nimm die Waffe runter (-5 att)</button>
            <button onClick={handleBuff1}>Bekomme Buff Stärke</button>
            <button onClick={handleBuff2}>Bekomme Buff Glück</button>

            <button onClick={handelAddStick}>Nimm Stock</button>
            <button onClick={handelAddAppel}>Nimm 2 Äpfel</button>
            <button onClick={handleRemoveAppel}>wirf einen Apfel weg</button>
        </div>
    );
};

export default PlayerInfo;
