export type ItemName =
    | "Nichts"
    | "Stein"
    | "Stock"
    | "Pilz"
    | "Plunder"
    | "Blume"
    | "Kupfererz"
    | "Leere Flasche"
    | "Wasserflasche"
    | "Lederstück"

export function getRandomItem(possibleItems: ItemName[]) {
    const index = Math.floor(Math.random() * possibleItems.length);
    return possibleItems[index];
}