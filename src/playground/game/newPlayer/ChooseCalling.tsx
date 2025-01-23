//#region [imports]
import React from "react";
import { WizardData } from "./CreatePlayer";
import Header from "../../../layout/Header/Header";
import { callingMap, CallingName, callings } from "../../../data/callingData";
import TwoActionButton from "../../../layout/ActionButtons/TwoActionButton";
import Talk from "../../../utility/Formatted/Talk";
//endregion

//#region [prepare]
type ChooseCallingProps = {
  wizardData: WizardData;
  setWizardData: React.Dispatch<React.SetStateAction<WizardData>>;
  onBack: () => void;
  onNext: () => void;
};

const ChooseCalling: React.FC<ChooseCallingProps> = ({
  wizardData,
  setWizardData,
  onBack,
  onNext,
}) => {
  //#endregion

  //#region [handler]
  const handleCalling = (callingName: CallingName) => {
    setWizardData((prev) => ({
      ...prev,
      calling: callingMap[callingName],
    }));
  };
  //#endregion

  //#region [jsx]
  return (
    <div className="max-width">
      <Header>Beantworte die Frage der Wächter Wesen</Header>
      <br />

      {callings.map((callings) => (
        <div className="mb-1 w-full" key={callings.name}>
          <button
            className={`text-left w-full ${
              callings.name === wizardData.calling.name ? "glow" : ""
            }`}
            onClick={() => handleCalling(callings.name as CallingName)}
          >
            {callings.label}
            <br />
            {callings.description}
            <br />
            <span style={{ color: "#4BC7AA" }}> {callings.bonus} </span>
          </button>
        </div>
      ))}
      <br />

      <div>
        <br />
        Du schaust selbstsicher zu den beiden Wesen und sagst:{" "}
        <Talk>"Ich bin gekommen um {wizardData.calling.label} zu werden"</Talk>
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

export default ChooseCalling;
