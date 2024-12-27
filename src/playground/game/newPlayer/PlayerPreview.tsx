import React from "react";
import { WizardData } from "./CreatePlayer";
import { equipmentDefaults, originDefaults, raceDefaults } from "../../../data/raceDefaults";
import { defaultPlayerData } from "../../../data/gameStore";

interface PlayerPreviewProps {
    wizardData: WizardData;
}

const PlayerPreview: React.FC<PlayerPreviewProps> = ({
    wizardData,
}) => {

    const raceBase = raceDefaults[wizardData.race] || {};
    const originBase = originDefaults[wizardData.origin] || {};
    const equipBase = equipmentDefaults[wizardData.equipment] || {};

    const combinedStats = {
        ...defaultPlayerData.stats,
        ...raceBase.stats,
        ...originBase.stats,
        ...equipBase.stats,
    };

    const combinedEconomy = {
        ...defaultPlayerData.economy,
        ...raceBase.economy,
        ...originBase.economy,
        ...equipBase.economy,
    };

    return (
        <div style={{ padding: 10, border: "1px solid #ccc" }}>
            <h3>Aktueller Steckbrief</h3>
            <p>Rasse: {wizardData.race}</p>
            <p>Herkunft: {wizardData.origin}</p>
            <p>Ausrüstung: {wizardData.equipment}</p>
            <p>Name: {wizardData.name}</p>

            <hr />

            <h4>Vorschau deiner Werte:</h4>
            <p>Leben: {combinedStats.life} / {combinedStats.maxLife}</p>
            <p>Level: {combinedStats.level}</p>
            <p>Gold: {combinedEconomy.gold}</p>
        </div>
    );
};

export default PlayerPreview;