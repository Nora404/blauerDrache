import React, { useCallback } from 'react';
import Header from '../../../../layout/Header/Header';
import { getCombinedStats, getPlayerObj, getScalingFactor, useNewGameStore } from '../../../../store/newGameStore';
import { getDelta } from '../../../../utility/GetDelta';
import { SYSTEM } from '../../../../data/colorfullStrings';
import './PlayerInfo.css'
import TableRow from './TableRow';

type PlayerInfoProps = {
};

const PlayerInfo: React.FC<PlayerInfoProps> = () => {
    const { store, updateExp, updateLife, updateReputation, updateRounds, updateWeapon, updatePlayerBuff, updatePlayerDebuff, updateItems, newDay } = useNewGameStore();
    const combined = getCombinedStats(store);
    const selected = getPlayerObj(store);
    const delta = getDelta(store);

    const statsData = [
        {
            key: "startData1",
            label: SYSTEM.Leben,
            base: store.playerStats.life,
            buff: delta.life.buffs,
            debuff: delta.life.debuffs,
            feeling: delta.life.feeling,
            weapon: 0,
            armor: 0,
            total: combined.life,
        },
        {
            key: "startData2",
            label: SYSTEM.Runden,
            base: store.playerStats.rounds,
            buff: delta.rounds.buffs,
            debuff: delta.rounds.debuffs,
            feeling: delta.rounds.feeling,
            weapon: 0,
            armor: 0,
            total: combined.rounds,
        },
        {
            key: "startData3",
            label: SYSTEM.Angriff,
            base: store.playerStats.attack,
            buff: delta.attack.buffs,
            debuff: delta.attack.debuffs,
            feeling: delta.attack.feeling,
            weapon: selected.weapon.attack,
            armor: 0,
            total: combined.attack,
        },
        {
            key: "startData4",
            label: SYSTEM.Verteidigung,
            base: store.playerStats.defense,
            buff: delta.defense.buffs,
            debuff: delta.defense.debuffs,
            feeling: delta.defense.feeling,
            weapon: 0,
            armor: selected.armor.defense,
            total: combined.defense,
        },
        {
            key: "startData5",
            label: SYSTEM.Glück,
            base: store.playerStats.luck,
            buff: delta.luck.buffs,
            debuff: delta.luck.debuffs,
            feeling: delta.luck.feeling,
            weapon: 0,
            armor: 0,
            total: combined.luck,
        },
    ];

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

    const handelAddRep = () => {
        updateReputation(50);
    }
    const handelSubRep = () => {
        updateReputation(-50);
    }

    const reputationMessage = useCallback(() => {
        let message;
        let value = store.playerBase.standing;

        if (value >= 20) {
            message = "unglaublich! Du wirst von Allen verehrt und vergöttert.";
        } else if (value >= 10) {
            message = "sehr gut. Du bist berühmt, sehr viele kennen und mögen dich.";
        } else if (value >= 5) {
            message = "positiv, man kennt dich und grüßt dich.";
        } else if (value > 0) {
            message = "neutral. Man nimmt dich wahr, aber nicht besonders.";
        } else if (value === 0) {
            message = "nicht vorhanden. Du wirst meistens ignoriert";
        } else if (value > -5) {
            message = "eher schlecht. Man meidet dich, wenn es nur irgendwie geht";
        } else if (value > -10) {
            message = "sehr schlecht. Du wirst von den meisten Wesen gehasst";
        } else {
            message = "so schlecht wie es nur irgendwie geht. Jeder will dich tot sehen";
        }

        return <div className='mb-1 text-left'>Dein {SYSTEM.Ruf} ist {message}</div>;
    }, [store.playerBase.standing]);

    return (
        <div className='max-width'>
            <h2>Dein Steckbrief</h2>

            <Header>{store.playerMeta.name} (Level {store.playerBase.level})</Header>
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
            </div><br />

            {reputationMessage()}<br />


            <Header>Kombinierte Statistiken</Header><br />
            <div className='flex-center'>
                <table className='w-full stats-table'>
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
                        {statsData.map((stat) => (
                            <TableRow
                                key={stat.key}
                                label={stat.label}
                                base={stat.base}
                                buff={stat.buff}
                                debuff={stat.debuff}
                                feeling={stat.feeling}
                                weapon={stat.weapon}
                                armor={stat.armor}
                                total={stat.total}
                            />
                        ))}
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
                            <button className='btn-border' onClick={handelLifeSub}>Leben -</button><br /><br />

                            <button className='btn-border' onClick={handelAddRep}>Respekt +</button>
                            <button className='btn-border' onClick={handelSubRep}>Respekt -</button>
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


