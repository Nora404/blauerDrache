import React, { useState } from "react";
import Header from "../../../../layout/Header/Header";
import finalBattle from "../../../../assets/finalBattle.webp";
import Book1 from "./Book1";
import Book2 from "./Book2";
import Book4 from "./Book4";
import Book3 from "./Book3";
import Book5 from "./Book5";
import Book6 from "./Book6";
import { HiddenLine } from "../../../../layout/HiddenLine";
import Book7 from "./Book7";

type ChronicProps = {
  title?: string;
  onClick?: () => void;
};

const Chronic: React.FC<ChronicProps> = () => {
  const [side, setSide] = useState<number>(1);

  const handleClick = (side: number) => {
    setSide(side);
  }

  return (
    <div className="max-width">
      <h2>Chroniken von Aurendia</h2>

      <div className="toggleRowCol">
        <div className="flex-col w-300">
          <button onClick={() => { handleClick(1) }} className={`btn-border ${side === 1 && "glow"}`}>
            Band I: Das Erwachen</button>
          <button onClick={() => { handleClick(2) }} className={`btn-border ${side === 2 && "glow"}`}>
            Band II: Hüter der Quelle</button>
          <button onClick={() => { handleClick(3) }} className={`btn-border ${side === 3 && "glow"}`}>
            Band III: Der ewige Ruf</button>
          <button onClick={() => { handleClick(4) }} className={`btn-border ${side === 4 && "glow"}`}>
            Die Völker des blauen Drachen</button>
          <button onClick={() => { handleClick(5) }} className={`btn-border ${side === 5 && "glow"}`}>
            Die Hauptstädte der Völker</button>
          <button onClick={() => { handleClick(7) }} className={`btn-border ${side === 7 && "glow"}`}>
            Galerie</button>
          <button onClick={() => { handleClick(6) }} className={`btn-border ${side === 6 && "glow"}`}>
            Glossar</button>
        </div>
        <img src={finalBattle} alt="finalBattle" style={{ width: "50%", marginLeft: "30px" }} />
      </div>

      {side === 1 && <div>
        <br /><Header>Band I: Das Erwachen</Header><br />
        <Book1 />
      </div>}

      {side === 2 && <div>
        <br /><Header>Band II: Hüter der Quelle</Header><br />
        <Book2 />
      </div>}

      {side === 3 && <div>
        <br /><Header>Band III: Der ewige Ruf</Header><br />
        <Book3 />
      </div>}

      {side === 4 && <div>
        <br /><Header>Die Völker des blauen Drachen</Header><br />
        <Book4 />
      </div>}

      {side === 5 && <div>
        <br /><Header>Die Länder des blauen Drachen</Header><br />
        <Book5 />
      </div>}

      {side === 6 && <div>
        <br /><Header>Glossar</Header><br />
        <Book6 />
      </div>}

      {side === 7 && <div>
        <br /><Header>Galerie</Header><br />
        <Book7 />
      </div>}

      <HiddenLine />
    </div>
  );
};

export default Chronic;