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
Ich habe mit useContext gearbeitet und dem localStore. Warscheinlich wäre eine Datenbank besser gewesen, nur habe ich damit keine Erfahrung und der Wettbewerb dauert nur einen Monat. Es gibt einen Kontext indem mehrere Objekte in einem `store` gespeichert werden. Zudem gibt es hauptsächlich Setter und Updater.  

Die wichtigsten Hilfsfunktionen sind `getCombinedStats` und `getPlayerObj` Die aktuellen Werte des Spielers werden aus verschiedenen Quellen zusammen gerechnet: Basiswerte, Temporere Werte und ein Scalingfactor mit dem Level, damit Buffs und Debuffs nie an Bedeutung verlieren. Das JSX benutzt nur diese Werte. Da im store keine JSX Objekte gespeichert werden können, die meisten Playerobjekte aber ein JSX Label besitzten, werden diese nur mit ihrem Namen als string gespeichert. Die Funktion `getPlayerObj` sammelt all die Objekte ein, filtert auch nach aktiven De/Buffs und gibt ein Objekt mit allen PlayerObjekten zurück. Die Verwendung ist dann sehr einfach und angenehm.  

Weitere unveränderliche Daten werden in Dateien gespeichert die entweder `*Data.tsx` oder `*String.tsx` heißen. In Strings liegen Texte als einfache Komponenten. Fast alle Strings haben bunte Wörter, die durch weitere Komponenten erstellt werden. Die Komponenten geben immer einen komplett formatieren JSX Absatz zurück.

In Data werden Objekte und Types gespeichert, zum Beispiel zu Berufen oder Gegenständen. Eine solche Datei ist wie folgt aufgebaut:

- Type mit allen Namen der Einträge als String 
- Objekt Type mit der Struktur eines Eintrags 
- Leeres Default Objekt (wird nur als Fallback verwendet)
- Array mit allen ausgefüllten Objekten
- Funktion die ein gesuchtes Objekt aus dem Array zurück gibt

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

```typescript
const navigate = useNavigate();

const handleCreatePlayer = () => {
    navigate("/new-player");
}
```
Der aktuelle Pfad wird im Context gespeichert damit der Spieler an dem ort fortsetzten kann, andem er aufgehört hat.
Eine Besonderheit ist im Navi das "Umschauen" dieser Link hat einen handler der in der Mobile Variante die Navigation schließt.

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
Die Verarbeitung der ausgewählten Endscheidungen findet dann in `ApplyGameAction` statt. Es nutzt alle updates aus dem `gameStore` und arbeitet die Infos von `GameAction` ab. Dazu gehört auch das starten und beenden der Quests. 
Die Quests werden mit ihrer ID und einem Progress-Objekt gespeichert. Bei Änderungen starten die Update-Funktionen auch eine Funktion `updateProgress` die schaut ob die Veränderung für eine Quest relevant ist und passt das Progress-Objekt endsprechend an. 

> Diese Funktion ist überhaupt nicht fertig, da fehlen einige Questtypen!!! 

**Gewichtete Events**
Events können auch auf eine bestimmte Seite/Unterseite gezielt oder zufällig ausgelöst werden. Dafür haben sie eine Gewichtung und Bedingungen die erfüllt sein müssen. Da Quests durch Events gestartet und beendet werden, ist es etwas ... umfangreicher geworden, als ich zu beginn angenommen hatte. Da eine Quest theoretisch überall starten, laufen oder beendet werden kann muss jeder Ort und jede Unterseite in der Lage sein Events darzustellen. Um diese Events zu starten müssen erst die `possibleEvents` erstellt werden. Jeder Eintrag ist ein `WeightedEvent`

