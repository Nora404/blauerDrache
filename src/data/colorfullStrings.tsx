import { GradientText } from "../utility/GradientText";

interface ColorMapping {
  index: number;
  color: string;
}

export const greenColors: ColorMapping[] = [
  { index: 0, color: '#A1FA4F' },
  { index: 1, color: '#54D650' },
  { index: 2, color: '#B7D66A' },
  { index: 3, color: '#60E8BC' },
  { index: 4, color: '#54D650' },
  { index: 5, color: '#A1FA4F' },
  { index: 6, color: '#54D650' },
  { index: 7, color: '#B7D66A' },
  { index: 8, color: '#60E8BC' },
  { index: 9, color: '#54D650' },
];


type SystemKeys =
  | 'weiter'
  | 'zurück'
  | 'Level'
  | 'Erfahrung'
  | 'Leben'
  | 'Runden'
  | 'Angriff'
  | 'Verteidigung'
  | 'Glück';
export const SYSTEM: Record<SystemKeys, JSX.Element> = {
  weiter: <b className="systemBtn"><GradientText colors={['#4F9FFF', '#A2FDF9', '#4F9FFF']}>&#126;&#42;&#126; weiter &#126;&#42;&#126;</GradientText></b>,
  zurück: <b className="systemBtn"><GradientText colors={['#C2FF69', '#A2FDF9', '#C2FF69']}>&#126;&#42;&#126; zurück &#126;&#42;&#126;</GradientText></b>,
  Level: <GradientText colors={['#F7A131', '#57C6DD']}>Level: </GradientText>,
  Erfahrung: <GradientText colors={['#bbbbbb', '#57C6DD']}>Erfahrung: </GradientText>,
  Leben: <GradientText colors={['#74dd4f', '#57C6DD']}>Leben: </GradientText>,
  Runden: <GradientText colors={['#C742DD', '#57C6DD']}>Runden: </GradientText>,
  Angriff: <GradientText colors={['#DD2C2C', '#57C6DD']}>Angriff: </GradientText>,
  Verteidigung: <GradientText colors={['#6D36F2', '#C7F288', '#57C6DD']}>Verteidigung: </GradientText>,
  Glück: <GradientText colors={['#F2D828', '#57C6DD']}>Glück: </GradientText>,
}

type CreatureKeys =
  | 'geflügeltesWesen'
  | 'geflügelteWesen'
  | 'rotesWesen'
  | 'roteWesen'
  | 'blauesWesen'
  | 'blaueWesen'
  | 'grünerDrache'
  | 'blauerDrache';
export const CREATURE: Record<CreatureKeys, JSX.Element> = {
  geflügeltesWesen: <GradientText colors={['#cf388f', '#8839cf']}>geflügeltes Wesen</GradientText>,
  geflügelteWesen: <GradientText colors={['#cf388f', '#8839cf']}>geflügelte Wesen</GradientText>,
  rotesWesen: <GradientText colors={['#FFE1C2', '#ff6644']}>rotes Wesen</GradientText>,
  roteWesen: <GradientText colors={['#FFE1C2', '#ff6644']}>rote Wesen</GradientText>,
  blauesWesen: <GradientText colors={['#A3D8FF', '#ffffff']}>blaues Wesen</GradientText>,
  blaueWesen: <GradientText colors={['#A3D8FF', '#ffffff']}>blaue Wesen</GradientText>,

  grünerDrache: <b><GradientText colors={['#46CF25', '#29CF72']}>grüner Drache</GradientText></b>,
  blauerDrache: <b><GradientText colors={['#1ECECF', '#1763CF']}>blauer Drache</GradientText></b>,
};




