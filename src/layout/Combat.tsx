//#region imports
import React, { useState, useEffect } from "react";
import { EnemyName, Difficulty, Enemy, setEnemyLevel } from "../data/enemyData";
import { useRootStore } from "../store";
//#endregion

//#region prepare
type CombatProps = {
  enemyName: EnemyName;
  difficulty: Difficulty;
  level: number;
};

const Combat: React.FC<CombatProps> = ({ enemyName, difficulty, level }) => {
  const { playerMeta, playerBase, playerFlux, getCombinedStats} = useRootStore();
  

  const [playerLife, setPlayerLife] = useState<number>(100);
  const [enemy, setEnemy] = useState<Enemy | null>(null);
  const [rounds, setRounds] = useState<string[][]>([]);
  const [currentRoundLogs, setCurrentRoundLogs] = useState<string[]>([]);
  const [currentRoundNumber, setCurrentRoundNumber] = useState<number>(1);
  const [selectedRound, setSelectedRound] = useState<number>(1);
  const [combatEnded, setCombatEnded] = useState<boolean>(false);
  const [playerTurn, setPlayerTurn] = useState<boolean>(true);
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
  }, [enemyName, difficulty, level]);
//#endregion

//#region functions
  const finishRound = () => {
    setRounds((prev) => [...prev, currentRoundLogs]);
    setCurrentRoundNumber((prevRound) => {
      if (prevRound >= 10) {
        setCombatEnded(true);
        return prevRound;
      } else {
        const newRound = prevRound + 1;
        setSelectedRound(newRound);
        setCurrentRoundLogs([]); // Log für die neue Runde leeren
        setPlayerTurn(true);
        return newRound;
      }
    });
  };

  const playerAttack = () => {
    if (!enemy || combatEnded) return;
    setPlayerTurn(false);

    const damage = Math.floor(Math.random() * 4) + 1;
    setCurrentRoundLogs((prev) => [
      ...prev,
      `Du greifst an und verursachst ${damage} Schaden.`,
    ]);
    const updatedEnemy = { ...enemy, life: enemy.life - damage };
    setEnemy(updatedEnemy);

    // Log: verbleibende Lebenspunkte des Gegners
    setCurrentRoundLogs((prev) => [
      ...prev,
      `${enemy.name} hat noch ${
        updatedEnemy.life > 0 ? updatedEnemy.life : 0
      } LP.`,
    ]);

    if (updatedEnemy.life <= 0) {
      setCurrentRoundLogs((prev) => [
        ...prev,
        `${enemy.name} wurde besiegt! Du erhältst ${enemy.exp} EP und ${enemy.gold} Gold.`,
      ]);
      setCombatEnded(true);
      finishRound();
      return;
    }
    // Nach 1 Sekunde greift der Gegner an
    setTimeout(enemyAttack, 1000);
  };

  const enemyAttack = () => {
    if (!enemy || combatEnded) return;
    const damage = Math.floor(Math.random() * 3) + 1;
    setCurrentRoundLogs((prev) => [
      ...prev,
      `${enemy.name} greift an und verursacht ${damage} Schaden.`,
    ]);
    const newPlayerLife = playerLife - damage;
    setPlayerLife(newPlayerLife);

    // Log: verbleibende Lebenspunkte des Spielers
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
      let bgColor = "#7F8C8A"; // Standard: Runde noch nicht gespielt
      if (i < currentRoundNumber) {
        bgColor = "#5B8C61"; // Abgeschlossene Runde: grün
      } else if (i === currentRoundNumber && !combatEnded) {
        bgColor = "#8D5BC2"; // Aktuelle Runde: blau
      } else if (combatEnded && i === currentRoundNumber) {
        bgColor = "#56668C"; // Bei Kampfende als abgeschlossen markieren
      }
      buttons.push(
        <button
          key={i}
          className="btn-border"
          onClick={() => {
            if (i <= currentRoundNumber) setSelectedRound(i);
          }}
          style={{
            margin: "0 4px",
            backgroundColor: selectedRound === i ? "#4669B5" : bgColor,
            border: "1px solid #333",
            padding: "4px 8px",
            cursor: i <= currentRoundNumber ? "pointer" : "default",
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
    <div className="w-full" style={{width: "100%"}}>

<div style={{ display: "flex", alignItems: "center" }}>
  <div style={{ flex: "1 1 0", textAlign: "left" }}>
    <p>{playerMeta.data.name} (Level {playerBase.data.level})<br/><span style={{fontSize: "150%"}}>LP: {playerLife}</span></p>
  </div>
  <div style={{ flex: "0 1 auto", textAlign: "center", padding: "0 10px" }}>
    <strong>VS</strong>
  </div>
  <div style={{ flex: "1 1 0", textAlign: "right" }}>
    {enemy && (
      <p>
        {enemy.name} (Level {enemy.level})<br/><span style={{fontSize: "150%"}}>LP: {enemy.life}</span>
      </p>
    )}
  </div>
</div>


      <hr className="w-full"/>

      {/* Gegnerbeschreibung */}
      <div className="enemy-description">
        {enemy && <p>{enemy.description}{enemy.description}{enemy.description}{enemy.description}</p>}
      </div>

      {/* Rundennavigation */}
      <div className="round-buttons flex-row" style={{ marginBottom: "1rem" }}>
        {renderRoundButtons()}
      </div>

      {/* Anzeige des Logs der ausgewählten Runde */}
      <div className="felx-top">
        <h3>Runden-Log (Runde {selectedRound}):</h3>
        {getSelectedRoundLogs().map((entry, index) => (
          <p key={index}>{entry}</p>
        ))}
      </div>

      {/* Aktionsbuttons */}
      <div className="combat-actions">
        {!combatEnded && (
          <div className="battle-actions">
  <div className="battle-actions-col">
    <button onClick={playerAttack} className="btn-border battle-actions-btn">
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
    </div>
  );
};
//#endregion
export default Combat;
