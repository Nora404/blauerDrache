// ============ EXTERNE DATEN (NUR Imports!) ============
// Pfade anpassen, damit sie aus deinem Projekt kommen:

import "./GenerateEvents.css";
import Places from "../Components/Places";
import ActionBtn from "../Components/ActionBtn";

import BaseInfo from "../Components/BaseInfos";
import GenerateEventCode from "./GenerateEventCode";

// =========== DIE HAUPT-KOMPONENTE ===========
export default function EventCreationForm() {
  return (
    <div className="form-container text-left max-width">
      <h2>Event-Erstellungsformular</h2>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
      ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
      dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies
      nec,
      <br />
      <br />
      <BaseInfo />
      {/* ========== Buttons-Bereich ========== */}
      <ActionBtn />
      {/* ========== Places-Bereich ========== */}
      <Places />
      {/* ========== Code generieren ========== */}
      <GenerateEventCode />
    </div>
  );
}
