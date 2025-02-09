import { GameEvent } from "../../../eventData";

//#region [events]
export const event018Donate: GameEvent = {
  id: "event018Donate",
  label: "",
  description: descriptionText(),
  buttons: [
    {
      label: "Lege ein Goldstück in die Schale",
      result: "-1 {SYSTEM.Gold}",
      conditions: {
        operator: ">",
        playerEconomy: {
          gold: 0,
        },
      },
      getAction: () => ({
        economyDelta: { gold: -1 },
        baseDelta: { exp: 5 },
        message: message0,
      }),
    },
    {
      label: "Lege ein paar Goldstücke in die Schale",
      result: "-10 {SYSTEM.Gold}",
      conditions: {
        operator: ">",
        playerEconomy: {
          gold: 9,
        },
      },
      getAction: () => ({
        economyDelta: { gold: -10 },
        baseDelta: { exp: 15, leumund: 5 },
        message: message1,
      }),
    },
    {
      label: "Lege eine Handvoll Goldstücke in die Schale",
      result: "-50 {SYSTEM.Gold}",
      conditions: {
        operator: ">",
        playerEconomy: {
          gold: 49,
        },
      },
      getAction: () => ({
        economyDelta: { gold: -50 },
        fluxDelta: { buff: { Gütig: 4 } },
        baseDelta: { leumund: 15 },
        message: message2,
      }),
    },
  ],
  places: [],
};
//#endregion

function descriptionText() {
  return `Du greifst mit der Hand nach deinem Beutel, während dein Blick unverwandt auf der kleinen, flachen Schale ruht. Darin liegen einige rötliche Münzen, die zusammen nicht einmal den Wert eines Goldstücks erreichen. Mit einem leisen Klimpern ziehst du den Beutel hervor. Du spürst die erwartungsvollen Blicke, die auf dir ruhen. Wie viel willst du spenden?`;
}

const message0 = `Zögernd öffnest du deinen Beutel, greifst nach einem Goldstück und blickst dich noch einmal um. Langsam näherst du dich der Schale und legst deine Spende behutsam hinein. Du achtest darauf, keine Geräusche zu verursachen. Als du dich zufrieden abwendest, erfüllt dich ein warmes Gefühl. Deine Erfahrungen sind gewachsen.

Du {Talk|grün}erhältst etwas{/Talk} {SYSTEM.Erfahrung} und bist um ein {SYSTEM.Gold} {Talk|rot}leichter{/Talk}.`;

const message1 = `Du öffnest deinen Beutel und lässt deine Finger durch die Münzen gleiten. Dabei drehst du dich um deine eigene Achse, um die Blicke, die auf dir ruhen, zu erwidern. Doch nicht einmal die {NPC.dunkleGestalt} in der Ecke ist zu erkennen - sie scheint sich in einer der schlecht ausgeleuchteten Nischen der {PLACES.Kirche} zu verbergen. In Gedanken versunken hast du ein paar Goldstücke herausgezogen. Nachdem du sie in die Schale gelegt hast, durchflutet dich eine {MultiColoredLetters|yellowColors}angenehme Wärme{/MultiColoredLetters}.

Dein {SYSTEM.Leumund} und deine {SYSTEM.Erfahrung} sind {Talk|grün}gestiegen{/Talk}. Du bist um ein paar {SYSTEM.Gold} {Talk|rot}leichter{/Talk}.`;

const message2 = `Mit festem Schritt näherst du dich der Schale. Mit einer schnellen Handbewegung öffnest du deinen Beutel und greifst beherzt hinein. Niemand soll dich für geizig halten - diese Blicke sollen sehen, wie großzügig du bist, während die Münzen klirrend in die Schale fallen. Mit einem lauten Aufprall hüpfen die Goldstücke kurz auf, bevor sie zur Ruhe kommen. Zufrieden wendest du dich ab. Plötzlich erscheint dir die {PLACES.Kirche} {MultiColoredLetters|yellowColors}hell und warm{/MultiColoredLetters}. Du spürst die Veränderung - eine Art Versprechen, dass dich ein schöner Tag erwartet.

Dein {SYSTEM.Leumund} ist {Talk|grün}gestiegen{/Talk} und du hast den Buff {Talk|gelb}Gütig{/Talk} für heute {Talk|grün}erhalten{/Talk}. Du bist aber auch um eine Handvoll {SYSTEM.Gold} {Talk|rot}leichter{/Talk}.`;
