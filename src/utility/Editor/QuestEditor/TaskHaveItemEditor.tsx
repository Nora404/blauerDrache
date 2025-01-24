// TaskHaveItemEditor.tsx
import React, { useMemo } from "react"; 


import { HaveItem } from "../../../data/questData"; // { item: ItemName; need: number; count: number }
import { useQuestCreatorContext } from "../Context/QuestContext";
import { buildItemCategories } from "../Context/Helper";
import { ItemName } from "../../../data/ItemData";

export default function TaskHaveItemEditor() {
  const { progress, setProgress } = useQuestCreatorContext();
  const { task } = progress;
  const haveItem = task.haveItem || []; // Array of HaveItem

  const categoryMap = useMemo(() => buildItemCategories(), []);

  function updateHaveItem(newList: HaveItem[]) {
    setProgress({
      ...progress,
      task: {
        ...task,
        haveItem: newList,
      },
    });
  }

  function addEntry() {
    const newEntry: HaveItem = {
      item: "Nichts", // ItemName
      need: 1,
      count: 0, // Start?
    };
    updateHaveItem([...haveItem, newEntry]);
  }

  function removeEntry(index: number) {
    updateHaveItem(haveItem.filter((_, i) => i !== index));
  }

  function updateEntry(index: number, partial: Partial<HaveItem>) {
    updateHaveItem(
      haveItem.map((entry, i) =>
        i === index ? { ...entry, ...partial } : entry
      )
    );
  }

  return (
    <div className="nested-section">
      <h4>HaveItem</h4>
      {haveItem.map((entry, entryIndex) => {
        // Wir gehen davon aus, dass "item" in der Form "Stein" usw. ist,
        // plus category:???
        // In der reinen QuestData-Struktur hast du nur { item, need, count } 
        // und kein "category". 
        // => Du kannst also "category" optional hinzufügen oder 
        //    du filterst das CategoryMap anders.
        // Hier simpler Ansatz: wir machen eine "Kategorie" via find, 
        //   oder wir lassen es weg und zeigen direkt alle Items in einem Select.
        // => zur Vereinfachung: wir listen alle Items, egal welcher Kategorie:
        const allItems = Object.values(categoryMap).flat();

        return (
          <div key={entryIndex} className="flex-row">
            {/* Itemauswahl */}
            <select
              className="w-full"
              value={entry.item}
              onChange={(e) => {
                const newItem = e.target.value as ItemName;
                updateEntry(entryIndex, { item: newItem });
              }}
            >
              <option value="">--Item wählen--</option>
              {allItems.map((it) => (
                <option key={it.name} value={it.name}>
                  {it.name}
                </option>
              ))}
            </select>

            {/* need */}
            <input
              type="number"
              className="w-full"
              value={entry.need || 1}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10) || 1;
                updateEntry(entryIndex, { need: val });
              }}
            />

            <button
              onClick={() => removeEntry(entryIndex)}
              className="remove-button"
            >
              Entfernen
            </button>
          </div>
        );
      })}

      <button onClick={addEntry} className="add-button">
        haveItem hinzufügen
      </button>
    </div>
  );
}
