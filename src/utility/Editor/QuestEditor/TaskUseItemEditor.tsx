// TaskUseItemEditor.tsx
import React, { useMemo } from "react";

import { UseItem } from "../../../data/questData"; 
import { useQuestCreatorContext } from "../Context/QuestContext";
import { buildItemCategories } from "../Context/Helper";
// type UseItem = { item: ItemName; place: string };

export default function TaskUseItemEditor() {
  const { progress, setProgress } = useQuestCreatorContext();
  const { task } = progress;
  const useItem = task.useItem || { item: "", place: "" };

  const categoryMap = useMemo(() => buildItemCategories(), []);

  // Alle Items
  const allItems = Object.values(categoryMap).flat();

  function updateUseItem(partial: Partial<UseItem>) {
    setProgress({
      ...progress,
      task: {
        ...task,
        useItem: { ...useItem, ...partial },
      },
    });
  }

  return (
    <div className="nested-section">
      <h4>UseItem</h4>
      <div className="flex-row">
        {/* Item */}
        <select
          className="w-full"
          value={useItem.item}
          onChange={(e) => updateUseItem({ item: e.target.value })}
        >
          <option value="">--Item wählen--</option>
          {allItems.map((it) => (
            <option key={it.name} value={it.name}>
              {it.name}
            </option>
          ))}
        </select>

        {/* place */}
        <input
          className="w-full"
          type="text"
          placeholder="Place..."
          value={useItem.place}
          onChange={(e) => updateUseItem({ place: e.target.value })}
        />
      </div>
    </div>
  );
}
