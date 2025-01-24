import React, { useState } from "react";
import { useEditorContext } from "../Context/EventContext";
import { NextEventOption, Conditions } from "../../../data/eventData";

const GenerateEventCode: React.FC = () => {
  const [generatedCode, setGeneratedCode] = useState("");

  const { eventId, label, description, buttons, places } = useEditorContext();

  // --------------------------------------------
  // Hilfsfunktion: String für Code sauber machen
  // (Escaping, Ersetzen von Backticks etc.)
  // --------------------------------------------
  function escapeForTS(str: string) {
    // Wenn du Backticks erlauben willst, brauchst du hier mehr Logik
    // Fürs Erste ersetze ich nur Backslashes und Backticks naiv:
    return str
      .replace(/\\/g, "\\\\")
      .replace(/`/g, "\\`");
  }

  // --------------------------------------------
  // Das ist deine Hauptroutine zum Generieren
  // --------------------------------------------
  const generateCode = () => {
    // Hier sammeln wir separat Messages und Description
    const messages: string[] = [];
    let descriptionFn = "";

    const hasDescription = description.trim() !== "";

    // descriptionText-Funktion bauen (falls vorhanden)
    if (hasDescription) {
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
    // Buttons verarbeiten
    // --------------------------------------------
    const buttonEntries = buttons.map((b, buttonIndex) => {
      const lines: string[] = [];

      // 1) label
      lines.push(`label: "${escapeForTS(b.label)}"`);

      // 2) conditions (falls enabled)
      if (b.conditionsEnabled && b.conditions) {
        const condStr = formatConditions(b.conditions, 4);
        lines.push(`conditions: ${condStr}`);
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
          // Du kannst das "stateDelta" in "statsDelta" umbenennen, falls du willst
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
        // Wir legen eine neue Konstante in "messages" an
        const escapedMsg = escapeForTS(b.message);
        const msgVarName = `message${buttonIndex}`;
        messages.push(`const ${msgVarName} = (\n    \`${escapedMsg}\`\n);`);
        actionParts.push(`message: ${msgVarName}`);
      }

      // Falls wir Aktionsteile haben, packen wir sie in getAction
      if (actionParts.length > 0) {
        const actionString = actionParts.join(",\n                ");
        lines.push(`getAction: () => ({\n                ${actionString}\n            })`);
      }

      // Schöne Ausgabe
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
        //  - JSON.stringify mit 4er-Einrückung
        //  - remove quotes from keys (kleiner Hack)
        placesString = JSON.stringify(cleanedPlaces, null, 4)
          .replace(/"([^"]+)":/g, "$1:")
          .replace(/"/g, `"`) // Anführungszeichen um Strings bleiben
          .trim();
      }
    }

    // --------------------------------------------
    // Jetzt bauen wir den finalen Code-String
    // --------------------------------------------
    let code = `import { GameEvent } from "../eventData";

//#region [events]
export const event${eventId || "NewEvent"}: GameEvent = {
    id: "${escapeForTS(eventId)}",
    label: "${escapeForTS(label)}",`;

    // Nur wenn description da ist
    if (hasDescription) {
      code += `
    description: descriptionText(),`;
    }

    // Buttons
    if (buttonEntries.length > 0) {
      code += `
    buttons: [
        ${buttonEntries.join(",\n        ")}
    ],`;
    }

    // Places
    if (placesString) {
      code += `
    places: ${placesString},`;
    }

    // Klammer zu + Region Ende
    code += `
};
//#endregion
`;

    // Description-Funktion dahinter
    if (hasDescription) {
      code += `
${descriptionFn}
`;
    }

    // Messages
    if (messages.length > 0) {
      code += messages.join("\n\n");
      code += "\n";
    }

    setGeneratedCode(code);
  };

  // --------------------------------------------
  // Copy-Funktion
  // --------------------------------------------
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


// -----------------------------------------------------
// Hilfsfunktion, um das Conditions-Objekt
// schön formatiert auszugeben (ähnlich wie JSON)
// -----------------------------------------------------
function formatConditions(conditions: Conditions, indent = 2): string {

  let str = JSON.stringify(conditions, null, indent);
  str = str.replace(/"([^"]+)":/g, "$1:");

  return str;
}
