import { GameEvent } from "../eventData";
import { GameQuest } from "../questData";

export const quest003FindStone: GameQuest = {
  id: "Q003FindStone",
  label: "Sammle 3 Steine",
  description:
    "Jemand benötigt für den Bau seines Kellers drei faustgroße Steine. Bringe sie zur Truhe am schwarzen Brett beim {PLACES.Brunnen}.",
  reward:
    "Du wirst etwas {SYSTEM.Gold} {Talk|grün}bekommen{/Talk} und dein {SYSTEM.Ruf} {Talk|grün}verbessern{/Talk}.",
  eventByEnd: "E003FindStoneEnd",
  progress: {
    type: "Besorgen",
    path: "/fountain-board-service",
    eventByEnd: "E003FindStoneEnd",
    isDone: false,
    task: { haveItem: [{ item: "Stein", need: 3, count: 0 }] },
  },

  repeat: true,
};

export const event003FindStoneTrigger: GameEvent = {
  id: "E003FindStoneTrigger",
  label: "Drei Steine gesucht",
  description: descriptionTrigger(),
  buttons: [
    {
      label: "Annehmen",
      getAction: () => {
        return {
          message: "Du hast die Quest angenommen!",
          triggerQuest: "Q003FindStone",
        };
      },
    },
    {
      label: "Ablehnen",
      getAction: () => {
        return {
          message: "Du lehntest ab...",
        };
      },
    },
  ],
  places: [],
};

export const event003FindStoneEnd: GameEvent = {
  id: "E003FindStoneEnd",
  label: "Drei Steine abgegeben",
  description: descriptionEnd(),
  buttons: [
    {
      label: "gern geschehen",
      getAction: () => {
        return {
          message: "Du hast für die Steine 5 {SYSTEM.Gold} {Talk|grün}bekommen{/Talk} und deinen {SYSTEM.Ruf} um 3 {Talk|grün}verbessern{/Talk}.",
          endQuest: "Q003FindStone",
          itemsDelta: { Stein: -3 },
          economyDelta: { gold: 5 },
          baseDelta: { leumund: 3 },
        };
      },
    },
  ],
  places: [],
};


function descriptionTrigger() {
  return `Ein Zettel fällt dir besonders ins Auge - die Aufgabe scheint denkbar einfach: {Talk|grau}"Ich brauche drei Steine."{/Talk} 
Stirnrunzelnd blickst du auf den Boden, der von kleineren Steinen übersät ist. Dann liest du weiter: {Talk|grau}"Für den Bau einer neuen Wand in meinem Keller. Die Steine müssen mindestens faustgroß sein."{/Talk}
Sind für eine Mauer wirklich nur drei Steine nötig? Du zuckst mit den Schultern und murmelst: {Talk|Player}„Leicht verdientes Gold!“{/Talk}`;
}

function descriptionEnd() {
  return `Du öffnest die Truhe am Fuß des schwarzen Bretts. Während du die Steine hineinlegst, fragst du dich, woher der Auftraggeber wohl weiß, dass seine Lieferung angekommen ist. Im nächsten Moment denkst du an deine Belohnung.
Noch halb über die Truhe gebeugt und mit den Steinen in der Hand blickst du auf. Ein {CREATURE.geflügeltesWesen} grinst dich an.

{Talk|pink}„Sehr gut!“{/Talk} piepst es. {Talk|pink}„Ich werde dem Kunden Bescheid geben. Er hat mir das hier für die Person hinterlassen, die den Auftrag erfüllt.“{/Talk}

Mit diesen Worten kramt es ein paar {MultiColoredLetters|yellowColors}Münzen{/MultiColoredLetters} aus einer kleinen Tasche hervor und reicht sie dir. Du lässt die Steine in die Truhe fallen und greifst nach deinem wohlverdienten Lohn.`;
}