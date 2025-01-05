import React from 'react';
import Header from '../../../layout/Header/Header';
import { getCombinedStats, getPlayerObj, getScalingFactor, useNewGameStore } from '../../../store/newGameStore';
import { GradientText } from '../../../utility/GradientText';
import { getDelta } from '../../../utility/GetDelta';
import FormattedByValue from '../../../utility/FormattedByValue';


type PlayerInfoProps = {
};

const PlayerInfo: React.FC<PlayerInfoProps> = () => {
    const { store, updateExp, updateLife, updateRounds, updateWeapon, updatePlayerBuff, updatePlayerDebuff, updateItems, newDay } = useNewGameStore();
    const combined = getCombinedStats(store);
    const selected = getPlayerObj(store);
    const delta = getDelta(store);

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
                {selected.race.description}<br />
                {selected.race.bonus}
            </div>

            <div className='mb-1 text-left'>
                {selected.origin.label}<br />
                {selected.origin.description}<br />
                {selected.origin.bonus}
            </div>

            <div className='mb-1 text-left'>
                {selected.calling.label}<br />
                {selected.calling.description}<br />
                {selected.calling.bonus}
            </div><br /><br />

            <Header>Kombinierte Statistiken</Header><br />
            <div className='flex-center'>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th className='border-bs'>Attribut</th>
                            <th className='text-center border-bs'>Grundwerte</th>
                            <th className='text-center border-bs'>Buffs</th>
                            <th className='text-center border-bs'>Debuffs</th>
                            <th className='text-center border-bs'>Feeling</th>
                            <th className='text-center border-bs'>Waffe</th>
                            <th className='text-center border-bs'>Rüstung</th>
                            <th className='text-center border-bs'>Gesamt</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='border-bd padding-left'>Leben</td>
                            <td className='text-center border-bd'>{store.playerStats.life}</td>
                            <td className='text-center border-bd'><FormattedByValue value={delta.life.buffs} /></td>
                            <td className='text-center border-bd'><FormattedByValue value={delta.life.debuffs} /></td>
                            <td className='text-center border-bd'><FormattedByValue value={delta.life.feeling} /></td>
                            <td className='text-center border-bd'><FormattedByValue value={0} /></td>
                            <td className='text-center border-bd'><FormattedByValue value={0} /></td>
                            <td className='text-center border-bd'><GradientText>{combined.life}</GradientText></td>
                        </tr>
                        <tr>
                            <td className='border-bd padding-left'>Runden</td>
                            <td className='text-center border-bd'>{store.playerStats.rounds}</td>
                            <td className='text-center border-bd'><FormattedByValue value={delta.rounds.buffs} /></td>
                            <td className='text-center border-bd'><FormattedByValue value={delta.rounds.debuffs} /></td>
                            <td className='text-center border-bd'><FormattedByValue value={delta.rounds.feeling} /></td>
                            <td className='text-center border-bd'><FormattedByValue value={0} /></td>
                            <td className='text-center border-bd'><FormattedByValue value={0} /></td>
                            <td className='text-center border-bd'><GradientText>{combined.rounds}</GradientText></td>
                        </tr>
                        <tr>
                            <td className='border-bd padding-left'>Angriff</td>
                            <td className='text-center border-bd'>{store.playerStats.attack}</td>
                            <td className='text-center border-bd'><FormattedByValue value={delta.attack.buffs} /></td>
                            <td className='text-center border-bd'><FormattedByValue value={delta.attack.debuffs} /></td>
                            <td className='text-center border-bd'><FormattedByValue value={delta.attack.feeling} /></td>
                            <td className='text-center border-bd'><FormattedByValue value={selected.weapon.attack} /></td>
                            <td className='text-center border-bd'><FormattedByValue value={0} /></td>
                            <td className='text-center border-bd'><GradientText>{combined.attack}</GradientText></td>
                        </tr>
                        <tr>
                            <td className='border-bd padding-left'>Verteidigung</td>
                            <td className='text-center border-bd'>{store.playerStats.defense}</td>
                            <td className='text-center border-bd'><FormattedByValue value={delta.defense.buffs} /></td>
                            <td className='text-center border-bd'><FormattedByValue value={delta.defense.debuffs} /></td>
                            <td className='text-center border-bd'><FormattedByValue value={delta.defense.feeling} /></td>
                            <td className='text-center border-bd'><FormattedByValue value={0} /></td>
                            <td className='text-center border-bd'><FormattedByValue value={selected.armor.defense} /></td>
                            <td className='text-center border-bd'><GradientText>{combined.defense}</GradientText></td>
                        </tr>
                        <tr>
                            <td className='border-bd padding-left'>Glück</td>
                            <td className='text-center border-bd'>{store.playerStats.luck}</td>
                            <td className='text-center border-bd'><FormattedByValue value={delta.luck.buffs} /></td>
                            <td className='text-center border-bd'><FormattedByValue value={delta.luck.debuffs} /></td>
                            <td className='text-center border-bd'><FormattedByValue value={delta.luck.feeling} /></td>
                            <td className='text-center border-bd'><FormattedByValue value={0} /></td>
                            <td className='text-center border-bd'><FormattedByValue value={0} /></td>
                            <td className='text-center border-bd'><GradientText>{combined.luck}</GradientText></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br />

            <div>
                {/* Aktive Buffs */}
                <h3>Aktive Buffs</h3>
                {selected.buffs.length > 0 ? (
                    <>
                        {selected.buffs.map((buff) => (
                            <div key={buff.name}>
                                {buff.label} - {buff.description}
                                (Dauer: {buff.currentDuration} Runden)
                            </div>
                        ))}
                    </>
                ) : (
                    <p>Keine aktiven Buffs</p>
                )}

                {/* Aktive Debuffs */}
                <h3>Aktive Debuffs</h3>
                {selected.debuffs.length > 0 ? (
                    <>
                        {selected.debuffs.map((debuff) => (
                            <div key={debuff.name}>
                                {debuff.label} - {debuff.description}
                                (Dauer: {debuff.currentDuration} Runden)
                            </div>
                        ))}
                    </>
                ) : (
                    <p>Keine aktiven Debuffs</p>
                )}
            </div><br /><br />

            <Header>Meine Cheats</Header>

            {combined.life <= 0 && <>TOT!!! <br /><br /></>}<br />
            Aktuelles scaling bei einem Wert von 10: {10 * getScalingFactor(store.playerBase.level)}<br />

            <table>
                <tbody>
                    <tr>
                        <td width={'50%'} style={{ verticalAlign: "top" }}>
                            <button className='btn-border' onClick={handleNewDay}>Neuer Tag</button><br /><br />

                            <button className='btn-border' onClick={handelRoundsAdd}>Runde +</button>
                            <button className='btn-border' onClick={handelRoundsSub}>Runde -</button>

                            <button className='btn-border' onClick={handleExp}>Erfahrung +</button>

                            <button className='btn-border' onClick={handelLifeAdd}>Leben +</button>
                            <button className='btn-border' onClick={handelLifeSub}>Leben -</button>

                        </td>
                        <td>
                            <button className='btn-border' onClick={handleWeapon}>Nimm eine Waffe</button>
                            <button className='btn-border' onClick={handleWeapon2}>Nimm eine andere Waffe</button>
                            <button className='btn-border' onClick={handleBuff1}>Bekomme Buff Eisenhaut</button>
                            <button className='btn-border' onClick={handleBuff2}>Bekomme Buff Kampfgeist</button>
                            <button className='btn-border' onClick={handleDeBuff1}>Bekomme Debuff Schwäche</button>
                            <button className='btn-border' onClick={handleDeBuff2}>Bekomme Debuff Pechvogel</button><br /><br />

                            <button className='btn-border' onClick={handelAddStick}>Nimm Stock</button>
                            <button className='btn-border' onClick={handelAddAppel}>Nimm 2 Pilze</button>
                            <button className='btn-border' onClick={handleRemoveAppel}>wirf einen Pilz weg</button>

                        </td>
                    </tr>
                </tbody>
            </table>


        </div>
    );
};

export default PlayerInfo;
