import React from "react";
import { Link } from "react-router-dom";
import Header from "../../../layout/Header/Header";
import MultiColoredLetters from "../../../utility/Formatted/MultiColoredLetters";
import { blueColors } from "../../../data/helper/colorMappingData";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../../store";

type InfoNaviProps = {
  mobilePop?: () => void;
};

const InfoNavi: React.FC<InfoNaviProps> = observer(({ mobilePop }) => {
  const { gameState, gameTime } = useRootStore();

  const handleClick = () => {
    mobilePop?.();
  };

  return (
    <div>
      <Header>Infos</Header>
      <p className="mb-1 text-left">
        <Link onClick={handleClick} to="/player-info" className="mobileBtn">
          <MultiColoredLetters colors={blueColors}>
            Dein Steckbrief
          </MultiColoredLetters>
        </Link>
        <br />
        <Link onClick={handleClick} to="/player-inventar" className="mobileBtn">
          <MultiColoredLetters colors={blueColors}>
            Dein Inventar
          </MultiColoredLetters>
        </Link>
        <br />
        <Link onClick={handleClick} to="/collecting" className="mobileBtn">
          <MultiColoredLetters colors={blueColors}>
            Deine Beute
          </MultiColoredLetters>
        </Link>
        <br />
        <Link onClick={handleClick} to="/questlog" className="mobileBtn">
          <MultiColoredLetters colors={blueColors}>
            Deine Aufgaben
          </MultiColoredLetters>
        </Link>
        <br />
      </p>

      <p className="text-left">
        Zeit: <b>{gameTime.data.gameTime}</b>
        <br />
        Es ist: <b>{gameTime.data.gameDay}</b>
        <br />
        Wetter: <b>{gameState.data.weather}</b>
        <br />
        Temperatur: <b>{gameState.data.temperature}</b>
        <br />
      </p>
    </div>
  );
});

export default InfoNavi;
