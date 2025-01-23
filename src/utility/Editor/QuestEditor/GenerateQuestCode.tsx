// QuestCodeGenerator.tsx
import React, { useState } from "react";
import { useQuestCreatorContext } from "../Context/QuestContext";

// Einfache Escape-Funktion
function escapeForTS(str: string) {
  return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`");
}

export default function QuestCodeGenerator() {
  const [generatedCode, setGeneratedCode] = useState("");
  const {
    baseId,
    questId,
    label,
    description,
    reward,
    repeat,
    progress,
    triggerEventId,
    triggerDescription,
    triggerButtons,
    endEventId,
    endDescription,
    endButtons,
  } = useQuestCreatorContext();

  const generateCode = () => {
    // ********** QUEST-OBJEKT **********
    const questObj = `
export const ${questId}: GameQuest = {
  id: "${questId}",
  label: "${escapeForTS(label)}",
  description: \`${escapeForTS(description)}\`,
  reward: \`${escapeForTS(reward)}\`,
  eventByEnd: "${endEventId}", 
  progress: {
    type: "${progress.type}",
    path: "${progress.path}",
    eventByEnd: "${progress.eventByEnd}",
    isDone: false,
    task: ${formatTask(progress.task)}
  },
  repeat: ${repeat ? "true" : "false"}
};`;

    // ********** TRIGGER-EVENT **********
    const triggerObj = `
export const ${triggerEventId}: GameEvent = {
  id: "${triggerEventId}",
  label: "${escapeForTS(label)} - Trigger", 
  description: \`${escapeForTS(triggerDescription)}\`,
  buttons: ${formatButtons(triggerButtons)},
  places: []
};`;

    // ********** END-EVENT **********
    const endObj = `
export const ${endEventId}: GameEvent = {
  id: "${endEventId}",
  label: "${escapeForTS(label)} - End", 
  description: \`${escapeForTS(endDescription)}\`,
  buttons: ${formatButtons(endButtons)},
  places: []
};`;

    // Du kannst hier natürlich deine Imports / Regions usw. einbauen
    const finalCode = `
import { GameEvent } from "../eventData";
import { GameQuest } from "../questData";

//#region [Quest+Events for "${baseId}"]
${questObj}

${triggerObj}

${endObj}
//#endregion
`;
    setGeneratedCode(finalCode.trim());
  };

  const copyToClipboard = () => {
    if (!generatedCode) return;
    navigator.clipboard.writeText(generatedCode).then(
      () => alert("Code kopiert!"),
      (err) => console.error("Fehler beim Kopieren:", err)
    );
  };

  return (
    <div>
      <button onClick={generateCode}>Code generieren</button>
      {generatedCode && (
        <div>
          <pre style={{ whiteSpace: "pre-wrap", background: "#f0f0f0" }}>
            {generatedCode}
          </pre>
          <button onClick={copyToClipboard}>Kopieren</button>
        </div>
      )}
    </div>
  );
}

// Hilfsfunktion, um Task als String zu formatieren
function formatTask(task: any): string {
  // Du kannst hier schöner manuell formatieren oder JSON.stringify nutzen
  const str = JSON.stringify(task, null, 2);
  // Optional Keys ohne Anführungszeichen
  return str.replace(/"([^"]+)":/g, "$1:");
}

// Hilfsfunktion, um Buttons zu formatieren
function formatButtons(buttons: any[]): string {
  if (!buttons || buttons.length === 0) return "[]";

  // So in etwa wie in deinem Event-Generator:
  const arr = buttons.map((btn) => {
    // label
    const labelPart = `label: "${escapeForTS(btn.label || "")}"`;
    // getAction
    let getAction = "";
    if (btn.itemsDeltaEnabled || btn.fluxDeltaEnabled || btn.economyDeltaEnabled || /* ... */ btn.triggerQuest) {
      const lines: string[] = [];
      if (btn.message) {
        lines.push(`message: \`${escapeForTS(btn.message)}\``);
      }
      if (btn.triggerQuest) {
        lines.push(`triggerQuest: "${btn.triggerQuest}"`);
      }
      if (btn.endQuest) {
        lines.push(`endQuest: "${btn.endQuest}"`);
      }
      // ... usw. 
      // itemsDelta, economyDelta, baseDelta, stateDelta -> analog
      // Hier kannst du dieselbe Logik anwenden wie in deinem Event-Editor.
      getAction = `
getAction: () => ({
  ${lines.join(",\n  ")}
})`;
    }

    const parts = [labelPart];
    if (getAction) parts.push(getAction);

    return `{
  ${parts.join(",\n  ")}
}`;
  });

  return `[\n${arr.join(",\n")}\n]`;
}
