import React from "react";
import { ButtonConfig, useEditorContext } from "../../Context/EventContext";

type BaseDeltaProps = {
  button: ButtonConfig;
  index: number;
};

const BaseDelta: React.FC<BaseDeltaProps> = ({ button, index }) => {
  const { setButtons } = useEditorContext();

  return (
    <div className="max-widht">
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={button.baseDeltaEnabled}
            onChange={(e) => {
              const checked = e.target.checked;
              setButtons((prev) =>
                prev.map((b, i) =>
                  i === index ? { ...b, baseDeltaEnabled: checked } : b
                )
              );
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
                value={button.baseDelta[k] || 0} // Fallback-Wert, falls undefined
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10) || 0;
                  setButtons((prev) =>
                    prev.map((b, i) => {
                      if (i !== index) return b;
                      return {
                        ...b,
                        baseDelta: { ...b.baseDelta, [k]: val },
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

export default BaseDelta;
