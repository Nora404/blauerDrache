import React from "react";
import { WizardData } from "./CreatePlayer";
import Header from "../../../layout/Header/Header";

interface PlayerPreviewProps {
    wizardData: WizardData;
}

const PlayerPreview: React.FC<PlayerPreviewProps> = ({
    wizardData,
}) => {

    return (
        <div className="max-width">
            <Header>Aktueller Steckbrief</Header>

            <p className="text-left">
                Name: {wizardData.name}<br />
                Rasse: {wizardData.race.label}, {wizardData.race.bonus}<br />
                Herkunft: {wizardData.origin.label}, {wizardData.origin.bonus}<br />
                Berufung: {wizardData.calling.label}, {wizardData.calling.bonus}<br />
            </p>
        </div>
    );
};

export default PlayerPreview;