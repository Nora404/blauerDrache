import React, { useCallback } from "react";
import { observer } from "mobx-react-lite";
import Header from "../../../../layout/Header/Header";
import TableRow from "./TableRow";
import { SYSTEM } from "../../../../data/colorfullStrings";
import "./PlayerInfo.css";
import { useRootStore } from "../../../../store";
import { getScalingFactor } from "../../../../utility/Progression";
import { WeaponName } from "../../../../data/weaponData";
import { BuffName } from "../../../../data/buffData";
import { DebuffName } from "../../../../data/debuffData";

type PlayerInfoProps = {};

const PlayerInfo: React.FC<PlayerInfoProps> = observer(() => {
    const {
        getCombinedStats,
        getPlayerObj,
        getDelta,
        gameTime,

        playerStats,
        playerBase,
        playerFlux,
        playerEconomy,
        playerMeta,
    } = useRootStore();

    // Daten holen:
    const combined = getCombinedStats(); // z.B. RootStore-Methode
    const selected = getPlayerObj();     // z.B. RootStore-Methode
    const delta = getDelta();            // z.B. RootStore-Methode
    const scalingFactor = getScalingFactor(playerBase.store.level);

    // Beispiel: Statt store.playerStats.luck => playerStatsStore.playerStats.luck
    // (type-sicherer Zugriff)
    const { attack, defense, luck } = playerStats.store;
    const { level, standing, maxLife, maxRounds } = playerBase.store;

    // Daten für Tabelle (bisher war es store.playerStats.*)
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

    // Event-Handler auf den neuen MobX-Stores aufrufen
    const handleLifeAdd = () => playerStats.updateLife(10);
    const handleLifeSub = () => playerStats.updateLife(-10);

    const handleRoundsAdd = () => playerStats.updateRounds(1);
    const handleRoundsSub = () => playerStats.updateRounds(-1);

    const handleNewDay = () => gameTime.newDay();
    const handleExp = () => playerBase.updateExp(50);

    const handleWeapon = () => playerFlux.updateWeapon("Besenstiel" as WeaponName);
    const handleWeapon2 = () => playerFlux.updateWeapon("Heugabel" as WeaponName);

    const handleBuff1 = () => playerFlux.updatePlayerBuff("Eisenhaut" as BuffName);
    const handleBuff2 = () => playerFlux.updatePlayerBuff("Kampfgeist" as BuffName);
    const handleDebuff1 = () => playerFlux.updatePlayerDebuff("Schwäche" as DebuffName);
    const handleDebuff2 = () => playerFlux.updatePlayerDebuff("Pechvogel" as DebuffName);

    const handleAddPilz = () => playerEconomy.updateItems("Pilz", 2);
    const handleRemovePilz = () => playerEconomy.updateItems("Pilz", -1);
    const handleAddStick = () => playerEconomy.updateItems("Stock", 1);

    const handleAddRep = () => playerBase.updateReputation(50);
    const handleSubRep = () => playerBase.updateReputation(-50);

    // Beispiel für Callback mit standing
    const reputationMessage = useCallback(() => {
        let message: string;
        const value = standing; // playerBaseStore.playerBase.standing

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

        return (
            <div className="mb-1 text-left">
                Dein {SYSTEM.Ruf} ist {message}
            </div>
        );
    }, [standing]);

    return (
        <div className="max-width">
            <h2>Dein Steckbrief</h2>

            <Header>
                {playerMeta.store.name} (Level {level})
            </Header>

            {/* Rasse */}
            <div className="mb-1 text-left">
                {selected.race.label}
                <br />
                {selected.race.description}
                <br />
                {selected.race.bonus}
            </div>

            {/* Herkunft */}
            <div className="mb-1 text-left">
                {selected.origin.label}
                <br />
                {selected.origin.description}
                <br />
                {selected.origin.bonus}
            </div>

            {/* Berufung */}
            <div className="mb-1 text-left">
                {selected.calling.label}
                <br />
                {selected.calling.description}
                <br />
                {selected.calling.bonus}
            </div>
            <br />

            {/* Ruf */}
            {reputationMessage()}
            <br />

            <Header>Kombinierte Statistiken</Header>
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
            </div>
            <br />

            {/* Aktive Buffs */}
            <h3>Aktive Buffs</h3>
            {selected.buffs.length > 0 ? (
                <>
                    {selected.buffs.map((buff) => (
                        <div key={buff.name}>
                            {buff.label} - {buff.description} (Dauer: {buff.currentDuration} Runden)
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
                            {debuff.label} - {debuff.description} (Dauer: {debuff.currentDuration} Runden)
                        </div>
                    ))}
                </>
            ) : (
                <p>Keine aktiven Debuffs</p>
            )}

            <br />
            <br />

            <Header>Meine Cheats</Header>

            {/* Beispiel: Spieler tot */}
            {combined.life <= 0 && <>TOT!!! <br /><br /></>}
            <br />
            Aktuelles scaling bei einem Wert von 10: {10 * scalingFactor}
            <br />
            <br />

            <table>
                <tbody>
                    <tr>
                        <td width={"50%"} style={{ verticalAlign: "top" }}>
                            <button className="btn-border" onClick={handleNewDay}>
                                Neuer Tag
                            </button>
                            <br />
                            <br />

                            <button className="btn-border" onClick={handleRoundsAdd}>
                                Runde +
                            </button>
                            <button className="btn-border" onClick={handleRoundsSub}>
                                Runde -
                            </button>

                            <button className="btn-border" onClick={handleExp}>
                                Erfahrung +
                            </button>

                            <button className="btn-border" onClick={handleLifeAdd}>
                                Leben +
                            </button>
                            <button className="btn-border" onClick={handleLifeSub}>
                                Leben -
                            </button>
                            <br />
                            <br />

                            <button className="btn-border" onClick={handleAddRep}>
                                Respekt +
                            </button>
                            <button className="btn-border" onClick={handleSubRep}>
                                Respekt -
                            </button>
                        </td>
                        <td>
                            <button className="btn-border" onClick={handleWeapon}>
                                Nimm eine Waffe
                            </button>
                            <button className="btn-border" onClick={handleWeapon2}>
                                Nimm eine andere Waffe
                            </button>
                            <button className="btn-border" onClick={handleBuff1}>
                                Bekomme Buff Eisenhaut
                            </button>
                            <button className="btn-border" onClick={handleBuff2}>
                                Bekomme Buff Kampfgeist
                            </button>
                            <button className="btn-border" onClick={handleDebuff1}>
                                Bekomme Debuff Schwäche
                            </button>
                            <button className="btn-border" onClick={handleDebuff2}>
                                Bekomme Debuff Pechvogel
                            </button>
                            <br />
                            <br />

                            <button className="btn-border" onClick={handleAddStick}>
                                Nimm Stock
                            </button>
                            <button className="btn-border" onClick={handleAddPilz}>
                                Nimm 2 Pilze
                            </button>
                            <button className="btn-border" onClick={handleRemovePilz}>
                                wirf einen Pilz weg
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
});

export default PlayerInfo;