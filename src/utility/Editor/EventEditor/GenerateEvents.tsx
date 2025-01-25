import "../Editor.css";
import Places from "./Components/Places";
import ActionBtn from "./Components/ActionBtn";

import BaseInfo from "./Components/BaseInfos";
import GenerateEventCode from "./GenerateEventCode";

// =========== DIE HAUPT-KOMPONENTE ===========
export default function EventCreationForm() {
  return (
    <div className="form-container text-left max-width">
      <h2>Event-Erstellungsformular</h2>
      <p className='mb-1 text-left'>
        Events kommen im Spiel überall vor, sie können gezielt getriggert werden, oder per Zufall an bestimmten Orten. Sie bestehen immer aus einer Überschrift, einer detailierten Beschreibung und Buttons, die dem Spieler ermöglichen auf das Event zu reagieren. Intern braucht ein Event noch eine ID die immer mit "event" beginnt, gefolgt von drei Ziffern und einem knappen Namen.<br />
        In der Beschreibung hast du Listen mit vordefinirten gefärbten Wörtern und Komponenten welche einen Text ebenfalls mit einer oder mehrere Farben einfärben können.
      </p>
      <BaseInfo />

      <p className='mb-1 text-left'>
        Dann kannst du beliebig viele Buttons erstellen, das was auf ihnen steht schreibst du in Button Label. Das was danach angezeigt wird ist wieder eine detailierte Beschreibung mit buntem Text.
        Bei einem Klick auf einem Event kann etwas passieren, Der Spieler bekommt ein Item, Gold oder einen Buff. Er kann aber auch etwas verlieren: Leben, Gold oder Items. Zum beispiel wenn er etwas kauft erhält er ein Item, verloert aber Gold. Alle Veränderungen müssen hier angegeben werden. Zuletzt kannst du die Bedingung wählen, damit der Button angezeigt wird. Der Spieler kann nur dann etwas kaufen wenn er auch das nötige Geld dafür hat.
      </p>
      <ActionBtn />

      <Places />
      <GenerateEventCode />
    </div>
  );
}
