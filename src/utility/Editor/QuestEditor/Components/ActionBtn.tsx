// ActionBtn.tsx (angepasste Variante)
import React from "react";
import { ButtonConfig } from "../../Context/EventContext";

type ActionBtnProps = {
  buttons: ButtonConfig[];
  setButtons: React.Dispatch<React.SetStateAction<ButtonConfig[]>>;
  label?: string;
};

const ActionBtn: React.FC<ActionBtnProps> = ({ buttons, setButtons, label }) => {
  // ... deine Logik (addButton, removeButton, etc.), aber eben nur für das mitgebrachte State
  // ... 

  console.log(buttons, setButtons);
  return (
    <div>
      <h3>{label || "Buttons"}</h3>
      {/* Liste und so weiter */}
    </div>
  );
};

export default ActionBtn;
