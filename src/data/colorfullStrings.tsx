import { GradientText } from "../utility/GradientText";

type SystemKeys =
  | 'weiter'
  | 'zurück'
  | 'fertig'
  | 'abbrechen'
  | 'schließen'
  | 'verkaufen'
  | 'kaufen'
  | 'disableKaufen'

  | 'Level'
  | 'Erfahrung'
  | 'Leben'
  | 'Runden'
  | 'Angriff'
  | 'Verteidigung'
  | 'Glück'
  | 'Gold'
  | 'Edelsteine'
  | 'Waffe'
  | 'Rüstung'
  | 'Inventar';
export const SYSTEM: Record<SystemKeys, JSX.Element> = {
  weiter: <b className="systemBtn"><GradientText colors={['#4F9FFF', '#A2FDF9', '#4F9FFF']}>&#126;&#42;&#126; weiter &#126;&#42;&#126;</GradientText></b>,
  zurück: <b className="systemBtn"><GradientText colors={['#C2FF69', '#A2FDF9', '#C2FF69']}>&#126;&#42;&#126; zurück &#126;&#42;&#126;</GradientText></b>,
  fertig: <b className="systemBtn"><GradientText colors={['#328A2B', '#A2FDF9', '#328A2B']}>&#126;&#42;&#126; fertig &#126;&#42;&#126;</GradientText></b>,
  abbrechen: <b className="systemBtn"><GradientText colors={['#C86CFA', '#C2FF69', '#C86CFA']}>&#126;&#42;&#126; abbrechen &#126;&#42;&#126;</GradientText></b>,
  schließen: <b className="systemBtn"><GradientText colors={['#C86CFA', '#C2FF69', '#C86CFA']}>&#126;&#42;&#126; schließen &#126;&#42;&#126;</GradientText></b>,
  verkaufen: <b className="systemBtn"><GradientText colors={['#C9BE46', '#C2FF69', '#C9BE46']}>&#126;&#42;&#126; verkaufen &#126;&#42;&#126;</GradientText></b>,
  kaufen: <b className="systemBtn"><GradientText colors={['#59B334', '#C2FF69', '#59B334']}>&#126;&#42;&#126; kaufen &#126;&#42;&#126;</GradientText></b>,
  disableKaufen: <b className="systemBtn"><GradientText colors={['#666666', '#999999', '#666666']}>&#126;&#42;&#126; Das kannst du nicht kaufen &#126;&#42;&#126;</GradientText></b>,

  Level: <GradientText colors={['#F7A131', '#57C6DD']}>Level</GradientText>,
  Erfahrung: <GradientText colors={['#bbbbbb', '#57C6DD']}>Erfahrung</GradientText>,
  Leben: <GradientText colors={['#74dd4f', '#57C6DD']}>Leben</GradientText>,
  Runden: <GradientText colors={['#C742DD', '#57C6DD']}>Runden</GradientText>,
  Angriff: <GradientText colors={['#DD2C2C', '#57C6DD']}>Angriff</GradientText>,
  Verteidigung: <GradientText colors={['#6D36F2', '#C7F288', '#57C6DD']}>Verteidigung</GradientText>,
  Glück: <GradientText colors={['#F2D828', '#57C6DD']}>Glück</GradientText>,
  Gold: <i><GradientText colors={['#FFC705', '#dddddd', '#FFC705']}>Gold</GradientText></i>,
  Edelsteine: <i><GradientText colors={['#CB4BCF', '#dddddd', '#CB4BCF']}>Edelstein</GradientText></i>,
  Waffe: <i><GradientText colors={['#BA4545', '#B97A57', '#BA4545']}>Waffe</GradientText></i>,
  Rüstung: <i><GradientText colors={['#6f55E7', '#B97A57', '#6f55E7']}>Rüstung</GradientText></i>,
  Inventar: <i><GradientText colors={['#69B26E', '#B3C709', '#69B26E']}>Inventar</GradientText></i>,
}

type CreatureKeys =
  | 'geflügeltesWesen'
  | 'geflügelteWesen'
  | 'rotesWesen'
  | 'roteWesen'
  | 'blauesWesen'
  | 'blaueWesen'
  | 'grünerDrache'
  | 'blauerDrache'
  | 'blauenDrachen'
export const CREATURE: Record<CreatureKeys, JSX.Element> = {
  geflügeltesWesen: <GradientText colors={['#cf388f', '#8839cf']}>geflügeltes Wesen</GradientText>,
  geflügelteWesen: <GradientText colors={['#cf388f', '#8839cf']}>geflügelte Wesen</GradientText>,
  rotesWesen: <GradientText colors={['#FFE1C2', '#ff6644']}>rotes Wesen</GradientText>,
  roteWesen: <GradientText colors={['#FFE1C2', '#ff6644']}>rote Wesen</GradientText>,
  blauesWesen: <GradientText colors={['#A3D8FF', '#ffffff']}>blaues Wesen</GradientText>,
  blaueWesen: <GradientText colors={['#A3D8FF', '#ffffff']}>blaue Wesen</GradientText>,

  grünerDrache: <b><GradientText colors={['#46CF25', '#29CF72']}>grüner Drache</GradientText></b>,
  blauerDrache: <b><GradientText colors={['#1ECECF', '#1763CF']}>blauer Drache</GradientText></b>,
  blauenDrachen: <b><GradientText colors={['#1ECECF', '#1763CF']}>blauen Drachen</GradientText></b>,
};




