# React + TypeScript + Vite

Okay okay! Ich schreibe ja schon ein Readme ...

### Einleitung
Dieses Browserspiel heißt "Legende des blauen Drachen", ich wollte schon lange ein Browserspiel machen und nun zu einem Wettbewerb, indem es darum geht ein Spiel zu klonen habe ich endlich damit angefangen. Mein großes Vorbild ist "Legende des grünen Drachen". Allerdings ist dieses Spiel schon sooo groß das ich nur eine vereinfachte Variante schreibe.

Auch nach dem Wettbewerb will ich weiter daran arbeiten. Damit es mir möglich ist versuche ich ein paar Beschreibungen hier festzuhalten.

### Struktur
Außer den normalen Ordnern für assets, data und utilities habe ich einen Ordner erstellt der playground heißt. In ihm sind die Seiten welche die Welt beschreiben. Diese sind unterteilt in:
- `game` für alles was nicht mit einem bestimmten Ort zu tun hat
- `lahtheim` Alle Orte in der Hauptstadt, dieser ist nochmal in einzelne Bezierke unterteilt
- `world` Alles außerhalb der Stadt, dieser ist nochmal in Biomen unterteilt

Ein Einzelner Ort besteht aus mindestens zwei Seiten, einmal die Hauptseite und eine Komponente für die Navigation. Es können weitere Seiten hinzu kommen wenn mit NPCs oder Gegenständen interagiert wird. Es soll keine Popups geben. Auf der Navigationsseite gibt es einen Link zum Unschauen, damit wird die Hauptseite nochmal geladen. Ein Link führt zurück zur vorherigen Seite.

### Speichern
Ich habe mit useContext gearbeitet und dem localStore. Der eine Context heißt `gameStore` in ihme werden Daten gespeichert die dauerhaft erhalten bleiben sollen, sowas wie Namen, Level oder Gold. Diese werden ins localStorage geschrieben. In `gameState` werden alle temporeren Daten geschrieben, sowas wie Spielzeit oder Wetter. In beiden Dateien steht ein Beispiel wie sie verwendet werden.

Weitere Daten werden in Dateien gespeichert die entweder `*Data.tsx` oder `*String.tsx` heißen. In Strings liegen Texte als einfache Komponenten. Fast alle Strings haben bunte Wörter, die durch weitere Komponenten erstellt werden. Die Komponenten geben immer einen komplett formatieren JSX Absatz zurück.

In Data werden Objekte und Types gespeichert, zum Beispiel zu Berufen oder Gegenständen. Eine solche Datei ist wie folgt aufgebaut:

- Type mit allen Namen der Einträge als String 
- Objekt Type mit der Struktur eines Eintrags 
- Leeres Default Objekt (wird nur als Fallback verwendet)
- Array mit allen ausgefüllten Objekten
- Funktion die ein gesuchtes Objekt aus dem Array zurück gibt
- Objekt das zu jedem Eintrag die zu veränderten Werte enthält

Obwohl Daten im gameStore gespeichert werden, nimmt das Spiel die Daten meist aus dem gameState. 
Das hat sich ergeben als ich den CreatePlayer geschrieben habe. Die Daten sollten nicht sofort im localStorage gespeichert werden, erst wenn alle Infos gesammelt wurden. 
```typescript
  const selectedRace = racesMap[gameStore.meta.rase] || emptyRaceObj;
  const selectedCalling = callingMap[gameStore.meta.calling] || emptyCallingObj;
  const selectedFeeling = feelingMap[gameStore.meta.feeling] || emptyFeelingObj;
```

Daraus entwickelte sich `ephemeralStats` wo temporere Werte mit fixen Werten kombiniert werden. Das Ergebnis daraus sind die Stats welche das Spiel benutzt. Temporere Werte kommen aus Stimmungen, Waffen, Rüstungen oder anderen Einflüssen. 

