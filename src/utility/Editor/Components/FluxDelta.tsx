import React from "react";
import { ButtonConfig, useEditorContext } from "../Context/Context";
import { BuffName } from "../../../data/buffData";
import { DebuffName } from "../../../data/debuffData";
import { getAllBuffNames, getAllDebuffNames } from "../Context/Helper";

type FluxDeltaProps = {
  button: ButtonConfig;
  index: number;
};

const FluxDelta: React.FC<FluxDeltaProps> = ({ button, index }) => {
  const { setButtons } = useEditorContext();

  return (
    <div className="max-widht">
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={button.fluxDeltaEnabled}
            onChange={(e) => {
              const checked = e.target.checked;
              setButtons((prev) =>
                prev.map((b, i) =>
                  i === index ? { ...b, fluxDeltaEnabled: checked } : b
                )
              );
            }}
          />
          fluxDelta
        </label>
      </div>
      {button.fluxDeltaEnabled && (
        <div className="nested-section flex-row">
          <div className="form-group w-100">
            <label>Feeling:</label>
            <input
              type="text"
              value={button.fluxDelta.feeling}
              onChange={(e) => {
                const val = e.target.value;
                setButtons((prev) =>
                  prev.map((b, i) =>
                    i === index
                      ? {
                          ...b,
                          fluxDelta: { ...b.fluxDelta, feeling: val },
                        }
                      : b
                  )
                );
              }}
            />
          </div>
          <div className="form-group w-100">
            <label>Buff:</label>
            <select
              value={button.fluxDelta.buff}
              onChange={(e) => {
                const val = e.target.value as BuffName;
                setButtons((prev) =>
                  prev.map((b, i) =>
                    i === index
                      ? {
                          ...b,
                          fluxDelta: { ...b.fluxDelta, buff: val },
                        }
                      : b
                  )
                );
              }}
            >
              <option value="">--Kein Buff--</option>
              {getAllBuffNames().map((buff) => (
                <option key={buff} value={buff}>
                  {buff}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group w-100">
            <label>Debuff:</label>
            <select
              value={button.fluxDelta.debuff}
              onChange={(e) => {
                const val = e.target.value as DebuffName;
                setButtons((prev) =>
                  prev.map((b, i) =>
                    i === index
                      ? {
                          ...b,
                          fluxDelta: { ...b.fluxDelta, debuff: val },
                        }
                      : b
                  )
                );
              }}
            >
              <option value="">--Kein Debuff--</option>
              {getAllDebuffNames().map((debuff) => (
                <option key={debuff} value={debuff}>
                  {debuff}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group w-100">
            <label>Item (in Hand):</label>
            <input
              type="text"
              value={button.fluxDelta.item}
              placeholder="Nichts"
              onChange={(e) => {
                const val = e.target.value;
                setButtons((prev) =>
                  prev.map((b, i) =>
                    i === index
                      ? {
                          ...b,
                          fluxDelta: { ...b.fluxDelta, item: val },
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

export default FluxDelta;
