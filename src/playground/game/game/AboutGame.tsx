import React from "react";
import Editor from "../../../utility/Editor/Editor";

type AboutGame = {
  title?: string;
  onClick?: () => void;
};

const AboutGame: React.FC<AboutGame> = () => {
  return (
    <div className="max-widht">
      <h2>Test!</h2>
      <Editor />
    </div>
  );
};

export default AboutGame;
