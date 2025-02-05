import "../Editor.css";
import Places from "./Components/Places";
import ActionBtn from "./Components/ActionBtn";

import BaseInfo from "./Components/BaseInfos";
import GenerateEventCode from "./GenerateEventCode";
import EventLoader from "./EventLoader";

// =========== DIE HAUPT-KOMPONENTE ===========
export default function EventCreationForm() {
  return (
    <div className="text-left max-width">
      <EventLoader />

      <h2>Event-Erstellungsformular</h2>
      <p className='mb-1 text-left'>
        Events kommen im Spiel überall vor, sie können gezielt getriggert werden, oder per Zufall an bestimmten Orten. Sie bestehen aus einer Überschrift, einer detailierten Beschreibung und Buttons, die dem Spieler ermöglichen auf das Event zu reagieren. Intern braucht ein Event noch eine ID die immer mit "event" beginnt (wird automatisch hinzugefügt), gefolgt von drei Ziffern und einem knappen Namen. In der Beschreibung hast du Listen mit vordefinirten gefärbten Wörtern und Komponenten welche einen Text mit einer oder mehreren Farben einfärben können.
      </p>
      <BaseInfo />

      <p className='mb-1 text-left'>
        Hier kannst du beliebig viele Buttons erstellen, das was auf ihnen steht schreibst du in Button Label. Neben dem Label kannst du ein Result schreiben, damit ist gemeint was es dem Spieler kosten wird diesen Button zu benutzten, zum Beispiel kostet es Gold oder Leben. Dafür werden die vordefinirten System Wörter verwendet. Klickt der Spieler auf den Button kann eine weitere Beschreibung angezeigt werden.<br />
        Bei einem Klick auf einem Event kann etwas passieren, Der Spieler bekommt ein Item, Gold oder einen Buff. Er kann aber auch etwas verlieren: Leben, Gold oder Items. Zum Beispiel wenn er etwas kauft erhält er ein Item, verliert aber Gold. Alle Veränderungen müssen hier angegeben werden. Zuletzt kannst du die Bedingung wählen, damit der Button angezeigt wird. Der Spieler kann nur dann etwas kaufen wenn er auch das nötige Geld dafür hat.
      </p>
      <ActionBtn />

      <Places />

      <h3>Event speichern</h3>
      <p className='mb-1 text-left'>
        Leider kann der Event Editor nicht das erstelle Event speichern. Dafür musst du den Code kopieren und eine neue Datei erstellen. Gehe dafür in den Ordner "data" und dann in den Unterordner "gameEvents". Es gibt dort weitere Ordner die nach den verschiedenen Orten benannt sind. Suche den Ordner andem du dein Event benutzten möchtest. Dort erstellst du eine neue Datei mit der ID des Events und der Endung tsx. In diese Datei fügst du den kopierten Code ein. Es kann sein das die Importe oben rot unterkringelt werden. Passe die Pfade an, ich lösche die oft und sagt der IDE das sie die Importe neu hinzufügen soll.
      </p>

      <h3>Event registrieren</h3>
      <p className='mb-1 text-left'>
        Jedes Event hat eine eigene Datei, der Name ist der gleiche wie die ID des Events. In "data" gibt es auch eine Datei die "questList" heißt. Dort werden verschiedene Listen von Events gesammelt zu einer sehr großen Liste. Das neue Event muss in der Liste in seinem Order wo es sich befindet redistriert, also hineingeschrieben werden. Die verschiedenen Listen helfen es übersichtlicher zu halten. Hast du zum beispiel ein Event erstellt das zufällig an einen Ort erscheinen soll, speichere es unter "randoms" und trage es in "randomEventList" ein. Es muss dort auch importiert werden. Jetzt kann es überall genutzt werden :-)
      </p>

      <h3>Event einbauen</h3>
      <p className='mb-1 text-left'>
        Es gibt drei Möglichkeiten ein Event ins Spiel zu bringen. Hier im Editor kann man ein Event einem Ort zuweisen, dann wird es, sobald das Event registriert ist, automatisch im Spiel auftauchen. Auch wenn du es als Folgeevent einträgst, wird es automatisch im Spiel auftauchen. Die zweite Möglichkeit ist es das Event auf einer Orts Seite in die Liste "possibleEvents" einzutragen. Dann wird es per Zufall und nach einer Gewichtung an diesem Ort auftauchen. Die dritte Möglichkeit ist es das Event an einen Button zu binden. Dann wird es nur aufgerufen wenn der Spieler auf den Button klickt. Fast jeder Ort hat Unterseiten welche die Komponente "PlaceTemplate" benutzt. Hier kannst du das Event einbauen. Die Komponente "PlaceTemplate" hat die Props "possibleEvents" und "buttons". In "possibleEvents" trägst du das Event ein, in "buttons" kannst du einen Button erstellen der das Event auslöst.
      </p>

      <GenerateEventCode />
    </div>
  );
}
