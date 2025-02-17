// Combat.tsx
import React, { useState, useEffect } from "react";
import { EnemyName, Difficulty, Enemy, setEnemyLevel } from "../data/enemyData";

type CombatProps = {
  enemyName: EnemyName;
  difficulty: Difficulty;
  level: number;
};

const Combat: React.FC<CombatProps> = ({ enemyName, difficulty, level }) => {
  // Annahme: Spieler startet mit 100 Lebenspunkten (kannst du z. B. aus deinem PlayerStore holen)
  const [playerLife, setPlayerLife] = useState<number>(100);
  const [enemy, setEnemy] = useState<Enemy | null>(null);
  const [combatLog, setCombatLog] = useState<string[]>([]);
  const [playerTurn, setPlayerTurn] = useState<boolean>(true);
  const [combatEnded, setCombatEnded] = useState<boolean>(false);

  // Initialisiert den Gegner anhand der Props
  useEffect(() => {
    const initEnemy = setEnemyLevel(enemyName, level, difficulty);
    setEnemy(initEnemy);
    setCombatLog([`Du begegnest ${initEnemy.name}: ${initEnemy.description}`]);
    setPlayerTurn(true);
    setCombatEnded(false);
  }, [enemyName, difficulty, level]);

  // Spieler greift an
  const playerAttack = () => {
    if (!enemy || combatEnded) return;
    // Beispielhafte Schadensberechnung: Schaden zwischen 1 und 4
    const damage = Math.floor(Math.random() * 4) + 1;
    setCombatLog((prev) => [
      ...prev,
      `Du greifst an und verursachst ${damage} Schaden.`,
    ]);
    const updatedEnemy = { ...enemy, life: enemy.life - damage };
    setEnemy(updatedEnemy);

    if (updatedEnemy.life <= 0) {
      setCombatLog((prev) => [
        ...prev,
        `${enemy.name} wurde besiegt! Du erhältst ${enemy.exp} EP und ${enemy.gold} Gold.`,
      ]);
      setCombatEnded(true);
      return;
    }
    setPlayerTurn(false);
    // Lasse den Gegner nach kurzer Verzögerung angreifen
    setTimeout(enemyAttack, 1000);
  };

  // Gegner greift an
  const enemyAttack = () => {
    if (!enemy || combatEnded) return;
    // Beispielhafte Schadensberechnung: Schaden zwischen 1 und 3
    const damage = Math.floor(Math.random() * 3) + 1;
    setCombatLog((prev) => [
      ...prev,
      `${enemy.name} greift an und verursacht ${damage} Schaden.`,
    ]);
    const newPlayerLife = playerLife - damage;
    setPlayerLife(newPlayerLife);
    if (newPlayerLife <= 0) {
      setCombatLog((prev) => [...prev, `Du bist besiegt!`]);
      setCombatEnded(true);
      return;
    }
    setPlayerTurn(true);
  };

  // Flucht-Option
  const flee = () => {
    if (combatEnded) return;
    setCombatLog((prev) => [
      ...prev,
      `Du hast versucht zu fliehen. Kampf beendet.`,
    ]);
    setCombatEnded(true);
  };

  return (
    <div className="combat-component">
      {/* Kopfzeile: Spieler & Gegner */}
      <div className="combat-header">
        <div className="player-info">
          <p>Deine Lebenspunkte: {playerLife}</p>
        </div>
        <div className="vs">
          <strong>VS</strong>
        </div>
        <div className="enemy-info">
          {enemy && (
            <>
              <p>
                {enemy.name} (Level {enemy.level})
              </p>
              <p>Lebenspunkte: {enemy.life}</p>
            </>
          )}
        </div>
      </div>

      {/* Gegnerbeschreibung */}
      <div className="enemy-description">
        {enemy && <p>{enemy.description}</p>}
      </div>

      {/* Kampflog */}
      <div className="combat-log">
        <h3>Runden-Log:</h3>
        {combatLog.map((entry, index) => (
          <p key={index}>{entry}</p>
        ))}
      </div>

      {/* Aktionsbuttons */}
      <div className="combat-actions">
        {playerTurn && !combatEnded && (
          <>
            <button onClick={playerAttack}>Angreifen</button>
            <button onClick={flee}>Fliehen</button>
            {/* Optional: Button für Item-Nutzung */}
          </>
        )}
        {combatEnded && <p>Kampf beendet.</p>}
      </div>
    </div>
  );
};

export default Combat;
