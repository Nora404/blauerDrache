//#region [imports]
import React, { } from "react";
import { WizardData } from "./CreatePlayer";
import BackAndNextbtn from "../../../layout/NavBtn/BackAndNextBtn";
import Header from "../../../layout/Header/Header";
import PlayerTalk from "../../../utility/PlayerTalk";
//#endregion

//#region [prepare]
type ChooseNameProps = {
    wizardData: WizardData;
    setWizardData: React.Dispatch<React.SetStateAction<WizardData>>;
    onBack: () => void;
    onFinalize: () => void;
}

const ChooseName: React.FC<ChooseNameProps> = ({
    wizardData,
    setWizardData,
    onBack,
    onFinalize,
}) => {
    //#endregion

    //#region [handler]
    const handleNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setWizardData(prev => ({
            ...prev,
            name: evt.target.value,
        }));
    };
    //#endregion

    //#region [jsx]
    return (
        <div>
            <Header>Beantworte die Frage der Wächter Wesen</Header>
            <br />

            <input
                type="text"
                value={wizardData.name}
                onChange={handleNameChange}
                placeholder="Name"
                style={{ width: 250, textAlign: "center" }}
            />
            <br />

            <div><br />
                Du schaust selbstsicher zu den beiden Wesen und sagst: <PlayerTalk>"Ich heiße {wizardData.name}"</PlayerTalk><br />
            </div><br />

            <BackAndNextbtn onBack={onBack} onNext={onFinalize} nextBtn="fertig" />
        </div>
    );
    //#endregion
};

export default ChooseName;
