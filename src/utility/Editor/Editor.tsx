import React, { useState } from "react";
import EventCreationForm from "./EventEditor/GenerateEvents";
import { EditorContextProvider } from "./Context/EventContext";
import ActionButton from "../../layout/ActionButtons/ActionButton";
import GenerateQuest from "./QuestEditor/GenerateQuest";
import Admincenter from "./Admincenter";


const Editor: React.FC = () => {
  const [side, setSide] = useState<number>(3);

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
            label="Admincenter"
          />
        </div>

        {side === 1 && <EventCreationForm />}
        {side === 2 && <GenerateQuest />}
        {side === 3 && <Admincenter />}
      </div>
    </EditorContextProvider>
  );
};

export default Editor;
