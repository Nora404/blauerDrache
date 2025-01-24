import React from "react";
import { ButtonConfig } from "../Context/EventContext";

type BaseDeltaProps = {
  button: ButtonConfig;
  setButton: React.Dispatch<React.SetStateAction<ButtonConfig>>;
};

const BaseDelta: React.FC<BaseDeltaProps> = ({ button, setButton }) => {

  return (
    <div className="max-widht">
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={button.baseDeltaEnabled}
            onChange={(e) => {
              const checked = e.target.checked;
              setButton((prev) => ({
                ...prev,
                baseDeltaEnabled: checked,
              }));
            }}
          />
          baseDelta
        </label>
      </div>
      {button.baseDeltaEnabled && (
        <div className="nested-section flex-warp">
          {(
            Object.keys(button.baseDelta) as Array<
              keyof typeof button.baseDelta
            >
          ).map((k) => (
            <div key={k} className="form-group m-15">
              <label>{k}:</label>
              <input
                type="number"
                value={button.baseDelta[k] || 0} // Fallback
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10) || 0;
                  setButton((prev) => ({
                    ...prev,
                    baseDelta: {
                      ...prev.baseDelta,
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

export default BaseDelta;
