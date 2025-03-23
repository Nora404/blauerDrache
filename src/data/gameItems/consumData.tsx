import { GradientText } from "../../utility/Formatted/GradientText";
import { BuffName } from "../buffData";
import { DebuffName } from "../debuffData";
import { Item } from "./ItemData";

export type ConsumName =
  // Nahrung
  | "Wasserflasche"

  // Kampf
  | "Giftpfeil"
  | "Wurfmesser"
  | "Feuerblume";

export type Consum = Item & {
  buff?: BuffName;
  debuff?: DebuffName;
  life?: number;
  actionPoints?: number;
};

export const emptyConsumObj: Consum = {
  name: "Nichts",
  label: <GradientText>Nichts</GradientText>,
  description: "Was soll das sein?",
  category: "Nahrung",
  ek: 0,
};

export const food: Consum[] = [
  {
    name: "Wasserflasche",
    label: <GradientText>Wasserflasche</GradientText>,
    category: "Nahrung",
    description:
      "Eine Flasche mit frischem Wasser. Stellt etwas Leben wieder her.",
    life: 5,
    ek: 15,
    vk: 5,
  },
];

export const fight: Consum[] = [
  {
    name: "Giftpfeil",
    label: <GradientText>Giftpfeil</GradientText>,
    category: "Kampf",
    description: "Der Gegner wird vergiftet",
    debuff: "Vergiftung",
    ek: 5,
    vk: 1,
  },
  {
    name: "Wurfmesser",
    label: <GradientText>Wurfmesser</GradientText>,
    category: "Kampf",
    description: "Es ist bestimmt schmerhaft den abzubekommen",
    debuff: "Schmerz",
    ek: 15,
    vk: 8,
  },
  {
    name: "Feuerblume",
    label: <GradientText>Feuerblume</GradientText>,
    category: "Kampf",
    description: "Sie ist wunderschön und strahlt eine glühende Hitze aus",
    debuff: "Verbrennung",
    ek: 25,
    vk: 15,
  },
];
