//#region [imports]
import React, { useState } from "react";
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
	noEventProbability?: number;
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
		noEventProbability,
		forcedEventId,
	}) => {
		const [newForcedEventId, setNewForcedEventId] = useState(forcedEventId);
		const [eventActive, setEventActive] = useState(false);
		//#endregion

		//#region [handler]
		const handleClick = (btn: ButtonConfig) => {
			btn.onClick?.();
			if (btn.startEventId) {
				setNewForcedEventId(btn.startEventId);
			}
		};
		//#endregion

		//#region [jsx]
		return (
			<div className="max-width">
				<h2>{title}</h2>
				<div className="mb-1">{description}</div>

				{!eventActive &&
					buttons &&
					buttons?.length > 0 &&
					buttons.map((button) => (
						<ActionButton
							key={button.label}
							onClick={() => handleClick(button)}
							label={button.label}
						/>
					))}

				<EventManager
					events={possibleEvents}
					backPath={backPath}
					noEventProbability={noEventProbability}
					backBtn={true}
					forcedEventId={newForcedEventId}
					onEventStart={() => setEventActive(true)}
					onEventEnd={() => setEventActive(false)}
				/>
			</div>
		);
	}
);
//#endregion

export default PlaceTemplate;