### Routing
Da es viele Seiten werden habe ich mich für lazy Routing entschieden. Mithilfe von ChatGPT konnte ich ein System erstellen das die Routen automatisch hinzufügt, wenn ich sie der Liste hinzufüge. Weil ich es nicht selbst erdacht habe muss ich es hier genau festhalten wie es geht:

In Apps.tsx wird sowohl die Navigation als auch die Hauptseiten eingebunden. Beide haben je eine Eigene Datei welche eine Liste erstellt. Sie heißen `NavigationList` und `RoutesList`. Die beiden existieren und müssen nicht mehr angepasst werden (hoffentlich!)

Spannend ist nun die Datei `routes.tsx` Diese wird vermutlich extrem lang werden weil hier alle Routen definiert werden. Beginnend mit einem Enum welches alle Pfade beschreibt. Gefolgt von einem Inferface, denn es soll ja alles typensicher sein. Danach werden alle Seiten und Navigationen als lazy Import eingebunden. Hier behalte ich durch Leerzeichen die Gruppierung die auch bei den Ordnern benutzt wurden. Und zum Schluss die `routes` ein Haufen an Objekten die den Pfad, die Navigation und die Hauptseiten zusammen bringen.

> EDIT: Ja sie wurde extrem lang, darum habe ich es in mehrere Dateien aufgeteilt und in routes.tsx wieder zusammen gefügt. Ich verbringe mehr Zeit mir refactorisieren und optimieren als mit dem eigentlichen Code um Funktionen hinzuzufügen! 

Wenn neue Seiten und Navigationen hinzu kommen, müssen sie hier eingetragen werden:
- enum `Paths` (Unter welchem Pfad)
- const lazy (Welche Komponente)
- `routes` (Objekt das alles vereint)

```typescript
// stepp 1
export enum Paths {
  NewDay = '/new-day',
}

// stepp 2
const NewDay = lazy(() => import('./playground/game/infos/NewDay'));
const NewDayNavi = lazy(() => import('./playground/game/infos/NewDayNavi'));

// stepp 3
export const routes: RouteConfig[] = [
  {
    path: Paths.NewDay,
    element: NewDay,
    navigation: NewDayNavi,
  },
];
```

Schließlich muss es eingebunden werden. Das geht entweder direkt in einer Navigations-Komponente als ein Link zum anklicken:

```typescript
<Link to="/new-player">Erstelle neuen <ColoredLetter>Charakter</ColoredLetter></Link><br />
```

Ein Buchstabe wird immer gefärbt, bei mir hat es keine Auswirkung. Im Orginal kann man das Spiel nur mit Tastatur spielen. Eine andere Variante ist als ein Button mit einem handler. Hier muss die Seite innerhalb einer Funktion geladen werden.

```typescript
const navigate = useNavigate();

const handleCreatePlayer = () => {
    navigate("/new-player");
}
```

### Parameter in Routen
Ich wollte zwischen zwei Seiten eine "Transit" Komponente einbauen, die weiß woher man kommt und wohin man will. Das hätte ich mit zusätzlichen globalen Variabeln machen können, aber ich wollte wissen ob es auch mit Parametern in der URL geht. Ja es geht:

[Dokumentation von React Router](https://api.reactrouter.com/v7/functions/react_router.useParams.html)

In dem Enum welches den Path beschreibt müssen nur die Parameternamen genannt werden und im eigentlichen Link wird an dieser Stelle der Wert angegeben. Das läst sich dann einfach extrahieren und benutzten.

```typescript
export enum PathsGame {
    Transit = '/transit/:target/:from/:to/:steps',
}
```
```typescript
<Link to="/transit/path/Nordtor/Weg/6" state={{ from: location.pathname }}>Dem Weg folgen</Link>
```
```typescript
  const { target } = useParams<{ target: string }>();
  const { from } = useParams<{ from: string }>();
  const { to } = useParams<{ to: string }>();
  const { steps } = useParams<{ steps: string }>();
```