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

  const [playerLife, setPlayerLife] = useState<number>(100);
  const [enemy, setEnemy] = useState<Enemy | null>(null);
  const [rounds, setRounds] = useState<string[][]>([]);
  const [currentRoundLogs, setCurrentRoundLogs] = useState<string[]>([]);
  const [currentRoundNumber, setCurrentRoundNumber] = useState<number>(1);
  const [selectedRound, setSelectedRound] = useState<number>(1);
  const [combatEnded, setCombatEnded] = useState<boolean>(false);
  const [playerTurn, setPlayerTurn] = useState<boolean>(true);
  // Neuer State: Steuert, ob die Angriff-Animation angezeigt wird
  const [showAttackAnimation, setShowAttackAnimation] =
    useState<boolean>(false);
  //#endregion

  //#region useEffect
  useEffect(() => {
    const initEnemy = setEnemyLevel(enemyName, level, difficulty);
    setEnemy(initEnemy);
    const intro = `Du begegnest ${initEnemy.name}: ${initEnemy.description}`;
    setCurrentRoundLogs([intro]);
    setRounds([]);
    setCurrentRoundNumber(1);
    setSelectedRound(1);
    setCombatEnded(false);
    setPlayerLife(100);
    setPlayerTurn(true);
    setShowAttackAnimation(false);
  }, [enemyName, difficulty, level]);
  //#endregion

  //#region functions
  const finishRound = () => {
    const finishedLogs = [...currentRoundLogs];
    setRounds((prev) => [...prev, finishedLogs]);
    setSelectedRound(currentRoundNumber);
    setCurrentRoundLogs([]);
    setCurrentRoundNumber((prevRound) => {
      if (prevRound >= 10) {
        setCombatEnded(true);
        return prevRound;
      }
      return prevRound + 1;
    });
    setPlayerTurn(true);
  };

  // Wird beim Klick auf "Angreifen" aufgerufen – statt den Schaden direkt zu berechnen,
  // aktivieren wir zunächst die Animation.
  const playerAttack = () => {
    if (!enemy || combatEnded) return;
    setPlayerTurn(false);
    setShowAttackAnimation(true);
  };

  // Diese Funktion wird aufgerufen, sobald die Animation fertig ist.
  const completePlayerAttack = () => {
    setShowAttackAnimation(false);
    const damage = Math.floor(Math.random() * 4) + 1;
    setCurrentRoundLogs((prev) => [
      ...prev,
      `Du greifst an und verursachst ${damage} Schaden.`,
    ]);
    const updatedEnemy = { ...enemy!, life: enemy!.life - damage };
    setEnemy(updatedEnemy);
    setCurrentRoundLogs((prev) => [
      ...prev,
      `${enemy!.name} hat noch ${
        updatedEnemy.life > 0 ? updatedEnemy.life : 0
      } LP.`,
    ]);
    if (updatedEnemy.life <= 0) {
      setCurrentRoundLogs((prev) => [
        ...prev,
        `${enemy!.name} wurde besiegt! Du erhältst ${enemy!.exp} EP und ${
          enemy!.gold
        } Gold.`,
      ]);
      setCombatEnded(true);
      // finishRound();
      return;
    }
    // Gegner greift nach 1 Sekunde an
    setTimeout(enemyAttack, 1000);
  };

  const enemyAttack = () => {
    if (!enemy || combatEnded) return;
    const damage = Math.floor(Math.random() * 3) + 1;
    setCurrentRoundLogs((prev) => [
      ...prev,
      `${enemy!.name} greift an und verursacht ${damage} Schaden.`,
    ]);
    const newPlayerLife = playerLife - damage;
    setPlayerLife(newPlayerLife);
    setCurrentRoundLogs((prev) => [
      ...prev,
      `Du hast noch ${newPlayerLife > 0 ? newPlayerLife : 0} LP.`,
    ]);
    if (newPlayerLife <= 0) {
      setCurrentRoundLogs((prev) => [...prev, `Du bist besiegt!`]);
      setCombatEnded(true);
      finishRound();
      return;
    }
    finishRound();
  };

  const flee = () => {
    if (combatEnded) return;
    setCurrentRoundLogs((prev) => [
      ...prev,
      `Du hast versucht zu fliehen. Kampf beendet.`,
    ]);
    setCombatEnded(true);
    finishRound();
  };

  const getSelectedRoundLogs = (): string[] => {
    if (selectedRound < currentRoundNumber) {
      return rounds[selectedRound - 1] || [];
    } else if (selectedRound === currentRoundNumber) {
      return currentRoundLogs;
    }
    return [];
  };

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
            if (i <= currentRoundNumber) setSelectedRound(i);
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
          <h3>Runden-Log (Runde {selectedRound}):</h3>
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
