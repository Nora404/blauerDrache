import { GameEvent } from "../eventData";

//#region [events]
export const event012ChestGold: GameEvent = {
  id: "event012ChestGold",
  label: "In der Truhe lag Gold",
  description: descriptionText(),
  buttons: [
    {
      label: "Gold nehmen",
      getAction: () => ({
        economyDelta: { gold: 50 },
        tempStatsDelta: { luck: 5 },
        message: message1,
      }),
    },
    {
      label: "Truhe schließen",
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
