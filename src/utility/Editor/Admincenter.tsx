// #region [imports]
import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../store';
import { SYSTEM } from '../../data/helper/colorfullStrings';
import TableRow from '../../playground/game/infos/PlayerInfo/TableRow';
import HeaderSmall from '../../layout/Header/HeaderSmall';
import { TEMPERATURE, WEATHER } from '../../data/helper/weatherStrings';
import { races } from '../../data/raceData';
import { callings } from '../../data/callingData';
import { origin } from '../../data/originData';
import { BuffName, buffs } from '../../data/buffData';
import { DebuffName, debuffs } from '../../data/debuffData';
import { weapons } from '../../data/weaponData';
import { armors } from '../../data/armorData';
import { feelings } from '../../data/feelingData';
import { getItemCategories, items } from '../../data/ItemData';
// #endregion

// #region [prepare]
type AdmincenterProps = {};

const Admincenter: React.FC<AdmincenterProps> = observer(() => {
    const {
        getCombinedStats,
        getPlayerObj,
        getDelta,
        gameState,
        gameTime,

        playerStats,
        playerBase,
        playerFlux,
        playerMeta,
        playerEconomy,
    } = useRootStore();

    // Daten holen:
    const combined = getCombinedStats();
    const selected = getPlayerObj();
    const delta = getDelta();

    const { attack, defense, luck } = playerStats.data;
    const { level, ruf: standing, maxLife, maxRounds } = playerBase.data;
    const categoryMap = useMemo(() => getItemCategories(), []);

    // Daten für Tabelle
    const statsData = [
        {
            key: "startData1",
            label: SYSTEM.Leben,
            base: maxLife,
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
            base: maxRounds,
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
            base: attack,
            buff: delta.attack.buffs,
            debuff: delta.attack.debuffs,
            feeling: delta.attack.feeling,
            weapon: selected.weapon.attack, // aus getPlayerObj
            armor: 0,
            total: combined.attack,
        },
        {
            key: "startData4",
            label: SYSTEM.Verteidigung,
            base: defense,
            buff: delta.defense.buffs,
            debuff: delta.defense.debuffs,
            feeling: delta.defense.feeling,
            weapon: 0,
            armor: selected.armor.defense, // aus getPlayerObj
            total: combined.defense,
        },
        {
            key: "startData5",
            label: SYSTEM.Glück,
            base: luck,
            buff: delta.luck.buffs,
            debuff: delta.luck.debuffs,
            feeling: delta.luck.feeling,
            weapon: 0,
            armor: 0,
            total: combined.luck,
        },
    ];
    // #endregion

    //#region [handler]
    const handleNewDay = () => gameTime.newDay();

    const handleGameState = (field: keyof typeof gameState.data, value: string) => {
        gameState.setGameState({ [field]: value });
    }
    const handlePlayerMeta = (field: keyof typeof playerMeta.data, value: string) => {
        playerMeta.setPlayerMeta({ [field]: value });
    }
    const handlePlayerBase = (field: keyof typeof playerBase.data, value: number) => {
        switch (field) {
            case 'level':
                if (value > 0) {
                    for (let i = 0; i < value; i++) {
                        playerBase.updateExp(playerBase.data.nextLevel + 1);
                    }
                } else {
                    for (let i = 0; i > value; i--) {
                        playerBase.updateExp(-(playerBase.data.exp + 1));
                    }
                }
                break;
            case 'exp':
                playerBase.updateExp(value);
                break;
            case 'ruf':
                if (value > 0) {
                    for (let i = 0; i < value; i++) {
                        playerBase.updateLeumund(playerBase.data.nextLeumund + 1);
                    }
                } else {
                    for (let i = 0; i < value; i++) {
                        playerBase.updateLeumund(-(playerBase.data.leumund + 1));
                    }
                }
                break;
            case 'leumund':
                playerBase.updateLeumund(value);
                break;
        }
    }
    const handlePlayerStats = (field: keyof typeof playerStats.data, value: number) => {
        switch (field) {
            case 'life':
                playerStats.updateLife(value);
                break;
            case 'rounds':
                playerStats.updateRounds(value);
                break;
            case 'attack':
            case 'defense':
            case 'luck':
                playerStats.updatePlayerStats({ [field]: value });
                break;

        }
    }
    const handlePlayerFlux = (field: keyof typeof playerFlux.data, value: string, add?: boolean) => {
        if (field === "buff" && add) {
            playerFlux.updatePlayerBuff(value as BuffName);
        }
        else if (field === "buff" && !add) {
            delete playerFlux.data.buff[value as BuffName];
        }
        else if (field === "debuff" && add) {
            playerFlux.updatePlayerDebuff(value as DebuffName);
        }
        else if (field === "debuff" && !add) {
            delete playerFlux.data.debuff[value as DebuffName];
        } else {
            playerFlux.setPlayerFlux({ [field]: value });
        }
    }
    const handlePlayerEconomy = (field: keyof typeof playerEconomy.data, value: number) => {
        playerEconomy.updatePlayerEconomy({ [field]: value });
    }
    const handlePlayerItems = (item: string, quantity: number) => {
        playerEconomy.updateItems(item, quantity);
    }
    //#endregion

    // #region [jsx]
    return (
        <div className='form-container max-width text-left'>
            <h2>Admincenter</h2>

            <p>Verändere alle Daten, Listen oder Zustände. Teste Events, Quests oder Items.
                ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
                dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies</p>

            <br />
            <div className="flex-center">
                <table className="w-full stats-table">
                    <thead>
                        <tr>
                            <th className="border-bs">Attribut</th>
                            <th className="text-center border-bs">Grundwerte</th>
                            <th className="text-center border-bs">Buffs</th>
                            <th className="text-center border-bs">Debuffs</th>
                            <th className="text-center border-bs">Feeling</th>
                            <th className="text-center border-bs">Waffe</th>
                            <th className="text-center border-bs">Rüstung</th>
                            <th className="text-center border-bs">Aktuell</th>
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
            </div><br />

            <HeaderSmall>Game Data</HeaderSmall>
            <table className='w-full'>
                <tr>
                    <td className='border-bd' style={{ width: "25%" }}>Wetter</td>
                    <td>
                        <select
                            className='w-200px'
                            value={gameState.data.weather || ""}
                            onChange={(e) => handleGameState("weather", e.target.value)}>
                            <option value="">(keine Auswahl)</option>
                            {WEATHER.map((w) => (
                                <option key={w} value={w}>
                                    {w}
                                </option>
                            ))}
                        </select>
                    </td>
                    <td className='border-bd' style={{ width: "25%" }}>Temeratur</td>
                    <td>
                        <select
                            className='w-200px'
                            value={gameState.data.temperature || ""}
                            onChange={(e) => handleGameState("temperature", e.target.value)}>
                            <option value="">(keine Auswahl)</option>
                            {TEMPERATURE.map((t) => (
                                <option key={t} value={t}>
                                    {t}
                                </option>
                            ))}
                        </select>
                    </td>
                </tr>
            </table>

            <button className="btn-border w-full" onClick={handleNewDay}>
                Neuer Tag
            </button><br /><br />

            <HeaderSmall>Hintergrund</HeaderSmall>
            <table className='w-full'>
                <tr>
                    <td className='border-bd' style={{ width: "25%" }}>Rasse</td>
                    <td>
                        <select
                            className='w-200px'
                            value={playerMeta.data.race || ""}
                            onChange={(e) => handlePlayerMeta("race", e.target.value)}>
                            <option value="">(keine Auswahl)</option>
                            {races.map((r) => (
                                <option key={r.name} value={r.name}>
                                    {r.name}
                                </option>
                            ))}
                        </select>
                    </td>
                    <td className='border-bd' style={{ width: "25%" }}>Herkunft</td>
                    <td>
                        <select
                            className='w-200px'
                            value={playerMeta.data.origin || ""}
                            onChange={(e) => handlePlayerMeta("origin", e.target.value)}>
                            <option value="">(keine Auswahl)</option>
                            {origin.map((o) => (
                                <option key={o.name} value={o.name}>
                                    {o.name}
                                </option>
                            ))}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td className='border-bd' style={{ width: "25%" }}>Berufung</td>
                    <td>
                        <select
                            className='w-200px'
                            value={playerMeta.data.calling || ""}
                            onChange={(e) => handlePlayerMeta("calling", e.target.value)}>
                            <option value="">(keine Auswahl)</option>
                            {callings.map((c) => (
                                <option key={c.name} value={c.name}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </td>
                    <td className='border-bd' style={{ width: "25%" }}>Titel</td>
                    <td>
                        <select
                            className='w-200px'
                            value={playerMeta.data.titel || ""}
                            onChange={(e) => handlePlayerMeta("titel", e.target.value)}>
                            <option value="">(keine Auswahl)</option>

                        </select>
                    </td>
                </tr>
            </table><br />

            <HeaderSmall>Spieler Erfahrung</HeaderSmall>
            <div className='flex-row'>
                <div className='flex-row'>
                    <div>
                        <button className='redBtn3' onClick={() => handlePlayerBase("level", -1)}>1</button>
                        <button className='redBtn2' onClick={() => handlePlayerBase("level", -3)}>3</button>
                        <button className='redBtn1' onClick={() => handlePlayerBase("level", -5)}>5</button>
                    </div>
                    <div className='w100c'>{SYSTEM.Level}</div>
                    <div>
                        <button className='greenBtn1' onClick={() => handlePlayerBase("level", 5)}>5</button>
                        <button className='greenBtn2' onClick={() => handlePlayerBase("level", 3)}>3</button>
                        <button className='greenBtn3' onClick={() => handlePlayerBase("level", 1)}>1</button>
                    </div>
                </div>
                <div className='flex-row'>
                    <div>
                        <button className='redBtn3' onClick={() => handlePlayerBase("exp", -50)}>
                            50</button>
                        <button className='redBtn2' onClick={() => handlePlayerBase("exp", -100)}>
                            100</button>
                        <button className='redBtn1' onClick={() => handlePlayerBase("exp", -500)}>
                            500</button>
                    </div>
                    <div className='w100c'>{SYSTEM.Erfahrung}</div>
                    <div>
                        <button className='greenBtn1' onClick={() => handlePlayerBase("exp", 500)}>
                            500</button>
                        <button className='greenBtn2' onClick={() => handlePlayerBase("exp", 100)}>
                            100</button>
                        <button className='greenBtn3' onClick={() => handlePlayerBase("exp", 50)}>
                            50</button>
                    </div>
                </div>
            </div>

            <div className='flex-row'>
                <div className='flex-row'>
                    <div>
                        <button className='redBtn3' onClick={() => handlePlayerBase("ruf", -5)}>5</button>
                        <button className='redBtn2' onClick={() => handlePlayerBase("ruf", -3)}>3</button>
                        <button className='redBtn1' onClick={() => handlePlayerBase("ruf", -1)}>1</button>
                    </div>
                    <div className='w100c'>{SYSTEM.Ruf}</div>
                    <div>
                        <button className='greenBtn1' onClick={() => handlePlayerBase("ruf", 1)}>1</button>
                        <button className='greenBtn2' onClick={() => handlePlayerBase("ruf", 3)}>3</button>
                        <button className='greenBtn3' onClick={() => handlePlayerBase("ruf", 5)}>5</button>
                    </div>
                </div>
                <div className='flex-row'>
                    <div>
                        <button className='redBtn3' onClick={() => handlePlayerBase("leumund", -50)}>
                            50</button>
                        <button className='redBtn2' onClick={() => handlePlayerBase("leumund", -100)}>
                            100</button>
                        <button className='redBtn1' onClick={() => handlePlayerBase("leumund", -500)}>
                            500</button>
                    </div>
                    <div className='w100c'>{SYSTEM.Leumund}</div>
                    <div>
                        <button className='greenBtn1' onClick={() => handlePlayerBase("leumund", 500)}>
                            500</button>
                        <button className='greenBtn2' onClick={() => handlePlayerBase("leumund", 100)}>
                            100</button>
                        <button className='greenBtn3' onClick={() => handlePlayerBase("leumund", 50)}>
                            50</button>
                    </div>
                </div>
            </div><br />


            <HeaderSmall>Spieler Werte</HeaderSmall>

            <div className='flex-row'>
                <div className="flex-row">
                    <div className="flex-row">
                        <button className="redBtn3" onClick={() => handlePlayerStats("life", -1)}>1</button>
                        <button className="redBtn2" onClick={() => handlePlayerStats("life", -10)}>10</button>
                        <button className="redBtn1" onClick={() => handlePlayerStats("life", -50)}>50</button>
                    </div>
                    <div className="w100c">{SYSTEM.Leben}</div>
                    <div className="flex-row">
                        <button className="greenBtn1" onClick={() => handlePlayerStats("life", 50)}>50</button>
                        <button className="greenBtn2" onClick={() => handlePlayerStats("life", 10)}>10</button>
                        <button className="greenBtn3" onClick={() => handlePlayerStats("life", 1)}>1</button>
                    </div>
                </div>

                {/* Runden */}
                <div className="flex-row">
                    <div className="flex-row">
                        <button className="redBtn3" onClick={() => handlePlayerStats("rounds", -1)}>1</button>
                        <button className="redBtn2" onClick={() => handlePlayerStats("rounds", -3)}>3</button>
                        <button className="redBtn1" onClick={() => handlePlayerStats("rounds", -5)}>5</button>
                    </div>
                    <div className="w100c">{SYSTEM.Runden}</div>
                    <div className="flex-row">
                        <button className="greenBtn1" onClick={() => handlePlayerStats("rounds", 5)}>5</button>
                        <button className="greenBtn2" onClick={() => handlePlayerStats("rounds", 3)}>3</button>
                        <button className="greenBtn3" onClick={() => handlePlayerStats("rounds", 1)}>1</button>
                    </div>
                </div>
            </div>
            <div className='flex-row'>
                <div className="flex-row">
                    <div className="flex-row">
                        <button className="redBtn3" onClick={() => handlePlayerStats("attack", -1)}>1</button>
                        <button className="redBtn2" onClick={() => handlePlayerStats("attack", -5)}>5</button>
                        <button className="redBtn1" onClick={() => handlePlayerStats("attack", -10)}>10</button>
                    </div>
                    <div className="w100c">{SYSTEM.Angriff}</div>
                    <div className="flex-row">
                        <button className="greenBtn1" onClick={() => handlePlayerStats("attack", 10)}>10</button>
                        <button className="greenBtn2" onClick={() => handlePlayerStats("attack", 5)}>5</button>
                        <button className="greenBtn3" onClick={() => handlePlayerStats("attack", 1)}>1</button>
                    </div>
                </div>

                {/* Verteidigung */}
                <div className="flex-row">
                    <div className="flex-row">
                        <button className="redBtn3" onClick={() => handlePlayerStats("defense", -1)}>1</button>
                        <button className="redBtn2" onClick={() => handlePlayerStats("defense", -5)}>5</button>
                        <button className="redBtn1" onClick={() => handlePlayerStats("defense", -10)}>10</button>
                    </div>
                    <div className="w100c">{SYSTEM.Verteidigung}</div>
                    <div className="flex-row">
                        <button className="greenBtn1" onClick={() => handlePlayerStats("defense", 10)}>10</button>
                        <button className="greenBtn2" onClick={() => handlePlayerStats("defense", 5)}>5</button>
                        <button className="greenBtn3" onClick={() => handlePlayerStats("defense", 1)}>1</button>
                    </div>
                </div>
            </div>
            <div className='flex-row'>
                <div className="flex-row">
                    <div className="flex-row">
                        <button className="redBtn3" onClick={() => handlePlayerStats("luck", -1)}>1</button>
                        <button className="redBtn2" onClick={() => handlePlayerStats("luck", -5)}>5</button>
                        <button className="redBtn1" onClick={() => handlePlayerStats("luck", -10)}>10</button>
                    </div>
                    <div className="w100c">{SYSTEM.Glück}</div>
                    <div className="flex-row">
                        <button className="greenBtn1" onClick={() => handlePlayerStats("luck", 10)}>10</button>
                        <button className="greenBtn2" onClick={() => handlePlayerStats("luck", 5)}>5</button>
                        <button className="greenBtn3" onClick={() => handlePlayerStats("luck", 1)}>1</button>
                    </div>
                </div>
                <div></div>
            </div><br />


            <HeaderSmall>Spieler Ausrüstung</HeaderSmall>

            <div className='flex-row-editor'>
                <div>
                    <strong>Aktive Buffs</strong>
                    {selected.buffs.length > 0 ? (
                        <p>
                            {selected.buffs.map((buff) => (
                                <div key={buff.name}>
                                    {buff.label} - (Dauer: {buff.currentDuration}{" "}
                                    Runden)
                                </div>
                            ))}
                        </p>
                    ) : (
                        <p>Keine aktiven Buffs</p>
                    )}</div>

                <div>
                    <strong>Aktive Debuffs</strong>
                    {selected.debuffs.length > 0 ? (
                        <p>
                            {selected.debuffs.map((debuff) => (
                                <div key={debuff.name}>
                                    {debuff.label} - (Dauer:{" "}
                                    {debuff.currentDuration} Runden)
                                </div>
                            ))}
                        </p>
                    ) : (
                        <p>Keine aktiven Debuffs</p>
                    )}</div>
            </div>

            <br />

            <table className='w-full'>
                <tr>
                    <td className='border-bd' style={{ width: "25%" }}>Buff hinzufügen</td>
                    <td>
                        <select
                            className='w-200px'
                            value={""}
                            onChange={(e) => handlePlayerFlux("buff", e.target.value, true)}>
                            <option value="">(keine Auswahl)</option>
                            {buffs.map((r) => (
                                <option key={r.name} value={r.name}>
                                    {r.name}
                                </option>
                            ))}
                        </select>
                    </td>
                    <td className='border-bd' style={{ width: "25%" }}>Buff entfernen</td>
                    <td>
                        <select
                            className='w-200px'
                            value={""}
                            onChange={(e) => handlePlayerFlux("buff", e.target.value, false)}>
                            <option value="">(keine Auswahl)</option>
                            {buffs.map((o) => (
                                <option key={o.name} value={o.name}>
                                    {o.name}
                                </option>
                            ))}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td className='border-bd' style={{ width: "25%" }}>Debuff hinzufügen</td>
                    <td>
                        <select
                            className='w-200px'
                            value={""}
                            onChange={(e) => handlePlayerFlux("debuff", e.target.value, true)}>
                            <option value="">(keine Auswahl)</option>
                            {debuffs.map((r) => (
                                <option key={r.name} value={r.name}>
                                    {r.name}
                                </option>
                            ))}
                        </select>
                    </td>
                    <td className='border-bd' style={{ width: "25%" }}>Debuff entfernen</td>
                    <td>
                        <select
                            className='w-200px'
                            value={""}
                            onChange={(e) => handlePlayerFlux("debuff", e.target.value, false)}>
                            <option value="">(keine Auswahl)</option>
                            {debuffs.map((o) => (
                                <option key={o.name} value={o.name}>
                                    {o.name}
                                </option>
                            ))}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td className='border-bd' style={{ width: "25%" }}>Waffe nehmen</td>
                    <td>
                        <select
                            className='w-200px'
                            value={playerFlux.data.weapon || ""}
                            onChange={(e) => handlePlayerFlux("weapon", e.target.value)}>
                            <option value="">(keine Auswahl)</option>
                            {weapons.map((c) => (
                                <option key={c.name} value={c.name}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </td>
                    <td className='border-bd' style={{ width: "25%" }}>Rüstung anziehen</td>
                    <td>
                        <select
                            className='w-200px'
                            value={playerFlux.data.armor || ""}
                            onChange={(e) => handlePlayerFlux("armor", e.target.value)}>
                            <option value="">(keine Auswahl)</option>
                            {armors.map((c) => (
                                <option key={c.name} value={c.name}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td className='border-bd' style={{ width: "25%" }}>Feeling wechseln</td>
                    <td>
                        <select
                            className='w-200px'
                            value={playerFlux.data.feeling || ""}
                            onChange={(e) => handlePlayerFlux("feeling", e.target.value)}>
                            <option value="">(keine Auswahl)</option>
                            {feelings.map((c) => (
                                <option key={c.name} value={c.name}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </td>
                    <td className='border-bd' style={{ width: "25%" }}>Item (Hand)</td>
                    <td>
                        <select
                            className='w-200px'
                            value={playerFlux.data.item || ""}
                            onChange={(e) => handlePlayerFlux("item", e.target.value)}>
                            <option value="">(keine Auswahl)</option>
                            {items.map((c) => (
                                <option key={c.name} value={c.name}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </td>
                </tr>
            </table><br />

            <HeaderSmall>Spieler Währung</HeaderSmall>
            <div className='flex-row'>
                <div className='flex-row'>
                    <div>
                        <button className='redBtn3' onClick={() => handlePlayerEconomy("gold", -500)}>500</button>
                        <button className='redBtn2' onClick={() => handlePlayerEconomy("gold", -200)}>200</button>
                        <button className='redBtn1' onClick={() => handlePlayerEconomy("gold", -50)}>50</button>
                    </div>
                    <div className='w100c'>{SYSTEM.Gold}</div>
                    <div>
                        <button className='greenBtn1' onClick={() => handlePlayerEconomy("gold", 50)}>50</button>
                        <button className='greenBtn2' onClick={() => handlePlayerEconomy("gold", 200)}>200</button>
                        <button className='greenBtn3' onClick={() => handlePlayerEconomy("gold", 500)}>500</button>
                    </div>
                </div>
                <div className='flex-row'>
                    <div>
                        <button className='redBtn3' onClick={() => handlePlayerEconomy("edelsteine", -1)}>
                            1</button>
                        <button className='redBtn2' onClick={() => handlePlayerEconomy("edelsteine", -5)}>
                            5</button>
                        <button className='redBtn1' onClick={() => handlePlayerEconomy("edelsteine", -10)}>
                            10</button>
                    </div>
                    <div className='w100c'>{SYSTEM.Edelsteine}</div>
                    <div>
                        <button className='greenBtn1' onClick={() => handlePlayerEconomy("edelsteine", 10)}>
                            10</button>
                        <button className='greenBtn2' onClick={() => handlePlayerEconomy("edelsteine", 5)}>
                            5</button>
                        <button className='greenBtn3' onClick={() => handlePlayerEconomy("edelsteine", 1)}>
                            1</button>
                    </div>
                </div>
            </div><br />

            <HeaderSmall>Spieler Items</HeaderSmall>
            <div className='flex-row'>
                <div className='flex-row'>
                    <div className='w-100px border-bd'>Kategorie</div>
                    <select
                        className='w-200px'
                        value={""}
                        onChange={(e) => handlePlayerItems(e.target.value, 1)}>
                        <option value="">(keine Auswahl)</option>
                        {items.map((c) => (
                            <option key={c.name} value={c.name}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='flex-row'>
                    <div className='w-100px border-bd'>Item</div>
                    <select
                        className='w-200px'
                        value={""}
                        onChange={(e) => handlePlayerItems(e.target.value, 1)}>
                        <option value="">(keine Auswahl)</option>
                        {items.map((c) => (
                            <option key={c.name} value={c.name}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button className='add-button'>Hinzufügen</button>
            </div>
        </div>
    );

    // #endregion
});

export default Admincenter;