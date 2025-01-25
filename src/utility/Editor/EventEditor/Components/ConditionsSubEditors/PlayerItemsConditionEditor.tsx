// ConditionsSubEditors/PlayerItemsConditionEditor.tsx
import React from "react";
import { ConditionsConfig } from "../../../Context/EventContext";

import { items } from "../../../../../data/ItemData"; // Pfad anpassen
import { ItemCartegoryName, ItemName } from "../../../../../data/ItemData";

/**
 * Du hast "category" im Item. 
 * Falls du eine Hilfsfunktion oder so hast (z.B. "buildItemCategories()"),
 * kannst du die hier verwenden. 
 * Hier zeige ich dir, wie du z.B. Items nimmst und gruppierst.
 */
function groupItemsByCategory() {
    const map: Record<string, ItemName[]> = {};
    items.forEach((it) => {
        const cat = it.category || "Sonstiges";
        if (!map[cat]) {
            map[cat] = [];
        }
        map[cat].push(it.name);
    });
    return map;
}
const itemCategoriesMap = groupItemsByCategory();
const allCategories = Object.keys(itemCategoriesMap) as ItemCartegoryName[];

interface SubEditorProps {
    conditions: ConditionsConfig;
    updateConditions: (partial: Partial<ConditionsConfig>) => void;
}

const PlayerItemsConditionEditor: React.FC<SubEditorProps> = ({ conditions, updateConditions }) => {
    const cItems = conditions.playerItems || [];

    // Hilfsfunktionen
    const updateRow = (idx: number, newCat: ItemCartegoryName, newItem: ItemName, newQty: number) => {
        const clone = [...cItems];
        clone[idx] = { category: newCat, itemName: newItem, quantity: newQty };
        updateConditions({ playerItems: clone });
    };

    const handleCategoryChange = (idx: number, cat: ItemCartegoryName) => {
        // wenn man category ändert, itemName leeren
        updateRow(idx, cat, "" as ItemName, cItems[idx].quantity || 1);
    };
    const handleItemChange = (idx: number, it: ItemName) => {
        updateRow(idx, cItems[idx].category, it, cItems[idx].quantity || 1);
    };
    const handleQtyChange = (idx: number, val: number) => {
        updateRow(idx, cItems[idx].category, cItems[idx].itemName, val);
    };

    const addItemRow = () => {
        updateConditions({
            playerItems: [...cItems, { category: "" as ItemCartegoryName, itemName: "" as ItemName, quantity: 1 }],
        });
    };

    const removeItemRow = (idx: number) => {
        const clone = cItems.filter((_, i) => i !== idx);
        updateConditions({ playerItems: clone });
    };

    return (
        <div style={{ border: "1px solid #aaa", padding: "0.5rem", margin: "0.5rem 0" }}>
            <h4>PlayerItems</h4>

            {cItems.map((row, idx) => {
                const cat = row.category;
                // hole item-Liste aus dem Map
                const itemList = cat ? itemCategoriesMap[cat] || [] : [];
                return (
                    <div key={idx} style={{ marginBottom: "0.5rem" }}>
                        <select
                            value={cat}
                            onChange={(e) => handleCategoryChange(idx, e.target.value as ItemCartegoryName)}
                        >
                            <option value="">--Kategorie--</option>
                            {allCategories.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>

                        <select
                            value={row.itemName}
                            onChange={(e) => handleItemChange(idx, e.target.value as ItemName)}
                            disabled={!cat}
                        >
                            <option value="">--Item--</option>
                            {itemList.map((nm) => (
                                <option key={nm} value={nm}>
                                    {nm}
                                </option>
                            ))}
                        </select>

                        <label style={{ marginLeft: "1rem" }}>Menge:</label>
                        <input
                            type="number"
                            value={row.quantity || 1}
                            onChange={(e) => handleQtyChange(idx, parseInt(e.target.value) || 1)}
                            style={{ width: "60px", marginLeft: "0.5rem" }}
                        />

                        <button onClick={() => removeItemRow(idx)} style={{ marginLeft: "1rem", color: "red" }}>
                            X
                        </button>
                    </div>
                );
            })}

            <button onClick={addItemRow}>+ Item-Bedingung</button>
        </div>
    );
};

export default PlayerItemsConditionEditor;