```typescript
export type WeightedEvent = {
    eventId: string;            // EventId
    probability: number;        // Warscheinlichkeit das es triggert
    questId?: string;           // QuestId fals es eine Quest starten soll
    conditions?: {              // Bedingungen für das Starten des Events
        gameTime?: Partial<GameTime>;
        gameState?: Partial<GameState>;
        playerStats?: Partial<PlayerStats>; // Es fehlt noch ein < = >
        playerBase?: Partial<PlayerBase>;   // Es fehlt noch ein < = >
        playerFlux?: Partial<PlayerFlux>;
        playerMeta?: Partial<PlayerMeta>;
    };
};
```
```typescript
const possibleEvents: WeightedEvent[] = [
    { eventId: "E001ThreeStoneTrigger", probability: 90, questId: "Q001ThreeStone" },
    { eventId: "004Flower", probability: 10 },
];
```

### Aufbau einer Seite(Ort)
Im ersten Teil müssen die Variabeln festgelegt werden. Sie sind immer gleich, bis auf `possibleEvents` die beschreiben welche Events auf dieser Seite unter welchen Bedingungen starten können. 
```typescript
    const { store, setGameState } = useNewGameStore();
    const navigate = useNavigate();
    const [localRandomEvent, setLocalRandomEvent] = useState<string | null>(null);

    const queue = store.gameState.currentEventQueue;
    const firstEvent = queue.length > 0 ? queue[0] : null;

    const possibleEvents: WeightedEvent[] = [
        { eventId: "E001ThreeStoneTrigger", probability: 90, questId: "Q001ThreeStone" },
        { eventId: "004Flower", probability: 10 },
    ];
```

Im nächsten Teil werden die Handler erstellt, bei einer Unterseite gibt es einen der zur Hauptseite zurück führt. Dann folgen zwei Finisher, je einen für Events und einen für Quests, da siese unterschiedlich bearbeitet werden müssen. Das einzige was auf den Seiten unterschiedlich ist, ist der Path, sonst bleibt alles gleich.
```typescript
    const handleBack = () => {
        navigate('/fountain');
    };
    const handleFinishLocalEvent = () => {
        setLocalRandomEvent(null);
        navigate('/fountain');
    }
    const handleFinishQuestEvent = () => {
        const newQueue = store.gameState.currentEventQueue.slice(1);
        setGameState({ currentEventQueue: newQueue })

        navigate('/fountain');
    }
```

Danach sorgt ein useEffekt dafür, dass ein Event welches die Bedinung erfüllt getriggert wird, oder auch nicht. `pickRandomEvent` hat als Parameter eine Zahl, 1 bedeutet es wird auf jedenfall ein Event getriggert und 0 wäre gar kein Event.
Eine Quest hat immer vorrang zu einem normalen Event. Dafür sorgen auch zwei Variabeln die bestimmen was das JSX bekommt.
```typescript
    const initialEventName = firstEvent || localRandomEvent || '';
    const onFinishChainHandler = firstEvent ? handleFinishQuestEvent : handleFinishLocalEvent;

    return (
        <div className='max-width'>
            // code
            {(firstEvent || localRandomEvent) && (
                <GameEventChain
                    initialEventName={initialEventName}
                    onFinishChain={onFinishChainHandler}
                />
            )}
            {!firstEvent && !localRandomEvent &&
                <ActionButton onClick={handleBack} label='Sich abwenden' />
            }
        </div>
    );
```

### Neue Seite(Ort) erstellen
- Ordne den Ort in die geografische Kategorie ein, erstelle dort einen Ordner mit dem Namen des Ortes
- Mit dem Snippet `rpage` wird das Grundgerüst erstellt, gebe den gleichen Namen ein wie den Dateinamen
- Lege in der passenden Routing Datei (gleiche geografische Kategorie) den Ort an.
- Unterseiten sollen per ActionButton erreichbar sein (Wegen besserer Handybedienung)
- Die Actionbuttons haben einen passenden Handler der zur Unterseite (useNavigate) führt.
- Name des Ortes + Thema der Unterseite als Namen. Ein D oder N um Tageszeit anzugeben, wenn nötig.
- Nach dem Muster wie Hauptseite dem Routing hinzufügen `/place-theme`

