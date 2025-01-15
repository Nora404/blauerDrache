import React, { useMemo } from "react";
import { ButtonConfig, useEditorContext } from "../Context/Context";
import { ItemCartegoryName } from "../../../data/ItemData";
import { buildItemCategories } from "../Context/Helper";

type ItemsDeltaProps = {
  button: ButtonConfig;
  index: number;
};

const ItemsDelta: React.FC<ItemsDeltaProps> = ({ button, index }) => {
  const { setButtons, addItemsDeltaEntry, removeItemsDeltaEntry } =
    useEditorContext();

  // Typisiertes categoryMap
  const categoryMap = useMemo(() => buildItemCategories(), []);

  return (
    <div className="max-widht">
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={button.itemsDeltaEnabled}
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
      {button.itemsDeltaEnabled && (
        <div className="nested-section">
          {button.itemsDelta.map((entry, entryIndex) => {
            const itemsOfCat = entry.category
              ? categoryMap[entry.category as ItemCartegoryName] ?? [] // Sicherstellen, dass category typisiert ist
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
                        const newItemsDelta = b.itemsDelta.map((it, eI) => {
                          if (eI !== entryIndex) return it;
                          return {
                            ...it,
                            category: newCat,
                            itemName: "",
                          };
                        });
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
                        const newItemsDelta = b.itemsDelta.map((it, eI) => {
                          if (eI !== entryIndex) return it;
                          return { ...it, itemName: newItem };
                        });
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
                  value={entry.quantity || 0} // Fallback für undefined
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10) || 0;
                    setButtons((prev) =>
                      prev.map((b, i) => {
                        if (i !== index) return b;
                        const newItemsDelta = b.itemsDelta.map((it, eI) => {
                          if (eI !== entryIndex) return it;
                          return { ...it, quantity: val };
                        });
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
    </div>
  );
};

export default ItemsDelta;
