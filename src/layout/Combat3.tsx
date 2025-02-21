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
import { parseDescription } from "../utility/Helper/ParseTextToJSX";
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

  const [logs, setLogs] = useState<Record<number, string>>({});
  const [selectedLog, setSelectedLog] = useState<number>(0);
  let tempLog = "";

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
    setLogs({ 0: intro });
  }, [enemyName, difficulty, level]);
  //#endregion

  //#region helper
  const rollDice = () => Math.floor(Math.random() * 100) + 1;

  const multiplier = (bonus: number, name: string) => {
    const dice = rollDice();
    console.log("raw dice roll for " + name, dice);

    const r = (dice - 1) / 99; // Normalisiert: 0 bis 1

    //  Bonus 5 verschiebt z. B. um 0,05 nach oben. Passe den Faktor ggf. an.
    const effective = r + bonus * 0.01;
    console.log("effective score for " + name, effective);

    if (effective < 0.075) return 0.4; // 0 bis 0.075: extreme Schwäche -> 0.4 (7,5%)
    if (effective < 0.2) return 0.8; // 0.075 bis 0.200: moderat schwach -> 0.8 (12,5%)
    if (effective < 0.8) return 1; // 0.200 bis 0.800: normal -> 1 (60%)
    if (effective < 0.925) return 1.4; // 0.800 bis 0.925: moderat stark -> 1.4 (12,5%)
    return 1.8; // 0.925 bis 1: extreme Stärke -> 1.8 (7,5%)
  };

  //#endregion

  //#region processRound
  const startRound = () => {
    if (!enemy || isCombatEnded) return;
    tempLog = "";
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
        roundLog += "Du hast den Erstschlag!\n";
        roundLog += playerAttack();
        roundLog += enemyAttack();
      } else {
        roundLog += enemy.name + " hat den Erstschlag!\n";
        roundLog += enemyAttack();
        roundLog += playerAttack();
      }

      tempLog = roundLog;
    }
    finishRound();
  };

  // Attack-Funktionen so anpassen, dass sie den Log-Text zurückgeben
  const enemyAttack = () => {
    const multi = multiplier(enemy.luck, enemy.name);
    const rawAttack = Math.floor(enemy.attack * multi);
    const attack = Math.max(0, rawAttack - combinedStats.defense);

    let roundLog = "";
    switch (multi) {
      case 0.4:
        roundLog =
          "{Talk|custom:#6cc180}Der Angriff war besonders schwach!{/Talk}";
        break;
      case 0.8:
        roundLog = "{Talk|custom:#9ac7ba}Der Angriff war schwach!{/Talk}";
        break;
      case 1.4:
        roundLog = "{Talk|custom:#c998ae}Der Angriff war gut!{/Talk}";
        break;
      case 1.8:
        roundLog = "{Talk|custom:#cb6380}Volltreffer!{/Talk}";
        break;
      default:
    }

    playerStats.updateLife(-attack);
    return `${enemy.name} hat {Talk|rot}${attack} Schaden{/Talk} angerichtet. ${roundLog}\n`;
  };

  const playerAttack = () => {
    const multi = multiplier(combinedStats.luck, playerMeta.data.name);
    const rawAttack = Math.floor(combinedStats.attack * multi);
    const attack = Math.max(1, rawAttack - enemy.defense);

    let roundLog = "";
    switch (multi) {
      case 0.4:
        roundLog =
          "{Talk|custom:#cb6380}Dein Angriff war besonders schwach!{/Talk}";
        break;
      case 0.8:
        roundLog = "{Talk|custom:#c998ae}Dein Angriff war schwach!{/Talk}";
        break;
      case 1.4:
        roundLog = "{Talk|custom:#9ac7ba}Dein Angriff war gut!{/Talk}";
        break;
      case 1.8:
        roundLog = "{Talk|custom:#6cc180}Volltreffer!{/Talk}";
        break;
      default:
    }

    const updatedEnemy = { ...enemy, life: enemy.life - attack };
    setEnemy(updatedEnemy);
    return `Du hast {Talk|grün}${attack} Schaden{/Talk} verteilt. ${roundLog} \n`;
  };

  const finishRound = () => {
    createLog();
    if (combinedStats.life <= 0) {
      setLogs((prev) => ({
        ...prev,
        [rounds]: prev[rounds] + "\nDu hast verloren!",
      }));
      setIsCombatEnded(true);
    } else if (enemy.life <= 0) {
      setLogs((prev) => ({
        ...prev,
        [rounds]: prev[rounds] + "\nDu hast gewonnen!",
      }));
      setIsCombatEnded(true);
    } else if (rounds === 10) {
      setLogs((prev) => ({
        ...prev,
        [rounds]: prev[rounds] + "\nDer Gegner ist entkommen!",
      }));
      setIsCombatEnded(true);
    }
    setSelectedLog(rounds);
  };

  //#endregion

  //#region log
  const createLog = () => {
    const log = "Du hast dich für " + interaction + " entschieden.\n" + tempLog;
    setLogs((prev) => ({ ...prev, [rounds]: log }));
  };

  const getSelectedRoundLogs = () => {
    return logs[selectedLog] || "Kein Log für diese Runde";
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
            <br />
            Angriff: {combinedStats.attack}
            <br />
            Verteidigung: {combinedStats.defense}
            <br />
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
              <br />
              Angriff: {enemy.attack}
              <br />
              Verteidigung: {enemy.defense}
              <br />
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
      <div className="flex-top mb-2">
        {parseDescription(getSelectedRoundLogs())}
      </div>

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
