import React from 'react';
import Header from '../../../layout/Header/Header';
import { getCombinedStats, getSelectedObj, useNewGameStore } from '../../../store/newGameStore';
import { GradientText } from '../../../utility/GradientText';
import PlayerInventory from './PlayerInventory';

type PlayerInfoProps = {
};

const PlayerInfo: React.FC<PlayerInfoProps> = () => {
    // const { gameStore } = useGameStore();
    // const gameState = useGameState();
    // if (!gameState) return null;

    // const items = gameStore.equipment.items;
    // // Object.entries(items) gibt ein Array zurück, in dem jedes Element [itemName, count] ist.
    // const entries = Object.entries(items);


    //TEST
    const { store, updateLife, updateRounds, updateWeapon, updatePlayerBuff, updatePlayerDebuff, updateItems, newDay, resetGameData } = useNewGameStore();
    const combined = getCombinedStats(store);
    const selected = getSelectedObj(store);

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
        updateWeapon("Besenstiel");
    }
    const handleWeapon2 = () => {
        updateWeapon("Heugabel");
    }
    const handleBuff1 = () => {
        updatePlayerBuff("Eisenhaut");
    }
    const handleBuff2 = () => {
        updatePlayerBuff("Kampfgeist");
    }
    const handleDeBuff1 = () => {
        updatePlayerDebuff("Schwäche");
    }
    const handleDeBuff2 = () => {
        updatePlayerDebuff("Pechvogel");
    }
    const handelAddAppel = () => {
        updateItems("Pilz", 2);
    }
    const handleRemoveAppel = () => {
        updateItems("Pilz", -1);
    }
    const handelAddStick = () => {
        updateItems("Stock", 1);
    }

    return (
        <div className='max-width'>
            <h2>Dein Steckbrief</h2>

            {/* <div className='mb-1'>{gameState.selectedRace.ascii}</div>

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
            </div> */}

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

            <h3>Aktive Buffs</h3>
            {selected.buff.length > 0 ? (
                <ul>
                    {selected.buff.map((buff, index) => (
                        <li key={index}>
                            {buff.label} - {buff.description}
                            (Dauer: {buff.currentDuration} Runden)
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Keine aktiven Buffs</p>
            )}

            <h3>Aktive Debuffs</h3>
            {selected.debuff.length > 0 ? (
                <ul>
                    {selected.debuff.map((debuff, index) => (
                        <li key={index}>
                            {debuff.label} - {debuff.description}
                            (Dauer: {debuff.currentDuration} Runden)
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Keine aktiven Debuffs</p>
            )}

            <PlayerInventory />

            <GradientText>Feeling: {store.playerFlux.feeling.name}</GradientText> <br />
            <GradientText>angriff: {store.playerFlux.feeling.stats.attack}</GradientText><br />
            <GradientText>vert: {store.playerFlux.feeling.stats.defense}</GradientText><br />
            <GradientText>leben: {store.playerFlux.feeling.stats.life}</GradientText><br />
            <GradientText>glück: {store.playerFlux.feeling.stats.luck}</GradientText><br />
            <GradientText>runden: {store.playerFlux.feeling.stats.rounds}</GradientText><br /><br />

            {combined.life <= 0 && <>TOT!!! <br /><br /></>}

            <button className='btn-border' onClick={handelRoundsAdd}>Runde +</button>
            <button className='btn-border' onClick={handelRoundsSub}>Runde -</button>

            <button className='btn-border' onClick={handelLifeAdd}>Leben +</button>
            <button className='btn-border' onClick={handelLifeSub}>Leben -</button>

            <button className='btn-border' onClick={handleNewDay}>Neuer Tag</button>
            <button className='btn-border' onClick={handleReset}>Reset Data</button>

            <button className='btn-border' onClick={handleWeapon}>Nimm eine Waffe</button>
            <button className='btn-border' onClick={handleWeapon2}>Nimm eine andere Waffe</button>
            <button className='btn-border' onClick={handleBuff1}>Bekomme Buff Eisenhaut</button>
            <button className='btn-border' onClick={handleBuff2}>Bekomme Buff Kampfgeist</button>
            <button className='btn-border' onClick={handleDeBuff1}>Bekomme Debuff Schwäche</button>
            <button className='btn-border' onClick={handleDeBuff2}>Bekomme Debuff Pechvogel</button>

            <button className='btn-border' onClick={handelAddStick}>Nimm Stock</button>
            <button className='btn-border' onClick={handelAddAppel}>Nimm 2 Pilze</button>
            <button className='btn-border' onClick={handleRemoveAppel}>wirf einen Pilz weg</button>
        </div>
    );
};

export default PlayerInfo;
