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
            <p>Name: {wizardData.name}</p>
            <p>Rasse: {wizardData.race}</p>
            <p>Herkunft: {wizardData.origin}</p>

            <hr />
            <p>Level: {combinedStats.level}</p>
            <p>Leben: {combinedStats.life} / {combinedStats.maxLife}</p>
            <p>Runden: {combinedStats.rounds} / {combinedStats.maxRounds}</p>
            <p>Angriff: {combinedStats.attack} </p>
            <p>Verteidigung: {combinedStats.defense} </p>
            <p>Glück: {combinedStats.luck} </p>

            <hr />

            <h4>Vorschau deiner Werte:</h4>
            <p>Gold: {combinedEconomy.gold}</p>
            <p>Edelstein: {combinedEconomy.edelsteine}</p>
            <p>Rüstung: {wizardData.equipment}</p>
        </div>
    );
};

export default PlayerPreview;