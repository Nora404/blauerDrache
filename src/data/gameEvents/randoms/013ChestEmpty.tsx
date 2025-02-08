import { GameEvent } from "../../eventData";

//#region [events]
export const event013ChestEmpty: GameEvent = {
  id: "013ChestEmpty",
  label: "Die Truhe war leer",
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

