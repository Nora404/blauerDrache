import React from "react";
import { ButtonConfig,} from "../Context/EventContext";
import {
  getAllBuffNames,
  getAllDebuffNames,
  getAllFeelingNames,
} from "../Context/Helper";
type FluxDeltaProps = {
  button: ButtonConfig;
  setButton: React.Dispatch<React.SetStateAction<ButtonConfig>>;
};

const FluxDelta: React.FC<FluxDeltaProps> = ({ button, setButton }) => {
  return (
    <div className="max-widht">
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={button.fluxDeltaEnabled}
            onChange={(e) => {
              const checked = e.target.checked;
              setButton((prev) => ({
                ...prev,
                fluxDeltaEnabled: checked,
              }));
            }}
          />
          fluxDelta
        </label>
      </div>

      {button.fluxDeltaEnabled && (
        <div className="nested-section flex-row">
          <div className="form-group w-100">
            <label>Feeling:</label>
            <select
              value={button.fluxDelta.feeling}
              onChange={(e) => {
                setButton((prev) => ({
                  ...prev,
                  fluxDelta: { ...prev.fluxDelta, feeling: e.target.value },
                }));
              }}
            >
              <option value="">--Kein Gefühl--</option>
              {getAllFeelingNames().map((feeling) => (
                <option key={feeling} value={feeling}>
                  {feeling}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group w-100">
            <label>Buff:</label>
            <select
              value={button.fluxDelta.buff}
              onChange={(e) => {
                setButton((prev) => ({
                  ...prev,
                  fluxDelta: { ...prev.fluxDelta, buff: e.target.value },
                }));
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
                setButton((prev) => ({
                  ...prev,
                  fluxDelta: { ...prev.fluxDelta, debuff: e.target.value },
                }));
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
                setButton((prev) => ({
                  ...prev,
                  fluxDelta: { ...prev.fluxDelta, item: e.target.value },
                }));
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FluxDelta;