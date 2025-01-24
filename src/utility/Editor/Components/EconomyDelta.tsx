import React from "react";
import { ButtonConfig, useEditorContext } from "../Context/EventContext";

type EconomyDeltaProps = {
  button: ButtonConfig;
  setButton: React.Dispatch<React.SetStateAction<ButtonConfig>>;
};

const EconomyDelta: React.FC<EconomyDeltaProps> = ({ button, setButton }) => {

  return (
    <div className="max-widht">
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={button.economyDeltaEnabled}
            onChange={(e) => {
              const checked = e.target.checked;
              setButton((prev) =>({
                ...prev,
                  economyDeltaEnabled: checked,
                }));
            }}
          />
          economyDelta
        </label>
      </div>
      {button.economyDeltaEnabled && (
        <div className="nested-section flex-warp">
          <div className="form-group m-15">
            <label>Gold:</label>
            <input
              type="number"
              value={button.economyDelta.gold}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10) || 0;
                setButton((prev) => ({
                  ...prev,
                  economyDelta: { ...prev.economyDelta, gold: val },
                }));
              }}
            />
          </div>
          <div className="form-group">
            <label>Edelsteine:</label>
            <input
 type="number"
 value={button.economyDelta.edelsteine}
 onChange={(e) => {
   const val = parseInt(e.target.value, 10) || 0;
   setButton((prev) => ({
     ...prev,
     economyDelta: { ...prev.economyDelta, edelsteine: val },
   }));
 }}
/>
          </div>
        </div>
      )}
    </div>
  );
};

export default EconomyDelta;
