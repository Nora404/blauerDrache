// ConditionsSubEditors/OperatorEditor.tsx
import React from "react";
import { ConditionsConfig } from "../../../Context/EventContext";


interface SubEditorProps {
    conditions: ConditionsConfig;
    updateConditions: (partial: Partial<ConditionsConfig>) => void;
}

const OperatorEditor: React.FC<SubEditorProps> = ({ conditions, updateConditions }) => {
    const handleOperatorChange = (op: "<" | "=" | ">") => {
        updateConditions({ operator: op });
    };

    return (
        <div style={{ marginBottom: "0.75rem" }}>
            <p>Die folgenden Werte werden mit den tatsächlichen Werten des Spielers verglichen</p>
            <label>Operator (Vergleich): </label>
            <select
                value={conditions.operator || "="}
                onChange={(e) => handleOperatorChange(e.target.value as "<" | "=" | ">")}
            >
                <option value="<">{"Kleiner als"}</option>
                <option value="=">{"Genau gleich"}</option>
                <option value=">">{"Größer als"}</option>
            </select>
        </div>
    );
};

export default OperatorEditor;
