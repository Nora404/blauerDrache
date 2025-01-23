import React from "react";
import { CREATURE } from "../../../../data/helper/colorfullStrings";
import Header from "../../../../layout/Header/Header";
import { useNavigate } from "react-router-dom";
import ActionButton from "../../../../layout/ActionButtons/ActionButton";
import Talk from "../../../../utility/Formatted/Talk";

type GuardianProps = {};

const Guardian: React.FC<GuardianProps> = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/north-gate");
  };

  return (
    <div className="max-width">
      <h2>Wächter</h2>
      <p className="mb-1 text-left">
        Vor dir ragen die gewaltigen steinernden Mauen von Lahtheim auf, nur
        unterbrochen von einem schweren Tor. Neben diesem Tor schweben zwei
        kleine pummelige Wesen, ein {CREATURE.blauesWesen} und ein{" "}
        {CREATURE.rotesWesen}.
      </p>

      <p className="mb-1 text-left">
        <Talk color="rotesWesen"> "Was willst du?" </Talk>
        fragt {CREATURE.rotesWesen} und schaut dich grimmig an.
      </p>

      <p className="mb-1 text-left">
        <Talk color="blauesWesen"> "Können wir dir helfen?" </Talk>
        fragt {CREATURE.blauesWesen} und zaubert aus dem Nichts ein Notizblock.
        Es schaut dich aufmerksam an.
      </p>
      <br />

      <Header>Wichtige Orte in Lahtheim</Header>

      <p className="mb-1 text-left">
        <b>Nordtor</b>: Von hier aus kannst du die Stadt verlassen und in die
        große weite Welt
        <br />
        <b>Rathaus</b>: Beantrage Farben oder kaufe ein Haus
        <br />
        <b>Handelsbezirk</b>: Kaufe und verkaufe Sachen und Dinge und Zeugs und
        Kram und ...
        <br />
        <b>Friedhof</b>: Tote liegen hier begraben oder erwachen zu neuem Leben
        <br />
      </p>
      <br />

      <ActionButton onClick={handleBack} label="Zurück gehen" />
    </div>
  );
};

export default Guardian;
