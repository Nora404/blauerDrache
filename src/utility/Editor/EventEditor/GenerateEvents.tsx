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

      <p className='mb-1 text-left'>
        Damit ein Event im Spiel benutzt werden kann mus im Ordner "data" unter "gameEvents" eine neue Datei erstellt werden. Jedes Event hat eine eigene Datei, der Name ist der gleiche wie die ID des Events. In data gibt es auch eine Datei die "questList" heißt. Dort wird das neue Event registriert, heißt es wird in die Liste aufgenommen. Bei normalen Events kann die ID einfach in die Liste randomEvent hinzugefügt werden. Gehört das Event zu einer Quest wird es stattdessen in der Datei "questList" aufgenommen. Das soll dazu dienen die Listen übersichtlicher zu halten. Jetzt kann es überall genutzt werden :-)
      </p>

      <GenerateEventCode />
    </div>
  );
}
