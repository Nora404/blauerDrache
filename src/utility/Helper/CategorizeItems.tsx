import { ItemCartegoryName, ItemName, items } from "../../data/gameItems/ItemData";

export function categorizeItems(): Record<ItemCartegoryName, ItemName[]> {
    return items.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        acc[item.category].push(item.name);
        return acc;
    }, {} as Record<ItemCartegoryName, ItemName[]>);
}