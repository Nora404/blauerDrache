import { GameEvent } from "../../eventData";

//#region [events]
export const event011ChestJunk: GameEvent = {
  id: "011ChestJunk",
  label: "Plunder in Truhe gefunden",
  description: descriptionText(),
  buttons: [
    {
      label: "Plunder nehmen",
      getAction: () => ({
        itemsDelta: { Plunder: 3 },
        message: message1,
      }),
    },
    {
      label: "Truhe wieder schließen",
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
