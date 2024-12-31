
export type Topic = {
    topic: string;
    dialogues: string[];
}

export const npcNames: string[] = [
    "Bäuerin", "Bauer", "Tagelöhner", "Söldner", "Söldnerin", "Entdeckerin", "Händler", "Händlerin",
    "Kräuterhexe", "Bettler", "Schmied", "Schmiedin", "Sängerin", "Tänzerin", "Schnerderin", "Schneider",
    "Alchemist", "Barde", "Jäger", "Jägerin", "Geistlicher", "Wächterin", "Wächter"
];

export const NpcActions: string[] = [
    "unterhält sich mit", "diskutiert mit", "erzählt eine Geschichte von",
    "tauscht Neuigkeiten mit", "lacht mit", "streitet mit",
    "philosophiert mit", "scherzt mit", "erinnert sich mit", "plaudert mit"
];

export const NpcTopics: Topic[] = [
    {
        topic: "über das Wetter",
        dialogues: [
            "Es wird wohl bald regnen, ich spüre es in meinen Knochen!",
            "Hast du den Sturm letzte Nacht gehört? Er klang wie ein wildes Tier.",
            "Die Sonne scheint heute so heiß, ich kann kaum atmen!",
            "Es ist merkwürdig, wie schnell der Nebel aufzieht, findest du nicht?",
            "Der Regenbogen gestern war wirklich beeindruckend!"
        ]
    },
    {
        topic: "über die hohen Preise",
        dialogues: [
            "Früher hat ein Brot nur ein paar Kupfermünzen gekostet!",
            "Ich wette, der Händler betrügt uns absichtlich.",
            "Warum ist der Preis für Äpfel plötzlich so hoch?",
            "Die Schmiede verlangt mittlerweile fast doppelt so viel für ein Schwert!",
            "Ich überlege, ob ich anfangen sollte, selbst Gemüse anzubauen."
        ]
    },
    {
        topic: "über eine lustige Geschichte",
        dialogues: [
            "Und dann ist der Esel einfach in den Laden marschiert!",
            "Ich habe selten so gelacht, als er auf den Eimer gefallen ist.",
            "Er dachte, die Vogelscheuche sei ein echter Mensch und hat sie gegrüßt!",
            "Ein Huhn ist dem Bäcker in die Küche gefolgt, das war ein Chaos!",
            "Der Hund hat versucht, die Katze zu jagen, und ist dabei in den Brunnen gefallen."
        ]
    },
    {
        topic: "über das Fest, letztens in der Taverne",
        dialogues: [
            "Die Musik war fantastisch, ich konnte gar nicht stillstehen!",
            "Die Feuerwerke waren wirklich beeindruckend, findest du nicht?",
            "Der Tanzwettbewerb war ein echtes Highlight!",
            "Jemand hat versucht, die ganze Bierfasspyramide zu erklimmen!",
            "Ich habe noch nie so viele Leute auf einem Haufen gesehen."
        ]
    },
    {
        topic: "über Gerüchte aus der Nachbarschaft",
        dialogues: [
            "Hast du gehört, dass der Schmied und die Heilerin sich treffen?",
            "Angeblich hat jemand den Schlüssel zur alten Gruft gefunden.",
            "Man sagt, die Mühle sei verflucht, deshalb bleibt sie nachts stehen.",
            "Es gibt Gerüchte, dass der Bürgermeister ein geheimes Zimmer hat.",
            "Ich habe gehört, dass ein Fremder nach dem alten Artefakt sucht."
        ]
    },
    {
        topic: "über einen mysteriösen Fremden",
        dialogues: [
            "Er hat diese seltsame Kleidung getragen, wie aus einer anderen Welt.",
            "Sein Blick war so durchdringend, dass mir ganz unwohl wurde.",
            "Er sprach in einer Sprache, die ich noch nie gehört habe.",
            "Er hat einen goldenen Ring getragen, der sehr alt aussah.",
            "Niemand weiß, woher er gekommen ist oder wohin er gegangen ist."
        ]
    },
    {
        topic: "über das verschwundene Artefakt",
        dialogues: [
            "Man sagt, es sei im alten Turm versteckt.",
            "Vielleicht war es doch nur eine Geschichte, um uns Angst zu machen.",
            "Ich habe gehört, dass es von einem Drachen bewacht wird.",
            "Ein Schatzjäger hat versucht, es zu finden, und ist nie zurückgekehrt.",
            "Es soll magische Kräfte haben, die niemand versteht."
        ]
    },
    {
        topic: "über die Liebe",
        dialogues: [
            "Ich glaube, Leon ist in die Bäckerin verliebt.",
            "Liebe ist so kompliziert, findest du nicht?",
            "Hast du gesehen, wie sie ihn angeschaut hat? Das war eindeutig!",
            "Er hat ihr gestern Blumen gebracht, ich schwöre es!",
            "Manchmal frage ich mich, ob Liebe wirklich alles überwindet."
        ]
    },
    {
        topic: "über alte Zeiten",
        dialogues: [
            "Damals war alles einfacher, keine Magie, keine Gefahren.",
            "Ich erinnere mich noch an das alte Gasthaus am Fluss.",
            "Früher war dieser Platz voller Leben, jetzt ist er verlassen.",
            "Die Ernte war damals viel reicher, weißt du noch?",
            "Ich vermisse die Abende, an denen wir am Lagerfeuer gesessen haben."
        ]
    },
    {
        topic: "über den Bürgermeister",
        dialogues: [
            "Er tut so, als ob er uns alle retten könnte.",
            "Manchmal frage ich mich, ob er wirklich so viel weiß, wie er vorgibt.",
            "Er hat eine neue Statue von sich selbst errichten lassen!",
            "Seine Reden dauern immer so lange, dass ich fast einschlafe.",
            "Manche sagen, er sei früher ein Abenteurer gewesen."
        ]
    },
    {
        topic: "über die gefährlichen Kreaturen um Lahtheim herum",
        dialogues: [
            "Ich habe gehört, dass ein riesiger Wolf in den Wäldern lauert.",
            "Die Fischer behaupten, dass ein Seeungeheuer ihr Boot angegriffen hat.",
            "Die Goblins werden immer mutiger, sie kommen bis an die Stadtmauern!",
            "Gestern Nacht hat jemand einen Schatten mit roten Augen gesehen.",
            "Die Bauern trauen sich kaum noch, ihre Felder zu bestellen."
        ]
    },
    {
        topic: "über den letzten erfolgslosen Helden",
        dialogues: [
            "Er wollte das Artefakt finden und ist nie zurückgekehrt.",
            "Seine Rüstung war beeindruckend, aber er war wohl nicht mutig genug.",
            "Man sagt, er sei an seiner eigenen Überheblichkeit gescheitert.",
            "Niemand weiß, wo er begraben liegt, falls er überhaupt tot ist.",
            "Vielleicht hat er einfach das Abenteuerleben aufgegeben."
        ]
    },
    {
        topic: "über den Wirt in der Taverne und sein ... Haustier",
        dialogues: [
            "Ich schwöre, sein Haustier hat mit mir gesprochen!",
            "Es sieht aus wie eine Katze, benimmt sich aber nicht so.",
            "Manchmal denke ich, das Tier ist schlauer als wir alle.",
            "Es hat einmal meinen Stuhl geklaut und darauf geschlafen.",
            "Der Wirt sagt, es bewacht die Taverne vor Einbrechern."
        ]
    },
    {
        topic: "über die neuesten Rüstungen",
        dialogues: [
            "Warum darf man nicht Helm und Brustpanzer gleichzeitig tragen?",
            "Die neue Rüstung glänzt so sehr, dass man sie aus der Ferne sehen kann.",
            "Ich habe gehört, sie wiegt so viel, dass man kaum laufen kann.",
            "Jemand meinte, die neue Rüstung sei eigentlich nur Dekoration.",
            "Vielleicht ist es besser, einfach leicht und schnell zu bleiben."
        ]
    },
    {
        topic: "über die neuen Farben, die letztens angekommen sind",
        dialogues: [
            "Das Blau ist wirklich schön, es erinnert mich an den Sommerhimmel.",
            "Ich hätte nie gedacht, dass Lila so edel wirken kann.",
            "Die neue rote Farbe ist so intensiv, sie leuchtet fast!",
            "Ich frage mich, wie sie diese Farben überhaupt herstellen.",
            "Jemand hat gesagt, dass sie aus einer weit entfernten Region kommen."
        ]
    }
];
