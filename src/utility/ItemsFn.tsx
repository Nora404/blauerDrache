import { useGameStore } from "../data/gameStore";

export function hasItem(itemName: string): boolean {
    const { gameStore } = useGameStore();
    const count = gameStore.equipment.items[itemName] || 0;
    return count > 0;
}

// BENUTZEN
// if (hasItem("Stein")) {
//  console.log("Du hast mindestens einen Stein!");
//}


export function itemCount(itemName: string): number {
    const { gameStore } = useGameStore();
    return gameStore.equipment.items[itemName] || 0;
}

// BENUTZEN
// if (itemCount("Pilz") >= 3) {
//   console.log("Du hast mindestens 3 Pilze!");
// }


// Wenn du ein Item hinzufügst: items["Pilz"] = (items["Pilz"] || 0) + 1;
// Wenn die Anzahl <= 0 wird: delete items["Pilz"];