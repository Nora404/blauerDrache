import React from "react";
import EventCreationForm from "./GenerateEvents";
import { EditorContextProvider } from "./Context/Context";

const Editor: React.FC = () => {
  return (
    <EditorContextProvider>
      <div className="max-widht">
        <h2>Editor</h2>
        <EventCreationForm />
      </div>
    </EditorContextProvider>
  );
};

export default Editor;
