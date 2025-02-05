import { GameEvent } from "../../eventData";

//#region [events]
export const event015FairyLost: GameEvent = {
  id: "015FairyLost",
  label: "Du hast die Fee verloren",
  description: descriptionText(),
  buttons: [
    {
      label: "Mist!",
      getAction: () => ({
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
