import React, { useState } from "react";
import {
    PathsLahtheimCenter,
    PathsLahtheimCityLimit,
    PathsLahtheimResidential,
    PathsLahtheimTrading,
    PathsWorldCaves,
    PathsWorldForest,
    PathsWorldMountain,
    PathsWorldSurroundings,
    PathsWorldWaters,
} from "../../../../routings";

interface PathSelectorProps {
    onChange: (selectedPath: string) => void;
}

const pathLists: Record<string, string[]> = {
    "Lahtheim Zentrum": Object.values(PathsLahtheimCenter),
    "Lahtheim Stadtrand": Object.values(PathsLahtheimCityLimit),
    "Lahtheim Wohnen": Object.values(PathsLahtheimResidential),
    "Lahtheim Handel": Object.values(PathsLahtheimTrading),
    "Welt Höhlen": Object.values(PathsWorldCaves),
    "Welt Wald": Object.values(PathsWorldForest),
    "Welt Berge": Object.values(PathsWorldMountain),
    "Welt Umgebung": Object.values(PathsWorldSurroundings),
    "Welt Wasser": Object.values(PathsWorldWaters),
};

const PathSelector: React.FC<PathSelectorProps> = ({ onChange }) => {
    const [selectedList, setSelectedList] = useState<string>("");
    const [selectedPath, setSelectedPath] = useState<string>("");

    const handleListChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newList = e.target.value;
        setSelectedList(newList);
        setSelectedPath("");
        onChange("");
    };

    const handlePathChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newPath = e.target.value;
        setSelectedPath(newPath);
        onChange(newPath);
    };

    const availablePaths = selectedList ? (pathLists[selectedList] || []) : [];

    return (
        <div>
            <div className="flex-row-left">
                <select value={selectedList} onChange={handleListChange} className="w-200">
                    <option value="">-- Liste wählen --</option>
                    {Object.keys(pathLists).map((listName) => (
                        <option key={listName} value={listName}>
                            {listName}
                        </option>
                    ))}
                </select>
                <select value={selectedPath} onChange={handlePathChange} className="w-200" disabled={!selectedList}>
                    <option value="">-- Pfad wählen --</option>
                    {availablePaths.map((path) => (
                        <option key={path} value={path}>
                            {path}
                        </option>
                    ))}
                </select>
                <div className="mx-1">
                    {selectedList && selectedPath ? `${selectedList} → ${selectedPath}` : "Nichts ausgewählt"}
                </div>
            </div>
        </div>
    );
};

export default PathSelector;