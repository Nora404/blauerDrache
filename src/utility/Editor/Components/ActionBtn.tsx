import { useMemo } from "react";
import { BuffName } from "../../../data/buffData";
import { DebuffName } from "../../../data/debuffData";
import { NextEventOption } from "../../../data/eventData";
import { ItemCartegoryName } from "../../../data/ItemData";
import { useEditorContext } from "../Context/Context";
import {
  buildItemCategories,
  getAllBuffNames,
  getAllDebuffNames,
} from "../Context/Helper";
import MultiColoredLetters from "../../MultiColoredLetters";
import { yellowColors } from "../../../data/colorMappingData";
import TriggerGroup from "./TriggerGroup";

const ActionBtn: React.FC = () => {
  const {
    buttons,
    setButtons,
    removeItemsDeltaEntry,
    addItemsDeltaEntry,
    addButton,
    removeButton,
    addNextEvent,
    removeNextEvent,
  } = useEditorContext();
  const categoryMap = useMemo(() => buildItemCategories(), []);

  return (
    <div className="max-widht">
      <h2>Buttons</h2>

      <div className="buttons-container">
        {buttons.map((btn, index) => (
          <div key={index} className="single-button space-top">
            <details open={true} className="mb-2">
              <summary>
                <b>
                  <MultiColoredLetters colors={yellowColors}>
                    Neuer Button:
                  </MultiColoredLetters>
                  &nbsp; &nbsp;{btn.label || "Hat noch keinen Namen!"}
                </b>
              </summary>
              {/* Button Label */}
              <div className="form-group">
                <label>Button Label:</label>
                <input
                  type="text"
                  value={btn.label}
                  onChange={(e) => {
                    const val = e.target.value;
                    setButtons((prev) =>
                      prev.map((b, i) =>
                        i === index ? { ...b, label: val } : b
                      )
                    );
                  }}
                />
              </div>
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
                      <div key={entryIndex} className="flex-row">
                        {/* Kategorie */}
                        <select
                          className="w-full"
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
                        <br />
                        {/* Item */}
                        <select
                          className="w-full"
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
                        <br />
                        {/* Anzahl */}
                        <input
                          className="w-full"
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
                          onClick={() =>
                            removeItemsDeltaEntry(index, entryIndex)
                          }
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
                          i === index
                            ? { ...b, economyDeltaEnabled: checked }
                            : b
                        )
                      );
                    }}
                  />
                  economyDelta
                </label>
              </div>
              {btn.economyDeltaEnabled && (
                <div className="nested-section flex-warp">
                  <div className="form-group m-15">
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
                <div className="nested-section flex-row">
                  <div className="form-group w-100">
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
                  <div className="form-group w-100">
                    <label>Buff:</label>
                    <select
                      value={btn.fluxDelta.buff}
                      onChange={(e) => {
                        const val = e.target.value as BuffName;
                        setButtons((prev) =>
                          prev.map((b, i) =>
                            i === index
                              ? {
                                  ...b,
                                  fluxDelta: { ...b.fluxDelta, buff: val },
                                }
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
                  <div className="form-group w-100">
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
                  <div className="form-group w-100">
                    <label>Item (in Hand):</label>
                    <input
                      type="text"
                      value={btn.fluxDelta.item}
                      placeholder="Nichts"
                      onChange={(e) => {
                        const val = e.target.value;
                        setButtons((prev) =>
                          prev.map((b, i) =>
                            i === index
                              ? {
                                  ...b,
                                  fluxDelta: { ...b.fluxDelta, item: val },
                                }
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
                <div className="nested-section flex-warp">
                  {Object.keys(btn.stateDelta).map((k) => (
                    <div key={k} className="form-group m-15">
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
                <div className="nested-section flex-warp">
                  {Object.keys(btn.baseDelta).map((k) => (
                    <div key={k} className="form-group m-15">
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
              <TriggerGroup button={btn} index={index} />

              {/* Ganzen Button entfernen */}
              <button
                onClick={() => removeButton(index)}
                className="remove-button w-100"
              >
                Diesen Button entfernen
              </button>
            </details>
            <hr />
          </div>
        ))}

        <button onClick={addButton} className="add-button">
          Neuen Button hinzufügen
        </button>
      </div>
    </div>
  );
};

export default ActionBtn;
