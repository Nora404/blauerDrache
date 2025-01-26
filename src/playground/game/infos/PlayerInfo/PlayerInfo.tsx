import React, { useCallback } from "react";
import { observer } from "mobx-react-lite";
import Header from "../../../../layout/Header/Header";
import TableRow from "./TableRow";
import { SYSTEM } from "../../../../data/helper/colorfullStrings";
import "./PlayerInfo.css";
import { useRootStore } from "../../../../store";

type PlayerInfoProps = {};

const PlayerInfo: React.FC<PlayerInfoProps> = observer(() => {
  const {
    getCombinedStats,
    getPlayerObj,
    getDelta,

    playerStats,
    playerBase,

    playerMeta,
  } = useRootStore();

  // Daten holen:
  const combined = getCombinedStats();
  const selected = getPlayerObj();
  const delta = getDelta();

  const { attack, defense, luck } = playerStats.data;
  const { level, ruf: standing, maxLife, maxRounds } = playerBase.data;

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
      message =
        "so schlecht wie es nur irgendwie geht. Jeder will dich tot sehen";
    }

    return (
      <span>
        Dein {SYSTEM.Ruf} ist {message}
      </span>
    );
  }, [standing]);

  return (
    <div className="max-width">
      <h2>Dein Steckbrief</h2>
      <Header>
        {playerMeta.data.name} (Level {level})
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

      <div className="mb-1 text-left">
        {reputationMessage()}<br />
        Dein Geist und deine Stimmung sind heute {selected.feeling.label}.{" "}
        {selected.feeling.bonus}. <br />
      </div>


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
      <Header>Aktive Buffs</Header>
      {selected.buffs.length > 0 ? (
        <p>
          {selected.buffs.map((buff) => (
            <div key={buff.name}>
              {buff.label} - {buff.description} (Dauer: {buff.currentDuration}{" "}
              Runden)
            </div>
          ))}
        </p>
      ) : (
        <p>Keine aktiven Buffs</p>
      )}
      {/* Aktive Debuffs */}
      <Header>Aktive Debuffs</Header>
      {selected.debuffs.length > 0 ? (
        <p>
          {selected.debuffs.map((debuff) => (
            <div key={debuff.name}>
              {debuff.label} - {debuff.description} (Dauer:{" "}
              {debuff.currentDuration} Runden)
            </div>
          ))}
        </p>
      ) : (
        <p>Keine aktiven Debuffs</p>
      )}
    </div>
  );
});

export default PlayerInfo;
