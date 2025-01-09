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
    Transit = '/transit/:targetPath/:startPath/:steps',
}
```
```typescript
<Link to="/transit/path/start/6" state={{ from: location.pathname }}>Dem Weg folgen</Link>
```
```typescript
    const { targetPath, startPath, steps } = useParams<{
        targetPath: string;
        startPath: string;
        steps: string;
    }>();
```

Jetzt wollte ich aber das die Namen der Orte aus `colorfullStrings` der Konstanten 'PLACES' genommen werden.
Da in targetPath und startPath, wie der Name schon sagt, nur der "path" steckt, brauchte ich ein Mapping um meine bunten deutschen Wörter zu bekommen. Dafür nutze ich die Enums in den path-Dateien, ich muss nur den / weg bekommen.
In useParam werden die interessanterweise nicht mitgeliefert. Mit `getPlaceLabelFromRoute` und `getPlaceNameFromRoute`
bekommt man nun sowohl bunten, als auch normalen Text zurück

> Wichtig! Denk daran beim erstellen einer neuen Route es auch mit ins Mapping aufzunehmen

### Zufällige Events und Eventketten
Beim "Transit" werden auch die `steps` angegeben. Das sind die Schritte bis zum nächsten Ort. Während dessen sollen zufällige Events erscheinen, oder auch nicht. Es gibt verschiedene Möglichkeiten mit ihnen zu interagieren und es passiert auch unterschiedliches. Es sollte sogar Ketten geben, folge Events die ebenfalls zufällig sind. Alle mit einer bestimmten Warscheinlichkeit. 
Ich hatte eine konkrete Idee, aber bei der Umsetztung musste mir wieder ChatGpt helfen. 

```typescript
export type GameEvent = {
    name: string;                       // Der Name des Events, wichtig bei Folge-Events!
    description: string;                // Eine Beschreibung was passiert
    buttons: {                          // Hiermit kann der Spieler interagieren
        label: string;                  // Es kann beliebig viele Buttons haben
        getAction: () => GameAction;    // Nur eine Auflisten was sich ändert, nicht wie es sich ändert
    }[];                                // Das wird in einer seperaten Datei/Funktion gemacht
    places: {                           // Hier werden die Orte und die Warscheinlichkeit aufgelistet
        place: PlacesKeys;              // Der Ort ist immer `startPath`
        probability:                    // Liegt zwischen 1 (unmöglich) und 100 (immer)
    }[];
}
```

**Zufällige Events**   
Bei einem Schritt nach vorne oder zurück wird immer auch `triggerPossibleEvent()` aufgerufen.
Hier wird der Name des Ortes gebraucht, also nicht das Label und damit wird `getEventByPlace(placeName)` aufgerufen.
Hier wird erst geprüft ob ein Event triggert oder nichts passiert. Bei einem Wert von 0.4 liegt die Warscheinlichkeit das etwas passiert bei 40%. Danach wird geschaut welche Events den Ortsnamen überhaupt haben. Und nun fallen die Würfel, 1-100 Die Liste wird mit dem Ergebnis gefiltert, alle Events deren "probability" unter dem gewürfelten Wert liegt fliegen raus. Aus dem Rest wird dann zufällig ein Event gezogen und Tada: Etwas passiert!

**Eventketten**  
Und dann wurde ich größenwahnsinnig und wollte zufällige verkettete Ereignisse haben. Bei einer langen Kette sollte sich so eine Geschichte bilden, die auf der Seite zu lesen ist. Darum hat `GameAction` eine Eigenschaft die nextEvents heißt und ein Array von Objekten hat mit `name` und `probability` Der Name muss ein schon vorhandener Eventname sein. Ich werde da vermutlich mal Enums erstellen müssen. Und es wird sinnvoll sein Events nicht in eine Datei zu stecken sondern jedes Event/Eventkette in eine eigene Datei zu schreiben. 

**Verarbeitung**  
Die Verarbeitung der ausgewählten Endscheidungen findet dann in `ApplyGameAction` statt. Es nutzt alle updates aus dem `gameStore` und arbeitet die Infos von `GameAction` ab. 

> Diese Funktion wurde noch nicht ausreichend getestet! 

### Tools und Plugins
Ich nutze das Plugin Colored Regions von mihelcic um Bereiche des Codes mit einem schwachen farbigen Hintergund zu belegen. Das hat den Vorteil, dass auch in der rechten mini Übersicht die Bereiche deutlich erkennbar sind. Zur Strukturierung und Navigation im Code finde ich das sehr hilfreich. Ich habe für bestimmte Bereiche noch Snippets erstellt.

Ein weiteres Plugin welches ich nutze ist Folder color von SergeyEgorov um Ordner im Editor einzufärben. Auch hier wieder der gleiche Grund, ich kann damit Bereiche besser erkennen und somit schneller Navigieren. 

Wie viele auch nutzte ich mittlerweile ChatGPT, der mir beim Coden hilft. Ich verbringe so weniger Zeit mit Googeln und finden von Lösungen. Er Kompensiert meine fehlende Erfahrung oder nimmt mir zeitaufwendige Fleißaufgaben ab. Ich könnte ihn auch nuten um meine hunderten Rechtschreibfehler zu koregieren, das würde aber den Flow unterbrechen und es ist dann doch sehr aufwendig.

### Neue Seite(Ort) erstellen
- Ordne den Ort in die geografische Kategorie ein, erstelle dort einen Ordner mit dem Namen des Ortes
- Mit dem Snippet `rpage` wird das Grundgerüst erstellt, gebe den gleichen Namen ein wie den Dateinamen
- Lege in der passenden Routing Datei (gleiche geografische Kategorie) den Ort an.
- Unterseiten sollen per ActionButton erreichbar sein (Wegen besserer Handybedienung)
- Die Actionbuttons haben einen passenden Handler der zur Unterseite (useNavigate) führt.
- Name des Ortes + Thema der Unterseite als Namen. Ein D oder N um Tageszeit anzugeben, wenn nötig.
- Nach dem Muster wie Hauptseite dem Routing hinzufügen `/place-theme`

### Event einer Unterseite hinzufügen
- Erstelle ein Array mit EventIds und Warscheinlichkeiten
- Erstelle useState mit dem aktuellen Event `eventChainActive`
- Erstelle ein useEffect das pickRandomEvent benutzt und den State auf das Event setzt
- Füge im jsx die Komponente `<GameEventChain>` hinzu

```typescript
const CourtyardTreasure: React.FC<CourtyardTreasureProps> = () => {
    const [eventChainActive, setEventChainActive] = useState<string | null>(null);

    const possibleEvents = [
        { eventId: "001StoneCoin", probability: 50 },
        { eventId: "004Flower", probability: 60 },
        { eventId: "007Bag", probability: 20 },
    ];

    const handleBack = () => {
        navigate('/courtyard');
    };

    const handleFinishEventChain = () => {
        setEventChainActive(null);
    }

    useEffect(() => {
        const eventId = pickRandomEvent(possibleEvents, 0.8);
        setEventChainActive(eventId);
    }, []);

    return (
        <div className='max-width'>
            {eventChainActive ? (
                <GameEventChain
                    initialEventName={eventChainActive}
                    onFinishChain={handleFinishEventChain}
                />
            ) : (
                <p className="mb-1 text-left">
                    Links von dir ist Umgebung, rechts von dir ist Umgebung – alles sieht völlig
                    normal und unauffällig aus. Es ist schon fast langweilig, wie ereignislos die
                    letzten Schritte waren. Du kannst deinen Weg unbeirrt weiter fortsetzen.
                </p>
            )}
        </div>
    );
};
```

### Fazit
Ich merke das es wirklich sinnvoll ist als Team solche Projekte anzugehen. Jemand für die Texte, jemand zum Coden und auch jemand der super mit Architektur ist, dann noch einen Tester ... 

Aber etwas das ich machen konnte, was im Arbeitsleben nie vorkommt, ist das Überdenhaufen werfen von vermeintlich funktionierenden Code um etwas besseres zu schreiben. Ich habe Tage damit verbracht den Context neu zu schreiben und einzubinden. Erstmal alle alten tief verwurzelten Fäden ziehen - dann funktioniert nichts mehr und hoffen den neuen Context richtig einzuweben. 