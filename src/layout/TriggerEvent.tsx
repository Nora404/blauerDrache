import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";

type TriggerEventProps = {
  eventList?: string[];
  forceEvent?: string;
  onFinish: () => void;
};

export const TriggerEvent: React.FC<TriggerEventProps> = observer(
  ({ eventList = [], forceEvent = "", onFinish }) => {
    useEffect(() => {
      // Wähle das Event, entweder forceEvent oder, falls nicht gesetzt, zufällig aus eventList
      const eventToTrigger =
        forceEvent || eventList[Math.floor(Math.random() * eventList.length)];

      // Beispielhafte Verarbeitung: Event loggen
      console.log("Triggering event:", eventToTrigger);

      // Nach Verarbeitung rufe onFinish auf
      onFinish();
    }, [eventList, forceEvent, onFinish]);

    return <div>Event wird getriggert...</div>;
  }
);
