import React from 'react';
import Header from '../../../layout/Header/Header';
import { getCombinedStats, getPlayerObj, getScalingFactor, useNewGameStore } from '../../../store/newGameStore';
import { GradientText } from '../../../utility/GradientText';
import PlayerInventory from './PlayerInventory';

type PlayerInfoProps = {
};

const PlayerInfo: React.FC<PlayerInfoProps> = () => {
    const { store, updateExp, updateLife, updateRounds, updateWeapon, updatePlayerBuff, updatePlayerDebuff, updateItems, newDay, resetGameData } = useNewGameStore();
    const combined = getCombinedStats(store);
    const selected = getPlayerObj(store);

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
    const handleExp = () => {
        updateExp(50);
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

            <Header>{store.playerMeta.name}</Header>
            <div className='mb-1 text-left'>
                {selected.race.label}<br />
                {selected.race.description}
            </div>

            <div className='mb-1 text-left'>
                {selected.origin.label}<br />
                {selected.origin.description}
            </div>

            <div className='mb-1 text-left'>
                {selected.calling.label}<br />
                {selected.calling.description}
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

            Aktuelles scaling bei einem Wert von 10: {10 * getScalingFactor(store.playerBase.level)}

            <div>
                {/* Aktive Buffs */}
                <h3>Aktive Buffs</h3>
                {selected.buffs.length > 0 ? (
                    <ul>
                        {selected.buffs.map((buff) => (
                            <li key={buff.name}>
                                {buff.label} - {buff.description}
                                (Dauer: {buff.currentDuration} Runden)
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Keine aktiven Buffs</p>
                )}

                {/* Aktive Debuffs */}
                <h3>Aktive Debuffs</h3>
                {selected.debuffs.length > 0 ? (
                    <ul>
                        {selected.debuffs.map((debuff) => (
                            <li key={debuff.name}>
                                {debuff.label} - {debuff.description}
                                (Dauer: {debuff.currentDuration} Runden)
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Keine aktiven Debuffs</p>
                )}
            </div>


            <GradientText>Feeling: {selected.feeling.name}</GradientText> <br />
            <GradientText>angriff: {selected.feeling.stats.attack}</GradientText><br />
            <GradientText>vert: {selected.feeling.stats.defense}</GradientText><br />
            <GradientText>leben: {selected.feeling.stats.life}</GradientText><br />
            <GradientText>glück: {selected.feeling.stats.luck}</GradientText><br />
            <GradientText>runden: {selected.feeling.stats.rounds}</GradientText><br /><br />

            {combined.life <= 0 && <>TOT!!! <br /><br /></>}

            <button className='btn-border' onClick={handelRoundsAdd}>Runde +</button>
            <button className='btn-border' onClick={handelRoundsSub}>Runde -</button>

            <button className='btn-border' onClick={handleExp}>Erfahrung +</button>

            <button className='btn-border' onClick={handelLifeAdd}>Leben +</button>
            <button className='btn-border' onClick={handelLifeSub}>Leben -</button><br /><br />

            <button className='btn-border' onClick={handleNewDay}>Neuer Tag</button><br /><br />

            <button className='btn-border' onClick={handleWeapon}>Nimm eine Waffe</button>
            <button className='btn-border' onClick={handleWeapon2}>Nimm eine andere Waffe</button>
            <button className='btn-border' onClick={handleBuff1}>Bekomme Buff Eisenhaut</button>
            <button className='btn-border' onClick={handleBuff2}>Bekomme Buff Kampfgeist</button>
            <button className='btn-border' onClick={handleDeBuff1}>Bekomme Debuff Schwäche</button>
            <button className='btn-border' onClick={handleDeBuff2}>Bekomme Debuff Pechvogel</button><br /><br />

            <button className='btn-border' onClick={handelAddStick}>Nimm Stock</button>
            <button className='btn-border' onClick={handelAddAppel}>Nimm 2 Pilze</button>
            <button className='btn-border' onClick={handleRemoveAppel}>wirf einen Pilz weg</button>
        </div>
    );
};

export default PlayerInfo;
