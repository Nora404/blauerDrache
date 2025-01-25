import React, { useState } from "react";
import { useEditorContext } from "../Context/EventContext";
// Passe Pfade an dein Projekt an
import { NextEventOption, Conditions } from "../../../data/eventData";
import { mapConditionsConfigToConditions } from "../../Helper/ConditionsMapper";



const GenerateEventCode: React.FC = () => {
  const [generatedCode, setGeneratedCode] = useState("");

  const { eventId, label, description, buttons, places } = useEditorContext();

  // --------------------------------------------
  // Hilfsfunktion: String für Code sauber machen
  // (Escaping, Ersetzen von Backticks etc.)
  // --------------------------------------------
  function escapeForTS(str: string) {
    return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`");
  }

  // --------------------------------------------
  // formatConditions: final "Conditions" -> str
  // (leichte JSON-Aufbereitung)
  // --------------------------------------------
  function formatConditions(conditions: Conditions, indent = 2): string {
    let str = JSON.stringify(conditions, null, indent);
    // Keys ohne Anführungszeichen
    str = str.replace(/"([^"]+)":/g, "$1:");
    return str;
  }

  // --------------------------------------------
  // Hauptroutine zum Generieren
  // --------------------------------------------
  const generateCode = () => {
    const messages: string[] = [];
    let descriptionFn = "";

    // Falls "description" vorhanden:
    if (description.trim()) {
      const escapedDesc = escapeForTS(description);
      descriptionFn = `
function descriptionText() {
    return (
        \`${escapedDesc}\`
    );
}
`;
    }

    // --------------------------------------------
    // Buttons
    // --------------------------------------------
    const buttonEntries = buttons.map((b, buttonIndex) => {
      const lines: string[] = [];

      // 1) label
      lines.push(`label: "${escapeForTS(b.label)}"`);

      // 2) conditions
      // wenn "conditionsEnabled" aktiv und b.conditions existiert
      if (b.conditionsEnabled && b.conditions) {
        // Mappen auf finales "Conditions"
        const finalCond = mapConditionsConfigToConditions(b.conditions);
        // Nur wenn das Objekt nicht leer ist
        if (Object.keys(finalCond).length > 0) {
          const condStr = formatConditions(finalCond, 4);
          lines.push(`conditions: ${condStr}`);
        }
      }

      // 3) getAction
      const actionParts: string[] = [];

      // itemsDelta
      if (b.itemsDeltaEnabled && b.itemsDelta.length > 0) {
        const itemsObj: Record<string, number> = {};
        for (const entry of b.itemsDelta) {
          if (entry.itemName && entry.quantity !== 0) {
            itemsObj[entry.itemName] = (itemsObj[entry.itemName] || 0) + entry.quantity;
          }
        }
        if (Object.keys(itemsObj).length > 0) {
          actionParts.push(`itemsDelta: ${JSON.stringify(itemsObj)}`);
        }
      }

      // economyDelta
      if (b.economyDeltaEnabled) {
        const eco = { ...b.economyDelta };
        (Object.keys(eco) as Array<keyof typeof eco>).forEach((k) => {
          if (eco[k] === 0) delete eco[k];
        });
        if (Object.keys(eco).length > 0) {
          actionParts.push(`economyDelta: ${JSON.stringify(eco)}`);
        }
      }

      // fluxDelta
      if (b.fluxDeltaEnabled) {
        const flux = { ...b.fluxDelta };
        (Object.keys(flux) as Array<keyof typeof flux>).forEach((k) => {
          if (!flux[k]) delete flux[k];
        });
        if (Object.keys(flux).length > 0) {
          actionParts.push(`fluxDelta: ${JSON.stringify(flux)}`);
        }
      }

      // stateDelta
      if (b.stateDeltaEnabled) {
        const st = { ...b.stateDelta };
        (Object.keys(st) as Array<keyof typeof st>).forEach((k) => {
          if (st[k] === 0) delete st[k];
        });
        if (Object.keys(st).length > 0) {
          actionParts.push(`stateDelta: ${JSON.stringify(st)}`);
        }
      }

      // baseDelta
      if (b.baseDeltaEnabled) {
        const base = { ...b.baseDelta };
        (Object.keys(base) as Array<keyof typeof base>).forEach((k) => {
          if (base[k] === 0) delete base[k];
        });
        if (Object.keys(base).length > 0) {
          actionParts.push(`baseDelta: ${JSON.stringify(base)}`);
        }
      }

      // TriggerGroup
      if (b.triggerGroup === "triggerQuest" && b.triggerQuest.trim() !== "") {
        actionParts.push(`triggerQuest: "${escapeForTS(b.triggerQuest.trim())}"`);
      } else if (b.triggerGroup === "endQuest" && b.endQuest.trim() !== "") {
        actionParts.push(`endQuest: "${escapeForTS(b.endQuest.trim())}"`);
      } else if (b.triggerGroup === "nextEvents" && b.nextEvents.length > 0) {
        const cleanedNext = b.nextEvents
          .filter((n: NextEventOption) => n.eventId.trim() !== "")
          .map((n: NextEventOption) => ({
            eventId: n.eventId.trim(),
            probability: Number(n.probability) || 100,
          }));
        if (cleanedNext.length > 0) {
          actionParts.push(`nextEvents: ${JSON.stringify(cleanedNext)}`);
        }
      }

      // message
      if (b.message.trim() !== "") {
        const escapedMsg = escapeForTS(b.message);
        const msgVarName = `message${buttonIndex}`;
        messages.push(`const ${msgVarName} = (\n    \`${escapedMsg}\`\n);`);
        actionParts.push(`message: ${msgVarName}`);
      }

      // Falls wir Aktionsteile haben -> getAction
      if (actionParts.length > 0) {
        const actionString = actionParts.join(",\n                ");
        lines.push(`getAction: () => ({\n                ${actionString}\n            })`);
      }

      return `{\n            ${lines.join(",\n            ")}\n        }`;
    });

    // --------------------------------------------
    // Places
    // --------------------------------------------
    let placesString = "";
    if (places.length > 0) {
      const cleanedPlaces = places
        .filter((p) => p.place.trim() !== "")
        .map((p) => ({
          place: p.place.trim(),
          probability: Number(p.probability) || 100,
        }));
      if (cleanedPlaces.length > 0) {
        placesString = JSON.stringify(cleanedPlaces, null, 4)
          .replace(/"([^"]+)":/g, "$1:")
          .replace(/"/g, `"`)
          .trim();
      }
    }

    // --------------------------------------------
    // Finalen Code-String aufbauen
    // --------------------------------------------
    let code = `import { GameEvent } from "../eventData";

//#region [events]
export const event${eventId || "NewEvent"}: GameEvent = {
    id: "event${escapeForTS(eventId)}",
    label: "${escapeForTS(label)}",`;

    if (description.trim()) {
      code += `
    description: descriptionText(),`;
    }

    if (buttonEntries.length > 0) {
      code += `
    buttons: [
        ${buttonEntries.join(",\n        ")}
    ],`;
    }

    if (placesString) {
      code += `
    places: ${placesString},`;
    } else {
      code += `\nplaces: []`
    }

    code += `
};
//#endregion
`;

    if (description.trim()) {
      code += `
${descriptionFn}
`;
    }

    if (messages.length > 0) {
      code += messages.join("\n\n");
      code += "\n";
    }

    setGeneratedCode(code);
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
        </div>
      )}
    </div>
  );
};

export default GenerateEventCode;
