import React, { useState } from "react";
import EventCreationForm from "./GenerateEvents";
import { EditorContextProvider } from "./Context/Context";
import ActionButton from "../../layout/ActionButtons/ActionButton";

const Editor: React.FC = () => {
  const [side, setSide] = useState<number>(1);

  const handleClick = (side: number) => {
    setSide(side);
  };

  return (
    <EditorContextProvider>
      <div className="max-widht">
        <h2>Editor</h2>

        <div className="flex-row">
          <ActionButton
            onClick={() => {
              handleClick(1);
            }}
            label="Event Editor"
          />
          <ActionButton
            onClick={() => {
              handleClick(2);
            }}
            label="Quest Editor"
          />
          <ActionButton
            onClick={() => {
              handleClick(3);
            }}
            label="Items Editor"
          />
        </div>

        <EventCreationForm />
      </div>
    </EditorContextProvider>
  );
};

export default Editor;
