import React, { useState } from "react";
import AttackAnimation from "./AttackAnimation"; // Annahme: existiert bereits
import { useRootStore } from "../store"; // Beispielimport

// Hilfsfunktionen
const rollDice = () => Math.floor(Math.random() * 100) + 1;

const computeMultiplier = (dice: number, bonus: number): number => {
  const result = dice - bonus;
  // Wenn das Ergebnis positiv ist, also eher "unglücklich", wird der Schaden reduziert
  if (result > 40) return 0.4;
  if (result > 20) return 0.8;
  // Bei einem Ergebnis zwischen -20 und 20: Normal (Multiplier 1)
  if (result >= -20) return 1;
  if (result >= -40) return 1.4;
  return 1.8;
};

const isSuccess = (dice: number, bonus: number): boolean => dice - bonus < 0;

export const CombatComponent: React.FC = () => {
  // Store-Daten
  const {
    playerMeta,
    playerBase,
    playerFlux,
    playerEconomy,
    getCombinedStats,
  } = useRootStore();
  const combinedStats = getCombinedStats();

  // Für Demo-Zwecke initialer Gegner (neu mit Level, etc.)
  const initialEnemy = {
    name: "Goblin",
    description: "Ein fieser Goblin",
    level: playerBase.data.level, // z. B. auf Spielerniveau
    life: 50,
    attack: 10,
    defense: 5,
    luck: 20,
    skill: [],
    exp: 20,
    gold: 10,
    loot: [],
  };

  // Lokaler Zustand
  const [enemy, setEnemy] = useState(initialEnemy);
  const [currentRound, setCurrentRound] = useState(1);
  const [selectedRound, setSelectedRound] = useState(1);
  const [combatEnded, setCombatEnded] = useState(false);
  const [logs, setLogs] = useState<Record<number, React.ReactNode[]>>({});
  const [showAttackAnimation, setShowAttackAnimation] = useState(false);
  const [selectedAction, setSelectedAction] = useState<
    "attack" | "defend" | "skill" | "item" | "use" | "flee" | null
  >(null);
  const [playerLife, setPlayerLife] = useState(combinedStats.life);
  const [enemyLife, setEnemyLife] = useState(enemy.life);
  // Um asynchrone Log-Ergänzungen (z. B. bei Angriff) zwischenzuspeichern
  const [currentRoundActionLog, setCurrentRoundActionLog] = useState<string[]>(
    []
  );

  // Rendern der Rundentaster
  const renderRoundButtons = () => {
    const buttons = [];
    for (let i = 1; i <= 10; i++) {
      let bgColor = "battle-btn-inactive";
      if (i < currentRound) {
        bgColor = "battle-btn-active"; // Abgeschlossene Runde: grün
      } else if (i === currentRound && !combatEnded) {
        bgColor = "battle-btn-current"; // Aktuelle Runde: blau
      } else if (combatEnded && i === currentRound) {
        bgColor = "battle-btn-finished"; // Bei Kampfende als abgeschlossen markieren
      }
      buttons.push(
        <button
          key={i}
          className={`btn-border battle-btn ${bgColor}`}
          onClick={() => {
            if (i <= currentRound) setSelectedRound(i);
          }}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  const getSelectedRoundLogs = () => {
    return logs[selectedRound] || [];
  };

  // Funktionen für die Aktionen
  const executePlayerAction = (roundLog: string[]) => {
    if (selectedAction === "defend") {
      const dice = rollDice();
      const bonus = combinedStats.luck + (playerBase.data.level - enemy.level);
      const multiplier = computeMultiplier(dice, bonus);
      roundLog.push(
        `Spieler verteidigt mit ${
          playerFlux.data.armor
        } (Multiplikator: ${multiplier.toFixed(2)}).`
      );
      // Hier könnte man z. B. einen temporären Verteidigungsbonus speichern.
    } else if (selectedAction === "skill") {
      roundLog.push("Spieler setzt Fähigkeit ein. (Platzhalter)");
    } else if (selectedAction === "item") {
      roundLog.push("Spieler nutzt ein Item aus dem Beutel. (Platzhalter)");
    } else if (selectedAction === "use") {
      roundLog.push(
        `Spieler verwendet ${playerFlux.data.item}. (Platzhalter für Verbrauch)`
      );
    } else if (selectedAction === "flee") {
      const dice = rollDice();
      const bonus = combinedStats.luck + (playerBase.data.level - enemy.level);
      if (isSuccess(dice, bonus)) {
        roundLog.push("Flucht erfolgreich!");
        setCombatEnded(true);
      } else {
        roundLog.push("Flucht misslungen!");
      }
    }
    // Bei "attack" wird hier nichts direkt gemacht, da das asynchron via Animation erfolgt.
  };

  const executeEnemyAction = (roundLog: string[]) => {
    // Fürs Erste greift der Gegner immer an
    const dice = rollDice();
    const bonus = enemy.luck; // Nur enemy.luck – keine Level-Differenz
    const multiplier = computeMultiplier(dice, bonus);
    const damage = Math.max(
      0,
      (enemy.attack - combinedStats.defense) * multiplier
    );
    const newPlayerLife = playerLife - damage;
    setPlayerLife(newPlayerLife);
    roundLog.push(
      `Gegner greift an und verursacht ${damage.toFixed(
        0
      )} Schaden (Multiplikator: ${multiplier.toFixed(2)}).`
    );
  };

  // Wird nach Abschluss der Spieler-AttackAnimation aufgerufen
  const completePlayerAttack = () => {
    setShowAttackAnimation(false);
    const dice = rollDice();
    const bonus = combinedStats.luck + (playerBase.data.level - enemy.level);
    const multiplier = computeMultiplier(dice, bonus);
    const damage = Math.max(
      0,
      (combinedStats.attack - enemy.defense) * multiplier
    );
    const newEnemyLife = enemyLife - damage;
    setEnemyLife(newEnemyLife);
    const attackLog = `Spieler greift mit ${
      playerFlux.data.weapon
    } an und fügt ${damage.toFixed(
      0
    )} Schaden zu (Multiplikator: ${multiplier.toFixed(2)}).`;
    const newLog = [...currentRoundActionLog, attackLog];

    // Falls der Gegner nach dem Spielerangriff noch lebt und noch nicht gehandelt hat, soll er jetzt angreifen
    if (
      newEnemyLife > 0 &&
      !newLog.some((msg) => msg.includes("Gegner greift"))
    ) {
      executeEnemyAction(newLog);
    }
    finishRound(newLog);
  };

  // Ablauf einer Runde: Initiative ermitteln, Aktionen ausführen und Log erstellen
  const startRound = () => {
    if (combatEnded) return;
    const playerInit = rollDice() + combinedStats.luck;
    const enemyInit = rollDice() + enemy.luck;
    let roundLog: string[] = [];
    roundLog.push(
      `Initiative: Spieler (${playerInit}) vs. Gegner (${enemyInit}).`
    );

    if (playerInit >= enemyInit) {
      roundLog.push("Spieler beginnt die Runde.");
      // Bei Angriff: Animation starten und später Callback ausführen
      if (selectedAction === "attack") {
        setCurrentRoundActionLog(roundLog);
        setShowAttackAnimation(true);
        return; // Der weitere Ablauf erfolgt in completePlayerAttack()
      } else {
        executePlayerAction(roundLog);
        if (enemyLife > 0) {
          executeEnemyAction(roundLog);
        }
      }
    } else {
      roundLog.push("Gegner beginnt die Runde.");
      executeEnemyAction(roundLog);
      if (playerLife > 0) {
        if (selectedAction === "attack") {
          // Wenn der Gegner zuerst angreift, dann wird die AttackAnimation nachträglich gestartet
          setCurrentRoundActionLog(roundLog);
          setShowAttackAnimation(true);
          return;
        } else {
          executePlayerAction(roundLog);
        }
      }
    }
    finishRound(roundLog);
  };

  const finishRound = (roundLog: string[]) => {
    // Hier können aktive Buffs/Debuffs oder ein Zufallssatz angehängt werden
    roundLog.push(
      "Der Kampf verläuft ... (Platzhalter für Flavor und Buffs/Debuffs)."
    );

    // Runde-Log speichern
    setLogs((prev) => ({
      ...prev,
      [currentRound]: roundLog.map((msg, index) => <p key={index}>{msg}</p>),
    }));

    // Prüfen, ob der Kampf beendet ist
    if (
      currentRound >= 10 ||
      combatEnded ||
      enemyLife <= 0 ||
      playerLife <= 0
    ) {
      setCombatEnded(true);
    } else {
      setCurrentRound(currentRound + 1);
      setSelectedRound(currentRound + 1);
    }
    // Aktion zurücksetzen
    setSelectedAction(null);
  };

  // Handler für die Aktionsbuttons
  const playerAttackHandler = () => {
    setSelectedAction("attack");
    startRound();
  };

  const playerDefendHandler = () => {
    setSelectedAction("defend");
    startRound();
  };

  const playerSkillHandler = () => {
    setSelectedAction("skill");
    startRound();
  };

  const playerItemHandler = () => {
    setSelectedAction("item");
    startRound();
  };

  const playerUseHandler = () => {
    setSelectedAction("use");
    startRound();
  };

  const fleeHandler = () => {
    setSelectedAction("flee");
    startRound();
  };

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
              <span style={{ fontSize: "150%" }}>LP: {enemyLife}</span>
            </p>
          )}
        </div>
      </div>

      {/* Rundennavigation */}
      <div className="round-buttons flex-row" style={{ marginBottom: "1rem" }}>
        {renderRoundButtons()}
      </div>

      {/* Animation oder Log-Überschrift */}
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
          <div key={index}>{entry}</div>
        ))}
      </div>

      {/* Aktionsbuttons */}
      <div className="combat-actions">
        {!combatEnded ? (
          <div className="battle-actions">
            <div className="battle-actions-col">
              <button
                onClick={playerAttackHandler}
                className="btn-border battle-actions-btn"
                disabled={showAttackAnimation}
              >
                Mit {playerFlux.data.weapon} Angreifen
              </button>
              <button
                onClick={playerDefendHandler}
                className="btn-border battle-actions-btn"
              >
                Mit {playerFlux.data.armor} Verteidigen
              </button>
              <button
                onClick={playerSkillHandler}
                className="btn-border battle-actions-btn"
              >
                Fähigkeit einsetzen
              </button>
            </div>
            <div className="battle-actions-col">
              <button
                onClick={playerItemHandler}
                className="btn-border battle-actions-btn"
              >
                Aus dem Beutel nutzen
              </button>
              <button
                onClick={playerUseHandler}
                className="btn-border battle-actions-btn"
              >
                {playerFlux.data.item} nutzen
              </button>
              <button
                onClick={fleeHandler}
                className="btn-border battle-actions-btn"
              >
                Fliehen
              </button>
            </div>
          </div>
        ) : (
          <p>Kampf beendet.</p>
        )}
      </div>
      <p style={{ color: "#151820" }}>
        .......................................................................................................
        .......................................................................................................
        .......................................................................................................
      </p>
    </div>
  );
};
