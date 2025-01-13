// ============ EXTERNE DATEN (NUR Imports!) ============
// Pfade anpassen, damit sie aus deinem Projekt kommen:

import React, { useMemo, useState } from "react";
import { BuffName, buffMap } from "../../data/buffData";
import { PlacesKeys } from "../../data/colorfullStrings";
import { DebuffName, debuffMap } from "../../data/debuffData";
import { ItemCartegoryName, Item, itemMap } from "../../data/ItemData";

// Typ für NextEvent
type NextEventOption = {
  eventId: string;
  probability: number;
};

// ============ HILFSFUNKTIONEN ============

// Falls du PlacesKeys als Union-Type hast, brauchen wir 1x ein Array aller möglichen Werte.
// (Einmal pflegen, hier abgleichen. Dann hast du es nur an 1 Ort im Code.)
function getAllPlaces(): PlacesKeys[] {
  const all: PlacesKeys[] = [
    "Nordtor",
    "Westmauer",
    "Ostmauer",
    "Südmauer",
    "Brunnen",
    "Vorplatz",
    "Kirche",
    "Friedhof",
    "Rathaus",
    "Taverne",
    "Handelsbezirk",
    "Krämer",
    "Waffenladen",
    "Ausrüstungsladen",
    "Wohnbezirk",
    "Gassen",
    "Haus",
    "Weg",
    "Fluss",
    "Quelle",
    "See",
    "Sumpf",
    "Waldrand",
    "Wald",
    "Waldlichtung",
    "Dunkelwald",
    "Toilletenhaus",
    "Wiese",
    "Feld",
    "Steppe",
    "Ödland",
    "Hügelland",
    "Bergfuß",
    "Bergpfad",
    "Bergspitze",
    "Höhleneingang",
    "Höhle",
    "Schatzkammer",
  ];
  return all;
}

// Items nach Kategorien gruppieren (einmalig), damit du im Formular
// erst die Kategorie, dann das Item auswählst.
function buildItemCategories(): Record<ItemCartegoryName, Item[]> {
  const categoryMap: Record<string, Item[]> = {};
  Object.values(itemMap).forEach((item) => {
    const cat = item.category;
    if (!categoryMap[cat]) {
      categoryMap[cat] = [];
    }
    categoryMap[cat].push(item);
  });
  // Typescript-cast, damit es in dein Record passt
  return categoryMap as Record<ItemCartegoryName, Item[]>;
}

// Buffs und Debuffs in Arrays
function getAllBuffNames(): BuffName[] {
  return Object.keys(buffMap) as BuffName[];
}
function getAllDebuffNames(): DebuffName[] {
  return Object.keys(debuffMap) as DebuffName[];
}

