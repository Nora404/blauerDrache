//#region [imports]
import React from "react";
import { observer } from "mobx-react-lite";
import { WeightedEvent } from "../data/eventData";
import ActionButton from "../layout/ActionButtons/ActionButton";
import { EventManager } from "./Events/EventManager";
//#endregion

//#region [prepare]
type ButtonConfig = {
  label: string;
  onClick?: () => void;
  startEventId?: string;
};

type PlaceTemplateProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  buttons?: ButtonConfig[];
  chanceOfAnyEvent?: number;
  allowNoEvent?: boolean;
  backPath: string;
  possibleEvents: WeightedEvent[];
  forcedEventId?: string;
};

/**
 * @param title (?) - Überschrift mit <hr> Linie
 * @param description (?) - Beschreibungstext
 * @param buttons (?) - Array von {label, onClick?, startEventId?}
 * @param noEventHappend (?) - Text, der angezeigt wird, wenn kein Event stattfindet
 * @param chanceOfAnyEvent (?) - Wahrscheinlichkeit, dass ein Event stattfindet 0.1 = 10%
 * @param backPath - Pfad, zu dem zurückgegangen wird
 * @param possibleEvents - Array von {eventId, probability, questId?, conditions?}
 */
const PlaceTemplate: React.FC<PlaceTemplateProps> = observer(
  ({
    title,
    description,
    buttons,
    backPath,
    possibleEvents,
    chanceOfAnyEvent,
    allowNoEvent,
    forcedEventId,
  }) => {
    //#endregion

    //#region [jsx]
    return (
      <div className="max-width">
        <h2>{title}</h2>
        <div className="mb-1">{description}</div>

        {buttons &&
          buttons?.length > 0 &&
          buttons.map((button) => (
            <ActionButton
              key={button.label}
              onClick={button.onClick}
              label={button.label}
            />
          ))}

        <EventManager
          events={possibleEvents}
          backPath={backPath}
          chanceOfAnyEvent={chanceOfAnyEvent}
          allowNoEvent={allowNoEvent}
          backBtn={true}
          forcedEventId={forcedEventId}
        />
      </div>
    );
  }
);
//#endregion

export default PlaceTemplate;
