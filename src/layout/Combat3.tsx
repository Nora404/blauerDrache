//#region imports
import React, { useState, useEffect } from "react";
import { EnemyName, Difficulty, Enemy, setEnemyLevel } from "../data/enemyData";
import { useRootStore } from "../store";
import AttackAnimation from "./AttackAnimation"; // Pfad ggf. anpassen
//#endregion

//#region prepare
type CombatProps = {
  enemyName: EnemyName;
  difficulty: Difficulty;
  level: number;
};

const Combat: React.FC<CombatProps> = ({ enemyName, difficulty, level }) => {
  const { playerMeta, playerBase, playerFlux, getCombinedStats } =
    useRootStore();

  const [enemy, setEnemy] = useState<Enemy | null>(null);
  const [rounds, setRounds] = useState<number>(0);

  const [logs, setLogs] = useState < Record<number, React.ReactNode>({});
  const [selectedLog, setSelectedLog] = useState<number>(1);

  const [isCombatRunning, setIsCombatRunning] = useState<boolean>(false);
  const [showAttackAnimation, setShowAttackAnimation] =
    useState<boolean>(false);
  //#endregion

  //#region useEffect
  useEffect(() => {
    const initEnemy = setEnemyLevel(enemyName, level, difficulty);
    setEnemy(initEnemy);
    const intro = `Du begegnest ${initEnemy.name}: ${initEnemy.description}`;
    setLogs({ 0: <div>{intro}</div> });
  }, [enemyName, difficulty, level]);
  //#endregion

  //#region functions
  const finishRound = () => {};

  const playerAttack = () => {
    if (!enemy || isCombatRunning) return;
    setShowAttackAnimation(true);
  };

  // Diese Funktion wird aufgerufen, sobald die Animation fertig ist.
  const completePlayerAttack = () => {
    setShowAttackAnimation(false);

    const damage = Math.floor(Math.random() * 4) + 1;
    const updatedEnemy = { ...enemy!, life: enemy!.life - damage };
    setEnemy(updatedEnemy);
  };

  const enemyAttack = () => {};

  const flee = () => {};

  const getSelectedRoundLogs = () => {};

  const renderRoundButtons = () => {
    const buttons = [];
    for (let i = 1; i <= 10; i++) {
      let bgColor = "battle-btn-inactive";
      if (i < currentRoundNumber) {
        bgColor = "battle-btn-active"; // Abgeschlossene Runde: grün
      } else if (i === currentRoundNumber && !combatEnded) {
        bgColor = "battle-btn-current"; // Aktuelle Runde: blau
      } else if (combatEnded && i === currentRoundNumber) {
        bgColor = "battle-btn-finished"; // Bei Kampfende als abgeschlossen markieren
      }
      buttons.push(
        <button
          key={i}
          className={`btn-border battle-btn ${bgColor}`}
          onClick={() => {
            if (i <= currentRoundNumber) setSelectedLog(i);
          }}
        >
          {i}
        </button>
      );
    }
    return buttons;
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
            <span style={{ fontSize: "150%" }}>LP: {playerLife}</span>
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
          <AttackAnimation duration={1000} onComplete={completePlayerAttack} />
        ) : (
          <h3>Runden-Log (Runde {selectedLog}):</h3>
        )}
      </div>

      {/* Anzeige des Logs der ausgewählten Runde */}
      <div className="felx-top">
        {getSelectedRoundLogs().map((entry, index) => (
          <p key={index}>{entry}</p>
        ))}
      </div>

      {/* Aktionsbuttons */}
      <div className="combat-actions">
        {!combatEnded && (
          <div className="battle-actions">
            <div className="battle-actions-col">
              <button
                onClick={playerAttack}
                className="btn-border battle-actions-btn"
                disabled={!playerTurn || showAttackAnimation}
              >
                Mit {playerFlux.data.weapon} Angreifen
              </button>
              <button className="btn-border battle-actions-btn">
                Mit {playerFlux.data.armor} Verteidigen
              </button>
              <button className="btn-border battle-actions-btn">
                Fähigkeit einsetzen
              </button>
            </div>
            <div className="battle-actions-col">
              <button className="btn-border battle-actions-btn">
                Aus dem Beutel nutzen
              </button>
              <button className="btn-border battle-actions-btn">
                {playerFlux.data.item} nutzen
              </button>
              <button onClick={flee} className="btn-border battle-actions-btn">
                Fliehen
              </button>
            </div>
          </div>
        )}
        {combatEnded && <p>Kampf beendet.</p>}
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
