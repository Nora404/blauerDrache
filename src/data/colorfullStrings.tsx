import { GradientText } from "../utility/GradientText";

type SystemKeys =
  | 'Level'
  | 'Erfahrung'
  | 'Ruf'
  | 'Respekt'
  | 'Leben'
  | 'Runden'
  | 'Angriff'
  | 'Verteidigung'
  | 'Glück'
  | 'Gold'
  | 'Edelsteine'
  | 'Waffe'
  | 'Rüstung'
  | 'HandDer'
  | 'HandDie'
  | 'Inventar';
export const SYSTEM: Record<SystemKeys, JSX.Element> = {
  Level: <GradientText colors={['#F7A131', '#57C6DD']}>Level</GradientText>,
  Erfahrung: <GradientText colors={['#bbbbbb', '#57C6DD']}>Erfahrung</GradientText>,
  Ruf: <i><GradientText colors={['#E54387', '#FF92BF', '#E54387']}>Ruf</GradientText></i>,
  Respekt: <i><GradientText colors={['#45DBA0', '#57C6DD', '#45DBA0']}>Respekt</GradientText></i>,
  Leben: <GradientText colors={['#74dd4f', '#57C6DD']}>Leben</GradientText>,
  Runden: <GradientText colors={['#C742DD', '#57C6DD']}>Runden</GradientText>,
  Angriff: <GradientText colors={['#DD2C2C', '#57C6DD']}>Angriff</GradientText>,
  Verteidigung: <GradientText colors={['#6D36F2', '#C7F288', '#57C6DD']}>Verteidigung</GradientText>,
  Glück: <GradientText colors={['#F2D828', '#57C6DD']}>Glück</GradientText>,
  Gold: <i><GradientText colors={['#FFC705', '#dddddd', '#FFC705']}>Gold</GradientText></i>,
  Edelsteine: <i><GradientText colors={['#CB4BCF', '#dddddd', '#CB4BCF']}>Edelstein</GradientText></i>,
  Waffe: <i><GradientText colors={['#BA4545', '#B97A57', '#BA4545']}>Waffe</GradientText></i>,
  Rüstung: <i><GradientText colors={['#6f55E7', '#B97A57', '#6f55E7']}>Rüstung</GradientText></i>,
  HandDer: <i><GradientText colors={['#69B26E', '#B3C709', '#69B26E']}>In der Hand</GradientText></i>,
  HandDie: <i><GradientText colors={['#69B26E', '#B3C709', '#69B26E']}>In die Hand</GradientText></i>,
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

type NpcKeys =
  | 'Bäuerin'
  | 'Krieger'
  | 'Jägerin'
  | 'Barde'
  | 'Alchemistin'
  | 'Verkäuferin'
  | 'Verkäufer'
  | 'dunkleGestalt'
  | 'finstereGestalt'
  | 'Krämer'
  | 'Bauer'
  | 'Tagelöhner'
  | 'Söldner'
  | 'Söldnerin'
  | 'Entdeckerin'
  | 'Händler'
  | 'Händlerin'
  | 'Kräuterhexe'
  | 'Bettler'
  | 'Schmied'
  | 'Schmiedin'
  | 'Sängerin'
  | 'Tänzerin'
  | 'Schneiderin'
  | 'Schneider'
  | 'Geistlicher'
  | 'Wächterin'
  | 'Wächter'
  | 'Magier'
  | 'Hexer'
  | 'Seherin'
  | 'Runenmeister'
  | 'Gladiator'
  | 'Kapitän'
  | 'Waldläufer'
  | 'Assassine'
  | 'Heilerin'
  | 'Druide';

export const NPC: Record<NpcKeys, JSX.Element> = {
  Bäuerin: <GradientText colors={['#eeffbb', '#bbffee']}>Bäuerin</GradientText>,
  Krieger: <GradientText colors={['#ffcccc', '#cc9999']}>Krieger</GradientText>,
  Jägerin: <GradientText colors={['#bbffaa', '#88cc88']}>Jägerin</GradientText>,
  Barde: <GradientText colors={['#ffeeaa', '#ffcc77']}>Barde</GradientText>,
  Alchemistin: <GradientText colors={['#ccccff', '#9999ff']}>Alchemistin</GradientText>,
  Verkäuferin: <GradientText colors={['#C237FF', '#d257dF']}>Verkäuferin</GradientText>,
  Verkäufer: <GradientText colors={['#D1813B', '#a1615B']}>Verkäufer</GradientText>,
  dunkleGestalt: <GradientText colors={['#ffbbcc', '#ff99aa']}>dunkle Gestalt</GradientText>,
  finstereGestalt: <GradientText colors={['#bbbbff', '#8888cc']}>finstere Gestalt</GradientText>,
  Krämer: <GradientText colors={['#ffdd99', '#ffaa66']}>Krämer</GradientText>,
  Bauer: <GradientText colors={['#77dd77', '#55bb55']}>Bauer</GradientText>,
  Tagelöhner: <GradientText colors={['#ffee99', '#ffaa77']}>Tagelöhner</GradientText>,
  Söldner: <GradientText colors={['#aa5555', '#ff7777']}>Söldner</GradientText>,
  Söldnerin: <GradientText colors={['#ff8888', '#ffaaaa']}>Söldnerin</GradientText>,
  Entdeckerin: <GradientText colors={['#bbddff', '#88bbff']}>Entdeckerin</GradientText>,
  Händler: <GradientText colors={['#ffaa99', '#dd8877']}>Händler</GradientText>,
  Händlerin: <GradientText colors={['#ffaa88', '#cc7755']}>Händlerin</GradientText>,
  Kräuterhexe: <GradientText colors={['#88bb88', '#55aa55']}>Kräuterhexe</GradientText>,
  Bettler: <GradientText colors={['#999999', '#777777']}>Bettler</GradientText>,
  Schmied: <GradientText colors={['#ffaa77', '#cc7755']}>Schmied</GradientText>,
  Schmiedin: <GradientText colors={['#ff8866', '#cc6655']}>Schmiedin</GradientText>,
  Sängerin: <GradientText colors={['#ffccff', '#dd99dd']}>Sängerin</GradientText>,
  Tänzerin: <GradientText colors={['#ffaaee', '#dd88cc']}>Tänzerin</GradientText>,
  Schneiderin: <GradientText colors={['#bbbbcc', '#9999aa']}>Schneiderin</GradientText>,
  Schneider: <GradientText colors={['#ccaa88', '#997755']}>Schneider</GradientText>,
  Geistlicher: <GradientText colors={['#ffffff', '#dddddd']}>Geistlicher</GradientText>,
  Wächterin: <GradientText colors={['#7788ff', '#5566dd']}>Wächterin</GradientText>,
  Wächter: <GradientText colors={['#5566cc', '#3344aa']}>Wächter</GradientText>,
  Magier: <GradientText colors={['#aabbff', '#8899ff']}>Magier</GradientText>,
  Hexer: <GradientText colors={['#aa88dd', '#8866cc']}>Hexer</GradientText>,
  Seherin: <GradientText colors={['#ddeeff', '#aaccee']}>Seherin</GradientText>,
  Runenmeister: <GradientText colors={['#ddaa88', '#bb8866']}>Runenmeister</GradientText>,
  Gladiator: <GradientText colors={['#ffaa55', '#cc7733']}>Gladiator</GradientText>,
  Kapitän: <GradientText colors={['#77aaff', '#5588dd']}>Kapitän</GradientText>,
  Waldläufer: <GradientText colors={['#55aa77', '#338855']}>Waldläufer</GradientText>,
  Assassine: <GradientText colors={['#777777', '#555555']}>Assassine</GradientText>,
  Heilerin: <GradientText colors={['#ffddcc', '#ffbbaa']}>Heilerin</GradientText>,
  Druide: <GradientText colors={['#88bb88', '#66aa66']}>Druide</GradientText>,
};

export type PlacesKeys =
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
  | "vergessen"
export const PLACES: Record<PlacesKeys, JSX.Element> = {
  Nordtor: <b><GradientText colors={['#bbbbbb']}>Nordtor</GradientText></b>,
  Westmauer: <b><GradientText colors={['#bbbbbb']}>Westmauer</GradientText></b>,
  Ostmauer: <b><GradientText colors={['#bbbbbb']}>Ostmauer</GradientText></b>,
  Südmauer: <b><GradientText colors={['#bbbbbb']}>Südmauer</GradientText></b>,
  Brunnen: <b><GradientText colors={['#7ff0d8']}>Brunnen</GradientText></b>,
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
  vergessen: <b><GradientText colors={['#bbbbbb']}>Titel vergessen!</GradientText></b>,
};

