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
 * @param {React.ReactNode} [title] - Überschrift (wird oberhalb mit <hr> angezeigt).
 * @param {React.ReactNode} [description] - Beschreibungstext.
 * @param {Array<{label: string, onClick?: () => void, startEventId?: string}>} [buttons] - Array von Button-Konfigurationen.
 * @param {number} [noEventProbability] - Wahrscheinlichkeit (z. B. 0.1 für 10%), dass KEIN Event stattfindet.
 * @param {string} backPath - Pfad, zu dem zurückgekehrt wird.
 * @param {Array<WeightedEvent>} possibleEvents - Array von möglichen Events.
 * @param {string} [forcedEventId] - Optional: ID eines zu erzwingenden Events.
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
