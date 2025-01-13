import React from "react";
import EventCreationForm from "../../../utility/GenerateEvents/GenerateEvents";

type AboutGame = {
  title?: string;
  onClick?: () => void;
};

const AboutGame: React.FC<AboutGame> = () => {
  return (
    <div className="max-widht">
      <h2>Test!</h2>
      <EventCreationForm />
    </div>
  );
};

export default AboutGame;
