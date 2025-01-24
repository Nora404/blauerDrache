import React from "react";
import { ButtonConfig } from "../Context/EventContext";
import DescriptionEditor from "./DescriptionEditor";
import BaseDelta from "./BaseDelta";
import EconomyDelta from "./EconomyDelta";
import FluxDelta from "./FluxDelta";
import ItemsDelta from "./ItemsDelta";
import StateDelta from "./StateDelta";

type SingleButtonFormProps = {
  button: ButtonConfig;
  setButton: React.Dispatch<React.SetStateAction<ButtonConfig>>;
  title?: string;
  // Ggf. Flags, um einzelne Bereiche auszublenden, z.B. hideDeltas?: boolean
};

const SingleButtonForm: React.FC<SingleButtonFormProps> = ({
  button,
  setButton,
  title,
}) => {
  return (
    <div className="single-button-form" style={{ border: "1px dashed #999", padding: "10px", margin: "1rem 0" }}>
      {title && <h4>{title}</h4>}

      {/* Label */}
      <div className="form-group">
        <label>Button Label:</label>
        <input
          type="text"
          value={button.label}
          onChange={(e) => setButton({ ...button, label: e.target.value })}
        />
      </div>

      {/* Message (DescriptionEditor) */}
      <div className="form-group">
        <label>Message:</label>
        <DescriptionEditor
          value={button.message}
          onChange={(msg) => setButton({ ...button, message: msg })}
        />
      </div>

      {/* Delta-Komponenten */}
      {/* <ItemsDelta button={button} setButton={setButton} /> */}
      <EconomyDelta button={button} setButton={setButton} />
      <FluxDelta button={button} setButton={setButton} />
      <StateDelta button={button} setButton={setButton} />
      <BaseDelta button={button} setButton={setButton} />

      {/* 
        Falls du "nextEvents" oder "triggerQuest" etc. brauchst, 
        könntest du hier noch mehr Felder einbauen. 
        In deinem Fall:
        - Trigger Accept Button => wir fügen "triggerQuest" erst 
          im Code-Generator ein oder du kannst es hier manuell setzen. 
      */}
    </div>
  );
};

export default SingleButtonForm;
