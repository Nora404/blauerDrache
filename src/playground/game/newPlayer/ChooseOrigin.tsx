//region [imports]
import React from "react";
import { RaceName } from "../../../data/raceData";
import Header from "../../../layout/Header/Header";
import { WizardData } from "./CreatePlayer";
import {
  getOriginByRaces,
  originMap,
  OriginName,
} from "../../../data/originData";
import TwoActionButton from "../../../layout/ActionButtons/TwoActionButton";
import Talk from "../../../utility/Formatted/Talk";
//#endregion

//#region [prepare]
type ChooseOriginProps = {
  wizardData: WizardData;
  setWizardData: React.Dispatch<React.SetStateAction<WizardData>>;
  onBack: () => void;
  onNext: () => void;
};

const ChooseOrigin: React.FC<ChooseOriginProps> = ({
  wizardData,
  setWizardData,
  onBack,
  onNext,
}) => {
  const origins = getOriginByRaces(wizardData.race.name as RaceName);
  //#endregion

  //#region [handler]
  const handleOrigin = (originName: OriginName) => {
    setWizardData((prev) => ({
      ...prev,
      origin: originMap[originName],
    }));
  };
  //#endregion

  //#region [jsx]
  return (
    <div className="max-width">
      <Header>Beantworte die Frage der Wächter Wesen</Header>
      <br />

      {origins.map((origin) => (
        <div className="mb-1 w-full" key={origin.name}>
          <button
            className={`text-left w-full ${
              origin.name === wizardData.origin.name ? "glow" : ""
            }`}
            onClick={() => handleOrigin(origin.name as OriginName)}
          >
            {origin.label}
            <br />
            {origin.description}
            <br />
            <span style={{ color: "#4BC7AA" }}> {origin.bonus} </span>
          </button>
        </div>
      ))}
      <br />

      <div>
        <br />
        Du schaust selbstsicher zu den beiden Wesen und sagst:{" "}
        <Talk>"Ich bin ein {wizardData.origin.label}"</Talk>
        <br />
      </div>
      <br />

      <TwoActionButton
        onLeftAction={onBack}
        leftBtn="zurück"
        onRightAction={onNext}
        rightBtn="weiter"
      />
    </div>
  );
  //#endregion
};

export default ChooseOrigin;
