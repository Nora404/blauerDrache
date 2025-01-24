import React from "react";
import { ButtonConfig } from "../Context/EventContext";

type StateDeltaProps = {
  button: ButtonConfig;
  setButton: React.Dispatch<React.SetStateAction<ButtonConfig>>;
};

const StateDelta: React.FC<StateDeltaProps> = ({ button, setButton }) => {
  return (
    <div className="max-widht">
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={button.stateDeltaEnabled}
            onChange={(e) => {
              const checked = e.target.checked;
              setButton((prev) => ({
                ...prev,
                stateDeltaEnabled: checked,
              }));
            }}
          />
          stateDelta
        </label>
      </div>

      {button.stateDeltaEnabled && (
        <div className="nested-section flex-warp">
          {(
            Object.keys(button.stateDelta) as Array<keyof typeof button.stateDelta>
          ).map((k) => (
            <div key={k} className="form-group m-15">
              <label>{k}:</label>
              <input
                type="number"
                value={button.stateDelta[k] || 0}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10) || 0;
                  setButton((prev) => ({
                    ...prev,
                    stateDelta: {
                      ...prev.stateDelta,
                      [k]: val,
                    },
                  }));
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StateDelta;