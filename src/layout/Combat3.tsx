//#region imports
import React, { useState, useEffect } from "react";
import {
  EnemyName,
  Difficulty,
  Enemy,
  setEnemyLevel,
  emptyEnemyObj,
} from "../data/enemyData";
import { useRootStore } from "../store";
import AttackAnimation from "./AttackAnimation"; // Pfad ggf. anpassen
//#endregion

//#region prepare

type Interaction = "attack" | "defense" | "skill" | "item" | "hand" | "flee";

type CombatProps = {
  enemyName: EnemyName;
  difficulty: Difficulty;
  level: number;
};

const Combat: React.FC<CombatProps> = ({ enemyName, difficulty, level }) => {
  const { playerMeta, playerBase, playerFlux, playerStats, getCombinedStats } =
    useRootStore();

  const combinedStats = getCombinedStats();

  const [enemy, setEnemy] = useState<Enemy>(emptyEnemyObj);
  const [rounds, setRounds] = useState<number>(0);

  const [logs, setLogs] = useState<Record<number, React.ReactNode>>({});
  const [tempLog, setTempLog] = useState<string>("");
  const [selectedLog, setSelectedLog] = useState<number>(0);

  const [isCombatEnded, setIsCombatEnded] = useState<boolean>(false);
  const [showAttackAnimation, setShowAttackAnimation] =
    useState<boolean>(false);
  const [interaction, setInteraction] = useState<Interaction>("attack");
  //#endregion

  //#region useEffect
  useEffect(() => {
    const initEnemy = setEnemyLevel(enemyName, level, difficulty);
    setEnemy(initEnemy);
    const intro = `Du begegnest ${initEnemy.name}: ${initEnemy.description}`;
    setLogs({ 0: <div>{intro}</div> });
  }, [enemyName, difficulty, level]);
  //#endregion

  //#region helper
  const rollDice = () => Math.floor(Math.random() * 100) + 1;

  const multiplier = (bonus: number) => {
    const result = rollDice() - bonus;
    if (result > 40) return 0.4;
    if (result > 20) return 0.8;
    if (result >= -20) return 1;
    if (result >= -40) return 1.4;
    return 1.8;
  };
  //#endregion

  //#region processRound
  const startRound = () => {
    if (!enemy || isCombatEnded) return;
    setTempLog(""); // Log-Text für neuen Round zurücksetzen
    setShowAttackAnimation(true);
    setRounds((prev) => prev + 1);
  };

  const processRound = () => {
    setShowAttackAnimation(false);
    if (enemy) {
      let roundLog = ""; // Lokale Variable für den Log-Text

      const playerFirstStrike =
        (combinedStats.luck || 0) + (playerBase.data.level - enemy.level);
      const enemyFirstStrike =
        (enemy.luck || 0) + (enemy.level - playerBase.data.level);

      const playerRoll = rollDice();
      const enemyRoll = rollDice();

      const playerChance = playerRoll + playerFirstStrike;
      const enemyChance = enemyRoll + enemyFirstStrike;

      const firstStrike: "player" | "enemy" =
        playerChance >= enemyChance ? "player" : "enemy";

      if (firstStrike === "player") {
        roundLog += "Du hast den Erstschlag! ";
        roundLog += playerAttack(); // attack gibt Log-Text zurück
        roundLog += enemyAttack();
      } else {
        roundLog += "Dein Gegner hat den Erstschlag! ";
        roundLog += enemyAttack();
        roundLog += playerAttack();
      }

      // Setze den kompletten Log-Text einmalig
      setTempLog(roundLog);
    }
    finishRound();
  };

  // Attack-Funktionen so anpassen, dass sie den Log-Text zurückgeben
  const enemyAttack = () => {
    const rawAttack = Math.floor(enemy.attack * multiplier(enemy.luck));
    const attack = Math.max(0, rawAttack - combinedStats.defense); // negative Werte vermeiden
    playerStats.updateLife(-attack);
    return `Dein Gegner hat ${attack} Schaden angerichtet. `;
  };

  const playerAttack = () => {
    const rawAttack = Math.floor(
      combinedStats.attack * multiplier(combinedStats.luck)
    );
    const attack = Math.max(0, rawAttack - enemy.defense);
    const updatedEnemy = { ...enemy, life: enemy.life - attack };
    setEnemy(updatedEnemy);
    return `Du hast ${attack} Schaden verteilt. `;
  };

  const finishRound = () => {
    console.log("🔍 tempLog: ", tempLog);
    createLog();
    setSelectedLog(rounds);
    if (rounds === 10) {
      setIsCombatEnded(true);
    }
  };
  //#endregion

  //#region log
  const createLog = () => {
    const log = (
      <div>
        Du hast dich für {interaction} entschieden.
        <br />
        {tempLog}
      </div>
    );
    setLogs((prev) => ({ ...prev, [rounds]: log }));
  };

  const getSelectedRoundLogs = () => {
    return logs[selectedLog] || <div>Kein Log für diese Runde</div>;
  };

  const renderRoundButtons = () => {
    return Array.from({ length: 10 }, (_, i) => {
      const roundNumber = i + 1;
      let bgColor = "battle-btn-inactive";

      if (roundNumber < rounds) {
        bgColor = "battle-btn-active"; // Abgeschlossene Runde: grün
      } else if (roundNumber === rounds && !isCombatEnded) {
        bgColor = "battle-btn-current"; // Aktuelle Runde: blau
      } else if (isCombatEnded && roundNumber === rounds) {
        bgColor = "battle-btn-finished"; // Kampf ist beendet
      }

      return (
        <button
          key={roundNumber}
          className={`btn-border battle-btn ${bgColor}`}
          onClick={() => {
            if (roundNumber <= rounds) {
              setSelectedLog(roundNumber);
            }
          }}
        >
          {roundNumber}
        </button>
      );
    });
  };

  //#endregion

  //#region interaction
  const handleAttack = () => {
    setInteraction("attack");
    startRound();
  };

  const handleDefense = () => {
    setInteraction("defense");
    startRound();
  };

  const handleSkill = () => {
    setInteraction("skill");
    startRound();
  };

  const handleItem = () => {
    setInteraction("item");
    startRound();
  };

  const handleHand = () => {
    setInteraction("hand");
    startRound();
  };

  const handleFlee = () => {
    setInteraction("flee");
    startRound();
  };

  //#endregion

  //#region jsx
  return (
    <div className="max-width">
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1 1 0", textAlign: "left" }}>
          <p>
            {playerMeta.data.name} (Level {playerBase.data.level})
            <br />
            <span style={{ fontSize: "150%" }}>LP: {combinedStats.life}</span>
          </p>
        </div>
        <div
          style={{ flex: "0 1 auto", textAlign: "center", padding: "0 10px" }}
        >
          <strong>VS</strong>
        </div>
        <div style={{ flex: "1 1 0", textAlign: "right" }}>
          {enemy && (
            <p>
              {enemy.name} (Level {enemy.level})
              <br />
              <span style={{ fontSize: "150%" }}>LP: {enemy.life}</span>
            </p>
          )}
        </div>
      </div>

      {/* Rundennavigation */}
      <div className="round-buttons flex-row" style={{ marginBottom: "1rem" }}>
        {renderRoundButtons()}
      </div>

      {/* Hier wird die Animation angezeigt, falls aktiv */}
      <div style={{ height: "40px", padding: 0, margin: 0 }}>
        {showAttackAnimation ? (
          <AttackAnimation duration={1000} onComplete={processRound} />
        ) : (
          <h3>Log der letzten Runde (Runde {selectedLog}):</h3>
        )}
      </div>

      {/* Anzeige des Logs der ausgewählten Runde */}
      <div className="flex-top">{getSelectedRoundLogs()}</div>

      {/* Aktionsbuttons */}
      <div className="combat-actions">
        {!isCombatEnded && (
          <div className="battle-actions">
            <div className="battle-actions-col">
              <button
                onClick={handleAttack}
                className="btn-border battle-actions-btn"
              >
                Mit {playerFlux.data.weapon} Angreifen
              </button>
              <button
                onClick={handleDefense}
                className="btn-border battle-actions-btn"
              >
                Mit {playerFlux.data.armor} Verteidigen
              </button>
              <button
                onClick={handleSkill}
                className="btn-border battle-actions-btn"
              >
                Fähigkeit einsetzen
              </button>
            </div>
            <div className="battle-actions-col">
              <button
                onClick={handleItem}
                className="btn-border battle-actions-btn"
              >
                Aus dem Beutel nutzen
              </button>
              <button
                onClick={handleHand}
                className="btn-border battle-actions-btn"
              >
                {playerFlux.data.item} nutzen
              </button>
              <button
                onClick={handleFlee}
                className="btn-border battle-actions-btn"
              >
                Fliehen
              </button>
            </div>
          </div>
        )}
        {isCombatEnded && <p>Kampf beendet.</p>}
      </div>
      <p style={{ color: "#151820" }}>
        .......................................................................................................
        .......................................................................................................
        .......................................................................................................
      </p>
    </div>
  );
};
//#endregion
export default Combat;