// =========== DIE HAUPT-KOMPONENTE ===========
export default function EventCreationForm() {
  // ============== FORMULAR-STATE ==============
  const [eventId, setEventId] = useState("");
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");

  // Buttons-Array: Hier halten wir alle Angaben für Buttons
  const [buttons, setButtons] = useState<any[]>([]);

  // Places-Array
  const [places, setPlaces] = useState<
    { place: PlacesKeys; probability: number }[]
  >([]);

  // Für Code-Ausgabe
  const [generatedCode, setGeneratedCode] = useState("");

  // Categories einmalig berechnen (Memo)
  const categoryMap = useMemo(() => buildItemCategories(), []);

  // ========== Buttons-Funktionen ==========
  function addButton() {
    setButtons((prev) => [
      ...prev,
      {
        label: "",

        itemsDeltaEnabled: false,
        itemsDelta: [],

        economyDeltaEnabled: false,
        economyDelta: { gold: 0, edelsteine: 0 },

        fluxDeltaEnabled: false,
        fluxDelta: { feeling: "", buff: "", debuff: "", item: "" },

        stateDeltaEnabled: false,
        stateDelta: { life: 0, rounds: 0, attack: 0, defense: 0, luck: 0 },

        baseDeltaEnabled: false,
        baseDelta: { exp: 0, reputation: 0 },

        triggerGroup: "",
        triggerQuest: "",
        endQuest: "",
        nextEvents: [],
        message: "",
      },
    ]);
  }

  function removeButton(index: number) {
    setButtons((prev) => prev.filter((_, i) => i !== index));
  }

  // ItemsDelta-Einträge
  function addItemsDeltaEntry(buttonIndex: number) {
    setButtons((prev) =>
      prev.map((btn, i) => {
        if (i !== buttonIndex) return btn;
        return {
          ...btn,
          itemsDelta: [
            ...btn.itemsDelta,
            {
              category: "" as ItemCartegoryName,
              itemName: "",
              quantity: 1,
            },
          ],
        };
      })
    );
  }
  function removeItemsDeltaEntry(buttonIndex: number, entryIndex: number) {
    setButtons((prev) =>
      prev.map((btn, i) => {
        if (i !== buttonIndex) return btn;
        return {
          ...btn,
          itemsDelta: btn.itemsDelta.filter((_, e) => e !== entryIndex),
        };
      })
    );
  }

  // NextEvents
  function addNextEvent(buttonIndex: number) {
    setButtons((prev) =>
      prev.map((btn, i) => {
        if (i !== buttonIndex) return btn;
        return {
          ...btn,
          nextEvents: [...btn.nextEvents, { eventId: "", probability: 100 }],
        };
      })
    );
  }
  function removeNextEvent(buttonIndex: number, neIndex: number) {
    setButtons((prev) =>
      prev.map((btn, i) => {
        if (i !== buttonIndex) return btn;
        return {
          ...btn,
          nextEvents: btn.nextEvents.filter((_, x) => x !== neIndex),
        };
      })
    );
  }

  // ========== Places-Funktionen ==========
  function addPlace() {
    const all = getAllPlaces();
    const defaultPlace = all[0] ?? "Nordtor";
    setPlaces((prev) => [...prev, { place: defaultPlace, probability: 100 }]);
  }
  function removePlace(index: number) {
    setPlaces((prev) => prev.filter((_, i) => i !== index));
  }

  // ========== CODE-GENERIERUNG ==========
  function generateCode() {
    const eventObj: any = {
      id: eventId,
      label,
    };
    if (description.trim() !== "") {
      eventObj.description = `<>${description}</>`;
    }

    // Buttons
    const allButtons = buttons.map((b) => {
      const button: any = { label: b.label };
      const getAction: any = {};

      // itemsDelta
      if (b.itemsDeltaEnabled && b.itemsDelta.length > 0) {
        const itemsDelta: Record<string, number> = {};
        for (const entry of b.itemsDelta) {
          if (entry.itemName && entry.quantity !== 0) {
            // z.B. itemsDelta["Stein"] = 3
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
        // 0-Werte entfernen
        Object.keys(eco).forEach((k) => {
          if (eco[k] === 0) delete eco[k];
        });
        if (Object.keys(eco).length > 0) {
          getAction.economyDelta = eco;
        }
      }

      // fluxDelta
      if (b.fluxDeltaEnabled) {
        const flux = { ...b.fluxDelta };
        // Leere Felder entfernen
        Object.keys(flux).forEach((k) => {
          if (!flux[k]) delete flux[k];
        });
        if (Object.keys(flux).length > 0) {
          getAction.fluxDelta = flux;
        }
      }

      // stateDelta
      if (b.stateDeltaEnabled) {
        const st = { ...b.stateDelta };
        Object.keys(st).forEach((k) => {
          if (st[k] === 0) delete st[k];
        });
        if (Object.keys(st).length > 0) {
          getAction.stateDelta = st;
        }
      }

      // baseDelta
      if (b.baseDeltaEnabled) {
        const base = { ...b.baseDelta };
        Object.keys(base).forEach((k) => {
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
      if (b.message.trim() !== "") {
        getAction.message = `<>${b.message}</>`;
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

    // Cleaning + Format
    const cleaned = cleanObject(eventObj);
    const result = formatAsJSX(cleaned);
    setGeneratedCode(result);
  }

  // Hilfsfunktionen
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

  function formatAsJSX(obj: any, indent = 0): string {
    const spaces = "  ".repeat(indent);
    if (Array.isArray(obj)) {
      if (obj.length === 0) return "[]";
      const items = obj.map((x) => formatAsJSX(x, indent + 1));
      return `[\n${items.join(",\n")}\n${spaces}]`;
    } else if (typeof obj === "object" && obj !== null) {
      const entries = Object.entries(obj).map(([k, v]) => {
        return `  ${"  ".repeat(indent)}${k}: ${formatAsJSX(v, indent + 1)}`;
      });
      return `{\n${entries.join(",\n")}\n${spaces}}`;
    } else if (typeof obj === "string") {
      if (obj.startsWith("<>") && obj.endsWith("</>")) {
        return obj;
      }
      return JSON.stringify(obj);
    }
    return String(obj);
  }

  // ========== RENDERING ==========
  return (
    <div className="form-container">
      <h1>Event-Erstellungsformular</h1>

      <div className="form-group">
        <label>ID*:</label>
        <input
          type="text"
          value={eventId}
          onChange={(e) => setEventId(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Label*:</label>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Beschreibung:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      {/* ========== Buttons-Bereich ========== */}
      <div className="buttons-container">
        <h2>Buttons</h2>
        {buttons.map((btn, index) => (
          <div key={index} className="single-button">
            {/* Button Label */}
            <div className="form-group">
              <label>Button Label:</label>
              <input
                type="text"
                value={btn.label}
                onChange={(e) => {
                  const val = e.target.value;
                  setButtons((prev) =>
                    prev.map((b, i) => (i === index ? { ...b, label: val } : b))
                  );
                }}
              />
            </div>

            {/* itemsDelta */}
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={btn.itemsDeltaEnabled}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setButtons((prev) =>
                      prev.map((b, i) =>
                        i === index ? { ...b, itemsDeltaEnabled: checked } : b
                      )
                    );
                  }}
                />
                itemsDelta
              </label>
            </div>
            {btn.itemsDeltaEnabled && (
              <div className="nested-section">
                {btn.itemsDelta.map((entry: any, entryIndex: number) => {
                  const itemsOfCat = entry.category
                    ? categoryMap[entry.category] ?? []
                    : [];
                  return (
                    <div key={entryIndex} className="items-delta-row">
                      {/* Kategorie */}
                      <select
                        value={entry.category}
                        onChange={(e) => {
                          const newCat = e.target.value as ItemCartegoryName;
                          setButtons((prev) =>
                            prev.map((b, i) => {
                              if (i !== index) return b;
                              const newItemsDelta = b.itemsDelta.map(
                                (it: any, eI: number) => {
                                  if (eI !== entryIndex) return it;
                                  return {
                                    ...it,
                                    category: newCat,
                                    itemName: "",
                                  };
                                }
                              );
                              return { ...b, itemsDelta: newItemsDelta };
                            })
                          );
                        }}
                      >
                        <option value="">--Kategorie--</option>
                        {Object.keys(categoryMap).map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                      {/* Item */}
                      <select
                        value={entry.itemName}
                        onChange={(e) => {
                          const newItem = e.target.value;
                          setButtons((prev) =>
                            prev.map((b, i) => {
                              if (i !== index) return b;
                              const newItemsDelta = b.itemsDelta.map(
                                (it: any, eI: number) => {
                                  if (eI !== entryIndex) return it;
                                  return { ...it, itemName: newItem };
                                }
                              );
                              return { ...b, itemsDelta: newItemsDelta };
                            })
                          );
                        }}
                        disabled={!entry.category}
                      >
                        <option value="">--Item--</option>
                        {itemsOfCat.map((it) => (
                          <option key={it.name} value={it.name}>
                            {it.name}
                          </option>
                        ))}
                      </select>
                      {/* Anzahl */}
                      <input
                        type="number"
                        value={entry.quantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10) || 0;
                          setButtons((prev) =>
                            prev.map((b, i) => {
                              if (i !== index) return b;
                              const newItemsDelta = b.itemsDelta.map(
                                (it: any, eI: number) => {
                                  if (eI !== entryIndex) return it;
                                  return { ...it, quantity: val };
                                }
                              );
                              return { ...b, itemsDelta: newItemsDelta };
                            })
                          );
                        }}
                      />

                      <button
                        onClick={() => removeItemsDeltaEntry(index, entryIndex)}
                        className="remove-button"
                      >
                        Entfernen
                      </button>
                    </div>
                  );
                })}
                <button
                  onClick={() => addItemsDeltaEntry(index)}
                  className="add-button"
                >
                  Item hinzufügen
                </button>
              </div>
            )}

            {/* economyDelta */}
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={btn.economyDeltaEnabled}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setButtons((prev) =>
                      prev.map((b, i) =>
                        i === index ? { ...b, economyDeltaEnabled: checked } : b
                      )
                    );
                  }}
                />
                economyDelta
              </label>
            </div>
            {btn.economyDeltaEnabled && (
              <div className="nested-section">
                <div className="form-group">
                  <label>Gold:</label>
                  <input
                    type="number"
                    value={btn.economyDelta.gold}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10) || 0;
                      setButtons((prev) =>
                        prev.map((b, i) =>
                          i === index
                            ? {
                                ...b,
                                economyDelta: {
                                  ...b.economyDelta,
                                  gold: val,
                                },
                              }
                            : b
                        )
                      );
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>Edelsteine:</label>
                  <input
                    type="number"
                    value={btn.economyDelta.edelsteine}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10) || 0;
                      setButtons((prev) =>
                        prev.map((b, i) =>
                          i === index
                            ? {
                                ...b,
                                economyDelta: {
                                  ...b.economyDelta,
                                  edelsteine: val,
                                },
                              }
                            : b
                        )
                      );
                    }}
                  />
                </div>
              </div>
            )}

            {/* fluxDelta */}
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={btn.fluxDeltaEnabled}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setButtons((prev) =>
                      prev.map((b, i) =>
                        i === index ? { ...b, fluxDeltaEnabled: checked } : b
                      )
                    );
                  }}
                />
                fluxDelta
              </label>
            </div>
            {btn.fluxDeltaEnabled && (
              <div className="nested-section">
                <div className="form-group">
                  <label>Feeling:</label>
                  <input
                    type="text"
                    value={btn.fluxDelta.feeling}
                    onChange={(e) => {
                      const val = e.target.value;
                      setButtons((prev) =>
                        prev.map((b, i) =>
                          i === index
                            ? {
                                ...b,
                                fluxDelta: { ...b.fluxDelta, feeling: val },
                              }
                            : b
                        )
                      );
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>Buff:</label>
                  <select
                    value={btn.fluxDelta.buff}
                    onChange={(e) => {
                      const val = e.target.value as BuffName;
                      setButtons((prev) =>
                        prev.map((b, i) =>
                          i === index
                            ? { ...b, fluxDelta: { ...b.fluxDelta, buff: val } }
                            : b
                        )
                      );
                    }}
                  >
                    <option value="">--Kein Buff--</option>
                    {getAllBuffNames().map((buff) => (
                      <option key={buff} value={buff}>
                        {buff}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Debuff:</label>
                  <select
                    value={btn.fluxDelta.debuff}
                    onChange={(e) => {
                      const val = e.target.value as DebuffName;
                      setButtons((prev) =>
                        prev.map((b, i) =>
                          i === index
                            ? {
                                ...b,
                                fluxDelta: { ...b.fluxDelta, debuff: val },
                              }
                            : b
                        )
                      );
                    }}
                  >
                    <option value="">--Kein Debuff--</option>
                    {getAllDebuffNames().map((debuff) => (
                      <option key={debuff} value={debuff}>
                        {debuff}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Item (in Hand):</label>
                  <input
                    type="text"
                    value={btn.fluxDelta.item}
                    onChange={(e) => {
                      const val = e.target.value;
                      setButtons((prev) =>
                        prev.map((b, i) =>
                          i === index
                            ? { ...b, fluxDelta: { ...b.fluxDelta, item: val } }
                            : b
                        )
                      );
                    }}
                  />
                </div>
              </div>
            )}

            {/* stateDelta */}
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={btn.stateDeltaEnabled}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setButtons((prev) =>
                      prev.map((b, i) =>
                        i === index ? { ...b, stateDeltaEnabled: checked } : b
                      )
                    );
                  }}
                />
                stateDelta
              </label>
            </div>
            {btn.stateDeltaEnabled && (
              <div className="nested-section">
                {Object.keys(btn.stateDelta).map((k) => (
                  <div key={k} className="form-group">
                    <label>{k}:</label>
                    <input
                      type="number"
                      value={btn.stateDelta[k]}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10) || 0;
                        setButtons((prev) =>
                          prev.map((b, i) => {
                            if (i !== index) return b;
                            return {
                              ...b,
                              stateDelta: { ...b.stateDelta, [k]: val },
                            };
                          })
                        );
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* baseDelta */}
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={btn.baseDeltaEnabled}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setButtons((prev) =>
                      prev.map((b, i) =>
                        i === index ? { ...b, baseDeltaEnabled: checked } : b
                      )
                    );
                  }}
                />
                baseDelta
              </label>
            </div>
            {btn.baseDeltaEnabled && (
              <div className="nested-section">
                {Object.keys(btn.baseDelta).map((k) => (
                  <div key={k} className="form-group">
                    <label>{k}:</label>
                    <input
                      type="number"
                      value={btn.baseDelta[k]}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10) || 0;
                        setButtons((prev) =>
                          prev.map((b, i) => {
                            if (i !== index) return b;
                            return {
                              ...b,
                              baseDelta: { ...b.baseDelta, [k]: val },
                            };
                          })
                        );
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* TriggerGroup */}
            <div className="form-group" style={{ marginTop: "0.5rem" }}>
              <label>Trigger Quest Gruppe:</label>
              <div>
                <label>
                  <input
                    type="radio"
                    checked={btn.triggerGroup === "triggerQuest"}
                    onChange={() => {
                      setButtons((prev) =>
                        prev.map((b, i) =>
                          i === index
                            ? { ...b, triggerGroup: "triggerQuest" }
                            : b
                        )
                      );
                    }}
                  />
                  triggerQuest
                </label>
                <label style={{ marginLeft: 10 }}>
                  <input
                    type="radio"
                    checked={btn.triggerGroup === "endQuest"}
                    onChange={() => {
                      setButtons((prev) =>
                        prev.map((b, i) =>
                          i === index ? { ...b, triggerGroup: "endQuest" } : b
                        )
                      );
                    }}
                  />
                  endQuest
                </label>
                <label style={{ marginLeft: 10 }}>
                  <input
                    type="radio"
                    checked={btn.triggerGroup === "nextEvents"}
                    onChange={() => {
                      setButtons((prev) =>
                        prev.map((b, i) =>
                          i === index ? { ...b, triggerGroup: "nextEvents" } : b
                        )
                      );
                    }}
                  />
                  nextEvents
                </label>
                <label style={{ marginLeft: 10 }}>
                  <input
                    type="radio"
                    checked={btn.triggerGroup === ""}
                    onChange={() => {
                      setButtons((prev) =>
                        prev.map((b, i) =>
                          i === index ? { ...b, triggerGroup: "" } : b
                        )
                      );
                    }}
                  />
                  Keine Auswahl
                </label>
              </div>
            </div>

            {btn.triggerGroup === "triggerQuest" && (
              <div className="nested-section">
                <label>triggerQuest:</label>
                <input
                  type="text"
                  value={btn.triggerQuest}
                  onChange={(e) => {
                    const val = e.target.value;
                    setButtons((prev) =>
                      prev.map((b, i) =>
                        i === index ? { ...b, triggerQuest: val } : b
                      )
                    );
                  }}
                />
              </div>
            )}
            {btn.triggerGroup === "endQuest" && (
              <div className="nested-section">
                <label>endQuest:</label>
                <input
                  type="text"
                  value={btn.endQuest}
                  onChange={(e) => {
                    const val = e.target.value;
                    setButtons((prev) =>
                      prev.map((b, i) =>
                        i === index ? { ...b, endQuest: val } : b
                      )
                    );
                  }}
                />
              </div>
            )}
            {btn.triggerGroup === "nextEvents" && (
              <div className="nested-section">
                {btn.nextEvents.map((ne: NextEventOption, neIndex: number) => (
                  <div key={neIndex} className="next-event-row">
                    <input
                      type="text"
                      placeholder="eventId"
                      value={ne.eventId}
                      onChange={(e) => {
                        const val = e.target.value;
                        setButtons((prev) =>
                          prev.map((b, i) => {
                            if (i !== index) return b;
                            const newNextEvents = b.nextEvents.map(
                              (nx: NextEventOption, xIdx: number) => {
                                if (xIdx !== neIndex) return nx;
                                return { ...nx, eventId: val };
                              }
                            );
                            return { ...b, nextEvents: newNextEvents };
                          })
                        );
                      }}
                    />
                    <input
                      type="number"
                      placeholder="prob"
                      value={ne.probability}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10) || 100;
                        setButtons((prev) =>
                          prev.map((b, i) => {
                            if (i !== index) return b;
                            const newNextEvents = b.nextEvents.map(
                              (nx: NextEventOption, xIdx: number) => {
                                if (xIdx !== neIndex) return nx;
                                return { ...nx, probability: val };
                              }
                            );
                            return { ...b, nextEvents: newNextEvents };
                          })
                        );
                      }}
                      style={{ width: "4rem", marginLeft: "0.5rem" }}
                    />
                    <button
                      onClick={() => removeNextEvent(index, neIndex)}
                      className="remove-button"
                      style={{ marginLeft: "0.5rem" }}
                    >
                      Entfernen
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addNextEvent(index)}
                  className="add-button"
                >
                  NextEvent hinzufügen
                </button>
              </div>
            )}

            {/* Message */}
            <div className="form-group" style={{ marginTop: "0.5rem" }}>
              <label>Message:</label>
              <textarea
                rows={2}
                value={btn.message}
                onChange={(e) => {
                  const val = e.target.value;
                  setButtons((prev) =>
                    prev.map((b, i) =>
                      i === index ? { ...b, message: val } : b
                    )
                  );
                }}
              />
            </div>

            {/* Ganzen Button entfernen */}
            <button
              onClick={() => removeButton(index)}
              className="remove-button"
            >
              Diesen Button entfernen
            </button>
          </div>
        ))}

        <button onClick={addButton} className="add-button">
          Neuen Button hinzufügen
        </button>
      </div>

      {/* ========== Places-Bereich ========== */}
      <div className="places-container">
        <h2>Orte</h2>
        {places.map((pl, pIndex) => (
          <div key={pIndex} className="single-place-row">
            <select
              value={pl.place}
              onChange={(e) => {
                const val = e.target.value as PlacesKeys;
                setPlaces((prev) =>
                  prev.map((pp, idx) =>
                    idx === pIndex ? { ...pp, place: val } : pp
                  )
                );
              }}
            >
              {getAllPlaces().map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={pl.probability}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10) || 100;
                setPlaces((prev) =>
                  prev.map((pp, idx) =>
                    idx === pIndex ? { ...pp, probability: val } : pp
                  )
                );
              }}
              style={{ width: "4rem", marginLeft: "0.5rem" }}
            />
            <button
              onClick={() => removePlace(pIndex)}
              className="remove-button"
              style={{ marginLeft: "0.5rem" }}
            >
              Entfernen
            </button>
          </div>
        ))}
        <button onClick={addPlace} className="add-button">
          Ort hinzufügen
        </button>
      </div>

      {/* ========== Code generieren ========== */}
      <button onClick={generateCode} className="generate-button">
        Code generieren
      </button>

      {/* ========== Ausgabe ========== */}
      {generatedCode && (
        <div className="output-container">
          <h2>Generierter Code</h2>
          <pre className="output-pre">{generatedCode}</pre>
          <p>(Hier kannst du den Code manuell markieren und kopieren.)</p>
        </div>
      )}
    </div>
  );
}
