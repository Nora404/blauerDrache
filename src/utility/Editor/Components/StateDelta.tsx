import React from "react";
import { ButtonConfig, useEditorContext } from "../Context/EventContext";

type StateDeltaProps = {
  button: ButtonConfig;
  index: number;
};

const StateDelta: React.FC<StateDeltaProps> = ({ button, index }) => {
  const { setButtons } = useEditorContext();

  return (
    <div className="max-widht">
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={button.stateDeltaEnabled}
            onChange={(e) => {
              const checked = e.target.checked;
              setButtons((prev) =>
                prev.map((b, i) =>
                  i === index ? { ...b, stateDeltaEnabled: checked } : b
                )
              );
            }}
          />
          stateDelta
        </label>
      </div>
      {button.stateDeltaEnabled && (
        <div className="nested-section flex-warp">
          {(
            Object.keys(button.stateDelta) as Array<
              keyof typeof button.stateDelta
            >
          ).map((k) => (
            <div key={k} className="form-group m-15">
              <label>{k}:</label>
              <input
                type="number"
                value={button.stateDelta[k] || 0} // Fallback-Wert, falls undefined
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10) || 0;
                  setButtons((prev) =>
                    prev.map((b, i) => {
                      if (i !== index) return b;
                      return {
                        ...b,
                        stateDelta: { ...b.stateDelta, [k]: val },
                      };
                    })
                  );
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
