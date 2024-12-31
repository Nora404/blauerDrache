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

type PlacesKeys =
  | "Nordtor"
  | "Westmauer"
  | "Ostmauer"
  | "Südmauer"
  | "Brunnen"
  | "Vorplatz"
  | "Kirche"
  | "Friedhof"
  | "Rathaus"
  | "Taverne"
  | "Handelsbezirk"
  | "Krämer"
  | "Waffenladen"
  | "Ausrüstungsladen"
  | "Wohnbezirk"
  | "Gassen"
  | "Haus"
  | "Weg"
  | "Fluss"
  | "Quelle"
  | "See"
  | "Sumpf"
  | "Waldrand"
  | "Wald"
  | "Waldlichtung"
  | "Dunkelwald"
  | "Toilletenhaus"
  | "Wiese"
  | "Feld"
  | "Steppe"
  | "Ödland"
  | "Hügelland"
  | "Bergfuß"
  | "Bergpfad"
  | "Bergspitze"
  | "Höhleneingang"
  | "Höhle"
  | "Schatzkammer"
export const PLACES: Record<PlacesKeys, JSX.Element> = {
  Nordtor: <b><GradientText colors={['#bbbbbb']}>Nordtor</GradientText></b>,
  Westmauer: <b><GradientText colors={['#bbbbbb']}>Westmauer</GradientText></b>,
  Ostmauer: <b><GradientText colors={['#bbbbbb']}>Ostmauer</GradientText></b>,
  Südmauer: <b><GradientText colors={['#bbbbbb']}>Südmauer</GradientText></b>,
  Brunnen: <b><GradientText colors={['#7ec0d8']}>Brunnen</GradientText></b>,
  Vorplatz: <b><GradientText colors={['#b0bfbb']}>Vorplatz</GradientText></b>,
  Kirche: <b><GradientText colors={['#b8b8e6']}>Kirche</GradientText></b>,
  Friedhof: <b><GradientText colors={['#708bac']}>Friedhof</GradientText></b>,
  Rathaus: <b><GradientText colors={['#b3a1da']}>Rathaus</GradientText></b>,
  Taverne: <b><GradientText colors={['#c0afb0']}>Taverne</GradientText></b>,
  Handelsbezirk: <b><GradientText colors={['#b1b58d']}>Handelsbezirk</GradientText></b>,
  Krämer: <b><GradientText colors={['#938e91']}>Krämer</GradientText></b>,
  Waffenladen: <b><GradientText colors={['#ba9db1']}>Waffenladen</GradientText></b>,
  Ausrüstungsladen: <b><GradientText colors={['#5fa9b4']}>Ausrüstungsladen</GradientText></b>,
  Wohnbezirk: <b><GradientText colors={['#9986da']}>Wohnbezirk</GradientText></b>,
  Gassen: <b><GradientText colors={['#708bac']}>Gassen</GradientText></b>,
  Haus: <b><GradientText colors={['#bad2c4']}>Haus</GradientText></b>,
  Weg: <b><GradientText colors={['#DEB887']}>Weg</GradientText></b>,
  Fluss: <b><GradientText colors={['#00BFFF']}>Fluss</GradientText></b>,
  Quelle: <b><GradientText colors={['#ADD8E6']}>Quelle</GradientText></b>,
  See: <b><GradientText colors={['#5F9EA0']}>See</GradientText></b>,
  Sumpf: <b><GradientText colors={['#556B2F']}>Sumpf</GradientText></b>,
  Waldrand: <b><GradientText colors={['#96c795']}>Waldrand</GradientText></b>,
  Wald: <b><GradientText colors={['#228B22']}>Wald</GradientText></b>,
  Waldlichtung: <b><GradientText colors={['#90EE90']}>Waldlichtung</GradientText></b>,
  Dunkelwald: <b><GradientText colors={['#006400']}>Dunkelwald</GradientText></b>,
  Toilletenhaus: <b><GradientText colors={['#806865']}>Toilletenhaus</GradientText></b>,
  Wiese: <b><GradientText colors={['#83a168']}>Wiese</GradientText></b>,
  Feld: <b><GradientText colors={['#F4A460']}>Feld</GradientText></b>,
  Steppe: <b><GradientText colors={['#9B9B72']}>Steppe</GradientText></b>,
  Ödland: <b><GradientText colors={['#A0522D']}>Ödland</GradientText></b>,
  Hügelland: <b><GradientText colors={['#8B4513']}>Hügelland</GradientText></b>,
  Bergfuß: <b><GradientText colors={['#4682B4']}>Bergfuß</GradientText></b>,
  Bergpfad: <b><GradientText colors={['#708090']}>Bergpfad</GradientText></b>,
  Bergspitze: <b><GradientText colors={['#778899']}>Bergspitze</GradientText></b>,
  Höhleneingang: <b><GradientText colors={['#2F4F4F']}>Höhleneingang</GradientText></b>,
  Höhle: <b><GradientText colors={['#696969']}>Höhle</GradientText></b>,
  Schatzkammer: <b><GradientText colors={['#e1de9d']}>Schatzkammer</GradientText></b>,
};

