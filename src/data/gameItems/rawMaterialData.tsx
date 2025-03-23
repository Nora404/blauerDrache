import ColoredText from "../../utility/Formatted/ColoredText";
import { Item, ToolName } from "./ItemData";

export type RawMaterialName =
    | "Holz"        // Brett            -> Werkbank beim Handwerker
    | "Stein"       // Steinblock       -> Werkbank beim Handwerker
    | "Baumwolle"   // leichter Stoff   -> Atelier bei Jägerin
    | "Wolle"       // warmer Stoff     -> Atelier bei Jägerin
    | "Erz"         // Barren           -> Ofen beim Handwerker
    | "Tierhaut"    // Leder            -> Atelier bei Jägerin
    | "Fell"        // Pelz             -> Atelier bei Jägerin
    | "Fisch"       // Fischfilet       -> Küche in der Taverne
    | "Fleisch"     // Fleischstück     -> Küche in der Taverne
    | "Knochen"     // Knochenmehl      -> Labor beim Alchemisten
    | "Schuppe"     // Glitzer          -> Labor beim Alchemisten
    | "Zahn"        // Anhänger         -> Atelier bei Jägerin
    | "Feder"       // Federbündel      -> Atelier bei Jägerin
    | "Kohle"       // Briquette        -> Werkbank beim Handwerker
    | "Wasser"      // Wasserflasche    -> Küche in der Taverne
    | "Getreide"    // Mehl             -> Mühle beim Bauernhof
    | "Sand"        // Glas             -> Ofen beim Handwerker
    | "Erde"        // Pflanzboden      -> Werkbank beim Handwerker
    | "Kräuter"     // Kräuterbündel    -> Küche in der Taverne
    | "Blüte"       // Blütenextrakt    -> Labor beim Alchemisten
    | "Pilz"        // Pilzpulver       -> Labor beim Alchemisten
    | "Gemüse"      //                  -> Küche in der Taverne
    | "Frucht";     //                  -> Küche in der Taverne

export type RawMaterial = Item & {
    tool: ToolName | "Nichts";
}

export const emptyRawMaterialObj: RawMaterial = {
    name: "Nichts",
    label: <ColoredText color="grau">Nichts</ColoredText>,
    category: "Rohstoff",
    description: "Nichts was sich beschreiben ließe.",
    ek: 0,
    vk: 0,
    tool: "Nichts",
}

