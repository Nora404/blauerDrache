import { GameEvent } from "../../eventData";
import { ItemName, getRandomItem } from "../../gameItems/ItemData";

const possibleItems: ItemName[] = [
  "Plunder",
  "Kupfererz",
  "Leere Flasche",
  "Wasserflasche",
  "Lederstück",
];
const randomItem: ItemName = getRandomItem(possibleItems);

//#region [events]
export const event008BagFull: GameEvent = {
  id: "008BagFull",
  label: "Beutel mit wertvollem Inhalt",
  description: descriptionText(),
  buttons: [
    {
      label: "Inhalt einstecken",
      getAction: () => ({
        itemsDelta: { [randomItem]: 1 },
        economyDelta: { gold: 5 },
        message: message1,
      }),
    },
    {
      label: "some 2",
      getAction: () => ({
        message: message2,
      }),
    },
  ],
  places: [],
};
//#endregion

function descriptionText() {
  return "Beschreibung";
}

const message1 = "Button 1 gedrückt";

const message2 = "Button 2 gedrückt";
