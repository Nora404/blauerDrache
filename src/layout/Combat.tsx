// Combat.tsx
import React, { useState, useEffect } from "react";
import { EnemyName, Difficulty, Enemy, setEnemyLevel } from "../data/enemyData";

type CombatProps = {
  enemyName: EnemyName;
  difficulty: Difficulty;
  level: number;
};

const Combat: React.FC<CombatProps> = ({ enemyName, difficulty, level }) => {
  // Annahme: Spieler startet mit 100 Lebenspunkten (z. B. aus einem PlayerStore)
  const [playerLife, setPlayerLife] = useState<number>(100);
  const [enemy, setEnemy] = useState<Enemy | null>(null);

  // Speichert die Logs jeder Runde (abgeschlossene Runden) als Array von Log-Zeilen
  const [rounds, setRounds] = useState<string[][]>([]);
  // Speichert den Log der aktuellen Runde
  const [currentRoundLogs, setCurrentRoundLogs] = useState<string[]>([]);

  // Rundenzähler: aktuelle Runde und welche Runde gerade im Log angezeigt wird
  const [currentRoundNumber, setCurrentRoundNumber] = useState<number>(1);
  const [selectedRound, setSelectedRound] = useState<number>(1);
  const [combatEnded, setCombatEnded] = useState<boolean>(false);
  const [playerTurn, setPlayerTurn] = useState<boolean>(true);

  // Initialisierung: Gegner wird anhand der Props erstellt und alle Zustände zurückgesetzt.
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

  // Hilfsfunktion: Schließt die aktuelle Runde ab und bereitet die nächste vor.
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

  // Spieler greift an
  const playerAttack = () => {
    if (!enemy || combatEnded) return;
    setPlayerTurn(false);
    // Berechne Schaden zwischen 1 und 4
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

  // Gegner greift an
  const enemyAttack = () => {
    if (!enemy || combatEnded) return;
    // Berechne Schaden zwischen 1 und 3
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

  // Flucht-Option
  const flee = () => {
    if (combatEnded) return;
    setCurrentRoundLogs((prev) => [
      ...prev,
      `Du hast versucht zu fliehen. Kampf beendet.`,
    ]);
    setCombatEnded(true);
    finishRound();
  };

  // Gibt den Log der ausgewählten Runde zurück:
  // Wenn die Runde abgeschlossen ist, wird der gespeicherte Log aus "rounds" zurückgegeben,
  // ansonsten der aktuelle Log.
  const getSelectedRoundLogs = (): string[] => {
    if (selectedRound < currentRoundNumber) {
      return rounds[selectedRound - 1] || [];
    } else if (selectedRound === currentRoundNumber) {
      return currentRoundLogs;
    }
    return [];
  };

  // Rendert 10 nummerierte Buttons, die anzeigen, welche Runde gerade gespielt wurde.
  // Die Buttons bekommen eine farbliche Markierung, sodass abgeschlossene Runden (grün),
  // die aktuelle Runde (blau) und die ausgewählte Runde (orange) hervorgehoben werden.
  const renderRoundButtons = () => {
    const buttons = [];
    for (let i = 1; i <= 10; i++) {
      let bgColor = "#ccc"; // Standard: Runde noch nicht gespielt
      if (i < currentRoundNumber) {
        bgColor = "#8f8"; // Abgeschlossene Runde: grün
      } else if (i === currentRoundNumber && !combatEnded) {
        bgColor = "#88f"; // Aktuelle Runde: blau
      } else if (combatEnded && i === currentRoundNumber) {
        bgColor = "#8f8"; // Bei Kampfende als abgeschlossen markieren
      }
      buttons.push(
        <button
          key={i}
          onClick={() => {
            if (i <= currentRoundNumber) setSelectedRound(i);
          }}
          style={{
            margin: "0 4px",
            backgroundColor: selectedRound === i ? "orange" : bgColor,
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

  return (
    <div className="combat-component">
      {/* Kopfzeile: Anzeige von Spieler- und Gegnerdaten */}
      <div className="combat-header flex-row">
        <div className="player-info">
          <p>Deine Lebenspunkte: {playerLife}</p>
        </div>
        <div className="vs">
          <strong>VS</strong>
        </div>
        <div className="enemy-info">
          {enemy && (
            <p>
              {enemy.name} (Level {enemy.level}) – LP: {enemy.life}
            </p>
          )}
        </div>
      </div>

      {/* Gegnerbeschreibung */}
      <div className="enemy-description">
        {enemy && <p>{enemy.description}</p>}
      </div>

      {/* Rundennavigation */}
      <div className="round-buttons flex-row" style={{ marginBottom: "1rem" }}>
        {renderRoundButtons()}
      </div>

      {/* Anzeige des Logs der ausgewählten Runde */}
      <div className="combat-log">
        <h3>Runden-Log (Runde {selectedRound}):</h3>
        {getSelectedRoundLogs().map((entry, index) => (
          <p key={index}>{entry}</p>
        ))}
      </div>

      {/* Aktionsbuttons */}
      <div className="combat-actions">
        {playerTurn && !combatEnded && (
          <>
            <button onClick={playerAttack} className="btn-border">
              Angreifen
            </button>
            <button onClick={flee} className="btn-border">
              Fliehen
            </button>
          </>
        )}
        {combatEnded && <p>Kampf beendet.</p>}
      </div>
    </div>
  );
};

export default Combat;
