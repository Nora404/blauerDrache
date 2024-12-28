import React from "react";
import { WizardData } from "./CreatePlayer";
import { racesMap } from "../../../data/raceDefaults";
import Header from "../../../layout/Header/Header";

interface PlayerPreviewProps {
    wizardData: WizardData;
}

const PlayerPreview: React.FC<PlayerPreviewProps> = ({
    wizardData,
}) => {
    const selectedRace = racesMap[wizardData.race];

    const selectedSubrace = selectedRace.subraces.find(
        (subrace) => subrace.name === wizardData.origin
    );


    return (
        <div className="max-width">
            <Header>Aktueller Steckbrief</Header>

            <p className="text-left">
                Name: {wizardData.name}<br />
                Rasse: {selectedRace.label} ({selectedRace.bonus})<br />
                Herkunft: {selectedSubrace?.label} ({selectedSubrace?.bonus})<br />
                Berufung: {wizardData.equipment}<br />
            </p>
        </div>
    );
};

export default PlayerPreview;