### Editor
Ich habe mit ChatGPT einen Editor erstellt um in einem UI ganz leicht neue Events zu erstellen. Ich bin wirklich beeindruckt was dabei rum gekommen ist. Vermutlich war das erstellen dieses Editors lustiger als ihn nun zu benutzten, aber dabei hat sich folgendes ergeben:  
Events speichern keine JSX.Elements mehr sondern normale Strings. Diese werden dann mit einer Hilfsfunktion geparsed um wieder JSX daraus zu machen. Um Farbigen Text anzeigen zu können wurde eine ... Art eigene Syntax erstellt. Darum hier die Anleitung was man zur Anwendung wissen muss  

```typeScript
const jsx = parseDescription(deinStringAusDemTextarea);
return <div>{jsx}</div>;
```
Der Text im Textarea und somit der gespeicherte String kann Variabeln aus den Listen anzeigen `{STSTEM.Gold}` und die beiden Farb-Text Komponenten. Auch ein Enter im Text wird gespeichert und wiedergegeben.

```typeScript
{GradientText|rainbowColors}Das ist Regenbogen-Text{/GradientText}
{MultiColoredLetters|blueColors}Das ist blau{/MultiColoredLetters}
```
In `colorMappingData` sind die Farbpaletten, dennoch muss man in dem Parser die Variabeln Listen, fals welche dazu kommen, mitpflegen. Auch in der Komponente für die Textarea gibt es Listen, für die Darstellung, gepflegt werden müssen. 

### Tools und Plugins
Ich nutze das Plugin Colored Regions von mihelcic um Bereiche des Codes mit einem schwachen farbigen Hintergund zu belegen. Das hat den Vorteil, dass auch in der rechten mini Übersicht die Bereiche deutlich erkennbar sind. Zur Strukturierung und Navigation im Code finde ich das sehr hilfreich. Ich habe für bestimmte Bereiche noch Snippets erstellt.

Ein weiteres Plugin welches ich nutze ist Folder color von SergeyEgorov um Ordner im Editor einzufärben. Auch hier wieder der gleiche Grund, ich kann damit Bereiche besser erkennen und somit schneller Navigieren. 

Wie viele auch nutzte ich mittlerweile ChatGPT, der mir beim Coden hilft. Ich verbringe so weniger Zeit mit Googeln und finden von Lösungen. Er Kompensiert meine fehlende Erfahrung oder nimmt mir zeitaufwendige Fleißaufgaben ab. Ich könnte ihn auch nuten um meine hunderten Rechtschreibfehler zu koregieren, das würde aber den Flow unterbrechen und es ist dann doch sehr aufwendig.

### Fazit
Ich merke das es wirklich sinnvoll ist als Team solche Projekte anzugehen. Jemand für die Texte, jemand zum Coden und auch jemand der super mit Architektur ist, dann noch einen Tester ... 

Aber etwas das ich machen konnte, was im Arbeitsleben nie vorkommt, ist das Überdenhaufen werfen von vermeintlich funktionierenden Code um etwas besseres zu schreiben. Ich habe Tage damit verbracht den Context neu zu schreiben und einzubinden. Erstmal alle alten tief verwurzelten Fäden ziehen - dann funktioniert nichts mehr und hoffen den neuen Context richtig einzuweben. 
Und ja, es funktioniert und ist so viel besser! Mittlerweile sind auch Events und Quests hinzugekommen. Dabei hat sich die Grundlegende Struktur einer Seite(Ort) gewaltig verändert. Zum Glück habe ich noch nicht sooo viele Seiten erstellt. Es ist wirklich wichtig im Kleinen alles zum Laufen zu bringen, bevor man Tagelang Fleißarbeit anstellt und diese dann nicht brauchen kann oder schlimmer: Alles nocheinmal anfassen muss, um die Hälfte anzupassen.
