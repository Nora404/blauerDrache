// GenerateQuestCode.tsx
import React, { useState } from "react";
import { useQuestContext } from "../Context/QuestContext";

function escapeForTS(str: string) {
  return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`");
}

const GenerateQuestCode: React.FC = () => {
  const [generatedCode, setGeneratedCode] = useState("");
  const {
    questId,
    label,
    description,
    reward,
    repeat,
    eventTrigger,
    eventEnd,
    progress,
  } = useQuestContext();

  const generateCode = () => {
    const safeId = questId || "NewQuest";
    const escLabel = escapeForTS(label);
    const escDesc = escapeForTS(description);
    const escReward = escapeForTS(reward);

    // progress.task kannst du in eine JSON konvertieren
    const taskString = JSON.stringify(progress.task, null, 4) || "{}";
    const cleanedTaskString = taskString.replace(/"([^"]+)":/g, "$1:"); // Objektkeys ohne Anführungszeichen
    // Du kannst hier natürlich mehr aufräumen, je nach Geschmack

    // Haupt-String
    let code = `
import { GameQuest } from "./questData"; // Pfad anpassen

//#region [quest]
export const quest${safeId}: GameQuest = {
    id: "${safeId}",
    label: "${escLabel}",
    description: \`${escDesc}\`,
    reward: "${escReward}",
    eventByEnd: "${eventEnd}", // das Event, das die Belohnung verteilt
    repeat: ${repeat ? "true" : "false"},
    progress: {
        type: "${progress.type}",
        path: "${progress.path}",
        eventByEnd: "${progress.eventByEnd}",
        isDone: false,
        task: ${cleanedTaskString}
    }
};
//#endregion

// Event, das diese Quest triggert: "${eventTrigger}"
`;
    // Du kannst das Trigger-Event hier als Kommentar notieren
    // oder anderswo verarbeiten.

    setGeneratedCode(code.trim());
  };

  const copyToClipboard = () => {
    if (!generatedCode) return;
    navigator.clipboard.writeText(generatedCode).then(
      () => alert("Quest-Code kopiert!"),
      (err) => console.error("Fehler beim Kopieren:", err)
    );
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <button onClick={generateCode}>Quest-Code generieren</button>
      {generatedCode && (
        <div className="output-container">
          <h3>Generierter Quest-Code</h3>
          <pre className="output-pre">{generatedCode}</pre>
          <button onClick={copyToClipboard}>Kopieren</button>
        </div>
      )}
    </div>
  );
};

export default GenerateQuestCode;
