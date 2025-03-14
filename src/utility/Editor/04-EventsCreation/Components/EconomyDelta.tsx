import React from "react";
import { ButtonConfig, useEditorContext } from "../../Context/EventContext";

type EconomyDeltaProps = {
  button: ButtonConfig;
  index: number;
};

const EconomyDelta: React.FC<EconomyDeltaProps> = ({ button, index }) => {
  const { setButtons } = useEditorContext();

  return (
    <div className="max-widht">
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={button.economyDeltaEnabled}
            onChange={(e) => {
              const checked = e.target.checked;
              setButtons((prev) =>
                prev.map((b, i) =>
                  i === index ? { ...b, economyDeltaEnabled: checked } : b
                )
              );
            }}
          />
          Währungen hinzufügen oder abnehmen
        </label>
      </div>
      {button.economyDeltaEnabled && (
        <div className="nested-section flex-warp gradient">
          <div className="form-group m-15">
            <label>Gold:</label>
            <input
              type="number"
              value={button.economyDelta.gold}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10) || 0;
                setButtons((prev) =>
                  prev.map((b, i) =>
                    i === index
                      ? {
                        ...b,
                        economyDelta: {
                          ...b.economyDelta,
                          gold: val,
                        },
                      }
                      : b
                  )
                );
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
                setButtons((prev) =>
                  prev.map((b, i) =>
                    i === index
                      ? {
                        ...b,
                        economyDelta: {
                          ...b.economyDelta,
                          edelsteine: val,
                        },
                      }
                      : b
                  )
                );
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EconomyDelta;
