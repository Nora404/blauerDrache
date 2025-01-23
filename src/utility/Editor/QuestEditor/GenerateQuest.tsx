// GenerateQuests.tsx
import React from "react";
import QuestEnd from "./QuestEnd";
import QuestMainData from "./QuestMainData";
import QuestTrigger from "./QuestTrigger";
import { QuestContextProvider } from "../Context/QuestContext";
import GenerateQuestCode from "./GenerateQuestCode";

export default function GenerateQuests() {
  return (
    <QuestContextProvider>
      <div className="form-container text-left max-width">
        <h2>Quest-Editor</h2>
        <p>
          Eine Quest besteht immer aus einem Trigger-Event, den eigentlichen
          Questdaten und einem End-Event. Anschließend kannst du unten den Code
          generieren und abspeichern.
        </p>

        <details open>
          <summary>
            <b>1) Trigger-Event</b>
          </summary>
          <QuestTrigger />
        </details>

        <details open>
          <summary>
            <b>2) Quest-Daten</b>
          </summary>
          <QuestMainData />
        </details>

        <details open>
          <summary>
            <b>3) End-Event</b>
          </summary>
          <QuestEnd />
        </details>

        <GenerateQuestCode />
      </div>
    </QuestContextProvider>
  );
}
