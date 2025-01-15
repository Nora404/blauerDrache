import React, { useState } from "react";
import { formatAsJSX } from "../Context/Helper";
import { useEditorContext } from "../Context/Context";
import { NextEventOption } from "../../../data/eventData";

const GenerateEventCode: React.FC = () => {
  const [generatedCode, setGeneratedCode] = useState("");
  const { eventId, label, description, buttons, places } = useEditorContext();

  const generateCode = () => {
    const eventObj: any = {
      id: eventId,
      label,
    };

    // Statt: <>${description}</>
    // Einfach den reinen String speichern
    if (description.trim() !== "") {
      // Kommentar: So bleibt "Hallo\nFremder {SYSTEM.Gold}" erhalten
      eventObj.description = description; // <-- Änderung
    }

    // Buttons etc. bleiben unverändert
    const allButtons = buttons.map((b) => {
      const button: any = { label: b.label };
      const getAction: any = {};

      // itemsDelta
      if (b.itemsDeltaEnabled && b.itemsDelta.length > 0) {
        const itemsDelta: Record<string, number> = {};
        for (const entry of b.itemsDelta) {
          if (entry.itemName && entry.quantity !== 0) {
            const itemKey = entry.itemName;
            itemsDelta[itemKey] = (itemsDelta[itemKey] || 0) + entry.quantity;
          }
        }
        if (Object.keys(itemsDelta).length > 0) {
          getAction.itemsDelta = itemsDelta;
        }
      }

      // economyDelta
      if (b.economyDeltaEnabled) {
        const eco = { ...b.economyDelta };
        (Object.keys(eco) as Array<keyof typeof eco>).forEach((k) => {
          if (eco[k] === 0) delete eco[k];
        });
        if (Object.keys(eco).length > 0) {
          getAction.economyDelta = eco;
        }
      }

      // fluxDelta
      if (b.fluxDeltaEnabled) {
        const flux = { ...b.fluxDelta };
        (Object.keys(flux) as Array<keyof typeof flux>).forEach((k) => {
          if (!flux[k]) delete flux[k];
        });
        if (Object.keys(flux).length > 0) {
          getAction.fluxDelta = flux;
        }
      }

      // stateDelta
      if (b.stateDeltaEnabled) {
        const st = { ...b.stateDelta };
        (Object.keys(st) as Array<keyof typeof st>).forEach((k) => {
          if (st[k] === 0) delete st[k];
        });
        if (Object.keys(st).length > 0) {
          getAction.stateDelta = st;
        }
      }

      // baseDelta
      if (b.baseDeltaEnabled) {
        const base = { ...b.baseDelta };
        (Object.keys(base) as Array<keyof typeof base>).forEach((k) => {
          if (base[k] === 0) delete base[k];
        });
        if (Object.keys(base).length > 0) {
          getAction.baseDelta = base;
        }
      }

      // TriggerGroup
      if (b.triggerGroup === "triggerQuest" && b.triggerQuest.trim() !== "") {
        getAction.triggerQuest = b.triggerQuest.trim();
      } else if (b.triggerGroup === "endQuest" && b.endQuest.trim() !== "") {
        getAction.endQuest = b.endQuest.trim();
      } else if (b.triggerGroup === "nextEvents" && b.nextEvents.length > 0) {
        const cleanedNext = b.nextEvents
          .filter((n: NextEventOption) => n.eventId.trim() !== "")
          .map((n: NextEventOption) => ({
            eventId: n.eventId.trim(),
            probability: parseInt(n.probability.toString(), 10) || 100,
          }));
        if (cleanedNext.length > 0) {
          getAction.nextEvents = cleanedNext;
        }
      }

      // Message
      // Auch hier: Wenn du multiline-Eingaben erlaubst, einfach als String:
      if (b.message.trim() !== "") {
        getAction.message = b.message; // <- statt <>${b.message}</>
      }

      if (Object.keys(getAction).length > 0) {
        button.getAction = getAction;
      }
      return button;
    });

    if (allButtons.length > 0) {
      eventObj.buttons = allButtons;
    }

    // Places
    if (places.length > 0) {
      const cleanedPlaces = places
        .filter((p) => p.place)
        .map((p) => ({
          place: p.place,
          probability: Number(p.probability) || 100,
        }));
      if (cleanedPlaces.length > 0) {
        eventObj.places = cleanedPlaces;
      }
    }

    const cleaned = cleanObject(eventObj);
    const result = formatAsJSX(cleaned);
    setGeneratedCode(result);
  };

  function cleanObject(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map(cleanObject).filter((x) => x !== null && x !== undefined);
    }
    if (obj && typeof obj === "object") {
      const newObj: any = {};
      for (const key in obj) {
        const val = cleanObject(obj[key]);
        if (
          val !== null &&
          val !== undefined &&
          (typeof val !== "object" || Object.keys(val).length > 0)
        ) {
          newObj[key] = val;
        }
      }
      return Object.keys(newObj).length > 0 ? newObj : undefined;
    }
    return obj;
  }

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
