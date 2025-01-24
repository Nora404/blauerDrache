import React from "react";
import { useEditorContext } from "../Context/EventContext";
import MultiColoredLetters from "../../Formatted/MultiColoredLetters";
import { yellowColors } from "../../../data/helper/colorMappingData";
import TriggerGroup from "./TriggerGroup";
import BaseDelta from "./BaseDelta";
import StateDelta from "./StateDelta";
import FluxDelta from "./FluxDelta";
import EconomyDelta from "./EconomyDelta";
import ItemsDelta from "./ItemsDelta";
import DescriptionEditor from "./DescriptionEditor";
import { ButtonConfig } from "../Context/EventContext";

function createSetSingleButton(
  index: number,
  setButtons: React.Dispatch<React.SetStateAction<ButtonConfig[]>>
): React.Dispatch<React.SetStateAction<ButtonConfig>> {
  return (update) => {
    setButtons((prev) =>
      prev.map((b, i) => {
        if (i !== index) return b;
        if (typeof update === "function") {
          // update als Function
          const fn = update as (prevBtn: ButtonConfig) => ButtonConfig;
          return fn(b);
        } else {
          // update als fertiges Objekt
          return update as ButtonConfig;
        }
      })
    );
  };
}

const ActionBtn: React.FC = () => {
  const { buttons, setButtons, addButton, removeButton } = useEditorContext();

  return (
    <div className="max-widht">
      <h2>Buttons</h2>

      <div className="buttons-container">
        {buttons.map((btn, index) => {
          // Hier erzeugen wir den setter für diesen einzelnen Button
          const setSingleButton = createSetSingleButton(index, setButtons);

          return (
            <div key={index} className="single-button space-top">
              <details open={true} className="mb-2">
                <summary>
                  <b>
                    <MultiColoredLetters colors={yellowColors}>
                      Neuer Button:
                    </MultiColoredLetters>
                    &nbsp; &nbsp;{btn.label || "Hat noch keinen Namen!"}
                  </b>
                </summary>

                {/* Button Label */}
                <div className="form-group">
                  <label>Button Label:</label>
                  <input
                    type="text"
                    value={btn.label}
                    onChange={(e) => {
                      const val = e.target.value;
                      // wir rufen setSingleButton auf, statt setButtons
                      setSingleButton((prevBtn) => ({ ...prevBtn, label: val }));
                    }}
                  />
                </div>

                {/* Message */}
                <div className="form-group" style={{ marginTop: "0.5rem" }}>
                  <DescriptionEditor
                    value={btn.message}
                    onChange={(newVal) => {
                      setSingleButton((prevBtn) => ({ ...prevBtn, message: newVal }));
                    }}
                  />
                </div>

                {/* ItemsDelta */}
                <ItemsDelta button={btn} setButton={setSingleButton} />

                {/* EconomyDelta */}
                <EconomyDelta button={btn} setButton={setSingleButton} />

                {/* FluxDelta */}
                <FluxDelta button={btn} setButton={setSingleButton} />

                {/* StateDelta */}
                <StateDelta button={btn} setButton={setSingleButton} />

                {/* BaseDelta */}
                <BaseDelta button={btn} setButton={setSingleButton} />

                {/* TriggerGroup */}
                <TriggerGroup button={btn} setButton={setSingleButton} />

                {/* Ganzen Button entfernen */}
                <button
                  onClick={() => removeButton(index)}
                  className="remove-button w-100"
                >
                  Diesen Button entfernen
                </button>
              </details>
              <hr />
            </div>
          );
        })}

        <button onClick={addButton} className="add-button">
          Neuen Button hinzufügen
        </button>
      </div>
    </div>
  );
};

export default ActionBtn;
