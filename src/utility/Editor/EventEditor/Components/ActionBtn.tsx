// ActionBtn.tsx
import { useEditorContext } from "../../Context/EventContext";
import MultiColoredLetters from "../../../Formatted/MultiColoredLetters";
import { yellowColors } from "../../../../data/helper/colorMappingData";
import TriggerGroup from "./TriggerGroup";
import BaseDelta from "./BaseDelta";
import StateDelta from "./StateDelta";
import FluxDelta from "./FluxDelta";
import EconomyDelta from "./EconomyDelta";
import ItemsDelta from "./ItemsDelta";
import DescriptionEditor from "./DescriptionEditor";

// <-- NEU:
import ConditionsEditor from "./ConditionsEditor";
import HeaderSmall from "../../../../layout/Header/HeaderSmall";

const ActionBtn: React.FC = () => {
  const { buttons, setButtons, addButton, removeButton } = useEditorContext();

  return (
    <div className="max-widht">
      {/* <div className="buttons-container"> */}
      {buttons.map((btn, index) => (
        <div key={index} style={{ border: "1px dashed gray", padding: "15px", marginBottom: "25px" }}>
          <details open={true}>
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
                  setButtons((prev) =>
                    prev.map((b, i) => (i === index ? { ...b, label: val } : b))
                  );
                }}
              />
            </div>

            {/* Message */}
            <div className="form-group" style={{ marginTop: "0.5rem" }}>
              <DescriptionEditor
                // wir nehmen als "value" die Button-Message
                value={btn.message}
                // bei onChange updaten wir die Buttons
                onChange={(newVal) => {
                  setButtons((prev) =>
                    prev.map((b, i) =>
                      i === index ? { ...b, message: newVal } : b
                    )
                  );
                }}
              />
            </div>

            <div
              className="nested-section"
              style={{
                border: "1px dashed gray",
                padding: "0.75rem",
                marginTop: "0.5rem",
              }}
            >

              <HeaderSmall>Was verändert dieses Event</HeaderSmall>

              <ItemsDelta button={btn} index={index} />
              <EconomyDelta button={btn} index={index} />
              <FluxDelta button={btn} index={index} />
              <StateDelta button={btn} index={index} />
              <BaseDelta button={btn} index={index} />
              <TriggerGroup button={btn} index={index} />
            </div>

            {/* NEU: Hier Conditions aktivieren */}
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={btn.conditionsEnabled || false}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setButtons((prev) =>
                      prev.map((b, i) =>
                        i === index ? { ...b, conditionsEnabled: checked } : b
                      )
                    );
                  }}
                />
                Dieser Button darf nur erscheinen  wenn ...
              </label>
            </div>
            {btn.conditionsEnabled && (
              <ConditionsEditor button={btn} index={index} />
            )}

            {/* Ganzen Button entfernen */}
            <button
              onClick={() => removeButton(index)}
              className="remove-button w-100"
            >
              Diesen Button entfernen
            </button>
          </details>
          {/* <hr /> */}
        </div>
      ))}

      <button onClick={addButton} className="add-button">
        Neuen Button hinzufügen
      </button><br /><br />
      {/* </div> */}
    </div>
  );
};

export default ActionBtn;
