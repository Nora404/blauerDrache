import React, { useState } from "react";
import { useEditorContext } from "../Context/EventContext";
import { NextEventOption, Conditions } from "../../../data/eventData";
import { mapConditionsConfigToConditions } from "../../Helper/ConditionsMapper";
import { buffMap } from "../../../data/buffData";
import { debuffMap } from "../../../data/debuffData";

const GenerateEventCode: React.FC = () => {
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const { eventId, label, description, buttons, places } = useEditorContext();

  // Hilfsfunktion: Ersetzt Backslashes und Backticks
  const escapeForTS = (str: string): string => {
    return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`");
  };

  // Formatierung der Conditions als JSON (Keys ohne Anführungszeichen)
  const formatConditions = (conditions: Conditions, indent = 2): string => {
    let str = JSON.stringify(conditions, null, indent);
    str = str.replace(/"([^"]+)":/g, "$1:");
    return str;
  };

  // Beschreibung (description) immer definieren, auch wenn leer
  const escapedDesc = escapeForTS(description);
  const descriptionFn = `
function descriptionText() {
    return \`${escapedDesc}\`;
}
`;

  // generateCode-Funktion definieren
  const generateCode = () => {
    // --- Buttons erzeugen ---
    const messages: string[] = [];
    const buttonEntries = buttons.map((b, buttonIndex) => {
      const lines: string[] = [];

      // (1) label und result
      lines.push(`label: "${escapeForTS(b.label)}"`);
      lines.push(`result: "${escapeForTS(b.result ?? "")}"`);

      // (2) Conditions – wenn aktiviert, werden alle Keys ausgegeben (auch 0‑Werte)
      if (b.conditionsEnabled && b.conditions) {
        const finalCond = mapConditionsConfigToConditions(b.conditions);
        const condStr = formatConditions(finalCond, 4);
        lines.push(`conditions: ${condStr}`);
      }

      // (3) getAction: Action-Teile zusammenbauen
      const actionParts: string[] = [];

      // itemsDelta: Alle Einträge (0 wird NICHT ausgeschlossen)
      if (b.itemsDeltaEnabled && b.itemsDelta.length > 0) {
        const itemsObj: Record<string, number> = {};
        for (const entry of b.itemsDelta) {
          if (entry.itemName) {
            itemsObj[entry.itemName] = (itemsObj[entry.itemName] ?? 0) + entry.quantity;
          }
        }
        actionParts.push(`itemsDelta: ${JSON.stringify(itemsObj)}`);
      }

      // economyDelta: Alle Werte übernehmen
      if (b.economyDeltaEnabled) {
        actionParts.push(`economyDelta: ${JSON.stringify(b.economyDelta)}`);
      }

      // fluxDelta: Werte übernehmen, sofern nicht leer
      if (b.fluxDeltaEnabled) {
        const fluxResult: Record<string, any> = {};
        if (b.fluxDelta.feeling !== "") fluxResult.feeling = b.fluxDelta.feeling;
        if (b.fluxDelta.item !== "") fluxResult.item = b.fluxDelta.item;
        if (b.fluxDelta.buff !== "") {
          const buffName = b.fluxDelta.buff;
          const buffObj = buffMap[buffName];
          fluxResult.buff = buffObj ? { [buffName]: buffObj.duration } : buffName;
        }
        if (b.fluxDelta.debuff !== "") {
          const debuffName = b.fluxDelta.debuff;
          const debuffObj = debuffMap[debuffName];
          fluxResult.debuff = debuffObj ? { [debuffName]: debuffObj.duration } : debuffName;
        }
        if (Object.keys(fluxResult).length > 0) {
          actionParts.push(`fluxDelta: ${JSON.stringify(fluxResult)}`);
        }
      }

      // stateDelta: Alle Werte übernehmen
      if (b.stateDeltaEnabled) {
        actionParts.push(`stateDelta: ${JSON.stringify(b.stateDelta)}`);
      }

      // baseDelta: Alle Werte übernehmen
      if (b.baseDeltaEnabled) {
        actionParts.push(`baseDelta: ${JSON.stringify(b.baseDelta)}`);
      }

      // Trigger: triggerQuest, endQuest oder nextEvents
      if (b.triggerGroup === "triggerQuest" && b.triggerQuest.trim() !== "") {
        actionParts.push(`triggerQuest: "${escapeForTS(b.triggerQuest.trim())}"`);
      } else if (b.triggerGroup === "endQuest" && b.endQuest.trim() !== "") {
        actionParts.push(`endQuest: "${escapeForTS(b.endQuest.trim())}"`);
      } else if (b.triggerGroup === "nextEvents" && b.nextEvents.length > 0) {
        const cleanedNext = b.nextEvents
          .filter((n: NextEventOption) => n.eventId.trim() !== "")
          .map((n: NextEventOption) => ({
            eventId: n.eventId.trim(),
            probability: n.probability !== undefined ? Number(n.probability) : 100,
          }));
        if (cleanedNext.length > 0) {
          actionParts.push(`nextEvents: ${JSON.stringify(cleanedNext)}`);
        }
      }

      // message: Variable definieren und in getAction einbinden
      if (b.message.trim() !== "") {
        const escapedMsg = escapeForTS(b.message);
        const msgVarName = `message${buttonIndex}`;
        messages.push(`const ${msgVarName} = \`${escapedMsg}\`;`);
        actionParts.push(`message: ${msgVarName}`);
      }

      if (actionParts.length > 0) {
        lines.push(
          `getAction: () => ({\n                ${actionParts.join(
            ",\n                "
          )}\n            })`
        );
      }

      return `{\n            ${lines.join(",\n            ")}\n        }`;
    });

    // --- Places: Auch wenn das Array leer ist, immer ausgeben ---
    const cleanedPlaces = places.map((p) => ({
      place: p.place.trim(),
      probability: p.probability !== undefined ? Number(p.probability) : 100,
    }));
    const placesString = JSON.stringify(cleanedPlaces, null, 4)
      .replace(/"([^"]+)":/g, "$1:")
      .trim();

    // --- Finalen Code-String zusammenbauen ---
    let code = `import { GameEvent } from "../eventData";

export const event${eventId || "NewEvent"}: GameEvent = {
    id: "${escapeForTS(eventId)}",
    label: "${escapeForTS(label)}",
    description: descriptionText(),
    buttons: [
        ${buttonEntries.join(",\n        ")}
    ],
    places: ${placesString}
};
`;

    code += descriptionFn;
    if (messages.length > 0) {
      code += "\n" + messages.join("\n\n") + "\n";
    }

    setGeneratedCode(code);
  };


  const handleEmailClick = () => {
    const recipient = "ina.verena.zuta@gmail.com";
    const subject = "Neues Event"; // <-- Hier kannst du den Betreff setzen
    const body = generatedCode; // <-- Dein Textinhalt
    // URL-encoding ist wichtig, um Sonderzeichen korrekt zu übertragen
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  };

  // Copy-Funktion
  const copyToClipboard = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode).then(
        () => {
          alert("Code wurde in die Zwischenablage kopiert!");
        },
        (err) => {
          console.error("Fehler beim Kopieren in die Zwischenablage:", err);
        }
      );
    }
  };

  return (
    <div className="max-widht">
      <button onClick={generateCode} className="generate-button">
        Code generieren
      </button>
      {generatedCode && (
        <div className="output-container">
          <h2>Generierter Code</h2>
          <pre className="output-pre">{generatedCode}</pre>
          <button onClick={copyToClipboard} className="copy-button">
            In die Zwischenablage kopieren
          </button>
          <button onClick={handleEmailClick}>E-Mail senden</button>
        </div>
      )}
    </div>
  );
};

export default GenerateEventCode;