export const rawMaterials: RawMaterial[] = [
    {
        name: "Holz",
        label: <ColoredText>Holz</ColoredText>,
        category: "Rohstoff",
        description: "Ein Stück unbearbeitetes Holz aus der Natur",
        ek: 5,
        vk: 2,
        tool: "Axt",
    },
    {
        name: "Stein",
        label: <ColoredText>Stein</ColoredText>,
        category: "Rohstoff",
        description: "Ein kleiner Brocken Stein ohne besondere Eigenschaften",
        ek: 5,
        vk: 2,
        tool: "Nichts",
    },
    {
        name: "Baumwolle",
        label: <ColoredText>Baumwolle</ColoredText>,
        category: "Rohstoff",
        description: "Ein Büschel Baumwolle, frisch gepflückt",
        ek: 10,
        vk: 4,
        tool: "Sichel",
    },
    {
        name: "Erz",
        label: <ColoredText>Erz</ColoredText>,
        category: "Rohstoff",
        description: "Ein Stück Erz, bereit zur Verarbeitung",
        ek: 8,
        vk: 3,
        tool: "Spitzhacke",
    },
    {
        name: "Wolle",
        label: <ColoredText>Wolle</ColoredText>,
        category: "Rohstoff",
        description: "Ein Knäuel Wolle, frisch geschoren",
        ek: 10,
        vk: 4,
        tool: "Messer",
    },
    {
        name: "Tierhaut",
        label: <ColoredText>Leder</ColoredText>,
        category: "Rohstoff",
        description: "Ein Stück Tierhaut, das zu Leder verarbeitet werden kann",
        ek: 8,
        vk: 3,
        tool: "Messer",
    },
    {
        name: "Fell",
        label: <ColoredText>Fell</ColoredText>,
        category: "Rohstoff",
        description: "Ein Stück Fell von einem wilden Tier",
        ek: 8,
        vk: 3,
        tool: "Messer",
    },
    {
        name: "Fisch",
        label: <ColoredText>Fisch</ColoredText>,
        category: "Rohstoff",
        description: "Ein frischer Fisch, aus einem nahegelegenen Gewässer",
        ek: 5,
        vk: 2,
        tool: "Angel",
    },
    {
        name: "Fleisch",
        label: <ColoredText>Fleisch</ColoredText>,
        category: "Rohstoff",
        description: "Ein Stück Fleisch, es sollte bald verarbeitet werden",
        ek: 8,
        vk: 3,
        tool: "Messer",
    },
    {
        name: "Knochen",
        label: <ColoredText>Knochen</ColoredText>,
        category: "Rohstoff",
        description: "Ein Knochen, von welchem Tier auch immer",
        ek: 8,
        vk: 3,
        tool: "Axt",
    },
    {
        name: "Schuppe",
        label: <ColoredText>Schuppe</ColoredText>,
        category: "Rohstoff",
        description: "Eine Schuppe, sie glänzt im Licht",
        ek: 10,
        vk: 4,
        tool: "Messer",
    },
    {
        name: "Zahn",
        label: <ColoredText>Zahn</ColoredText>,
        category: "Rohstoff",
        description: "Ein Zahn, scharf und gefährlich",
        ek: 10,
        vk: 4,
        tool: "Messer",
    },
    {
        name: "Feder",
        label: <ColoredText>Feder</ColoredText>,
        category: "Rohstoff",
        description: "Eine Feder, weich und leicht",
        ek: 10,
        vk: 4,
        tool: "Messer",
    },
    {
        name: "Kohle",
        label: <ColoredText>Kohle</ColoredText>,
        category: "Rohstoff",
        description: "Ein Stück Kohle, zum anzünden von Feuer",
        ek: 5,
        vk: 2,
        tool: "Spitzhacke",
    },
    {
        name: "Wasser",
        label: <ColoredText>Wasser</ColoredText>,
        category: "Rohstoff",
        description: "Eine Flasche Wasser, frisch und klar",
        ek: 4,
        vk: 1,
        tool: "Eimer",
    },
    {
        name: "Getreide",
        label: <ColoredText>Getreide</ColoredText>,
        category: "Rohstoff",
        description: "Ein Bund Getreide, frisch geerntet",
        ek: 10,
        vk: 4,
        tool: "Sichel",
    },
    {
        name: "Sand",
        label: <ColoredText>Sand</ColoredText>,
        category: "Rohstoff",
        description: "Ein Haufen Sand, trocken und fein",
        ek: 5,
        vk: 2,
        tool: "Schaufel",
    },
    {
        name: "Erde",
        label: <ColoredText>Erde</ColoredText>,
        category: "Rohstoff",
        description: "Ein Haufen Erde, frisch und nass",
        ek: 4,
        vk: 1,
        tool: "Schaufel",
    },
    {
        name: "Kräuter",
        label: <ColoredText>Kräuter</ColoredText>,
        category: "Rohstoff",
        description: "Ein Bund würzig duftender Kräuter",
        ek: 10,
        vk: 4,
        tool: "Sichel",
    },
    {
        name: "Blüte",
        label: <ColoredText>Blüte</ColoredText>,
        category: "Rohstoff",
        description: "Eine farbenfrohe Blüte, schön und duftend",
        ek: 5,
        vk: 2,
        tool: "Nichts",
    },
    {
        name: "Pilz",
        label: <ColoredText>Pilz</ColoredText>,
        category: "Rohstoff",
        description: "Ein Pilz, warscheinlich essbar",
        ek: 5,
        vk: 2,
        tool: "Messer",
    },
    {
        name: "Gemüse",
        label: <ColoredText>Gemüse</ColoredText>,
        category: "Rohstoff",
        description: "Etwas frisches Gemüse, knackig und bunt",
        ek: 10,
        vk: 4,
        tool: "Nichts",
    },
    {
        name: "Frucht",
        label: <ColoredText>Frucht</ColoredText>,
        category: "Rohstoff",
        description: "Eine Frucht, saftig und süß",
        ek: 5,
        vk: 2,
        tool: "Nichts",
    },
];