import { GameEvent } from "../../eventData";

//#region [events]
export const event017ChestTrap: GameEvent = {
  id: "017ChestTrap",
  label: "Eine Falle!",
  description: descriptionText(),
  buttons: [
    {
      label: "Mist!",
      getAction: () => ({
        itemsDelta: { Stein: 1 },
        economyDelta: { gold: 1 },
        tempStatsDelta: { life: -10 },
        message: message1,
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
