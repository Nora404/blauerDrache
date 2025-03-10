//#region [imports]
import React from "react";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../store";
import { WeightedEvent } from "../data/eventData";
import ActionButton from "../layout/ActionButtons/ActionButton";
import { EventManager } from "./Events/EventManager";
//#endregion

//#region [prepare]
type ButtonConfig = {
	label: string;
	onClick: () => void;
};

type MainPlaceTemplateProps = {
	title: React.ReactNode;
	description?: React.ReactNode;

	dayDescription: React.ReactNode;
	dayButtons: ButtonConfig[];

	nightDescription?: React.ReactNode;
	nightButtons?: ButtonConfig[];

	possibleEvents?: WeightedEvent[];
	noEventProbability?: number;
	backPath?: string;
};

/**
 * @param {React.ReactNode} title - Überschrift (wird oberhalb mit <hr> angezeigt).
 * @param {React.ReactNode} [description] - Optionaler Beschreibungstext.
 * @param {React.ReactNode} dayDescription - Beschreibung für den Tag (und als Fallback, wenn keine Nachtinhalte vorhanden sind).
 * @param {Array<{label: string, onClick: () => void}>} dayButtons - Array von Button-Konfigurationen für den Tag.
 * @param {React.ReactNode} [nightDescription] - Optional: Beschreibung für die Nacht.
 * @param {Array<{label: string, onClick: () => void}>} [nightButtons] - Optional: Array von Button-Konfigurationen für die Nacht.
 * @param {Array<WeightedEvent>} [possibleEvents] - Optionales Array von möglichen Events.
 * @param {number} [noEventProbability] - Optional: Wahrscheinlichkeit, dass KEIN Event stattfindet (z. B. 0.1 für 10%).
 * @param {string} [backPath="/"] - Optional: Pfad, zu dem zurückgekehrt wird.
 */
export const MainPlaceTemplate: React.FC<MainPlaceTemplateProps> = observer(
	({
		title,
		description,
		dayDescription,
		dayButtons,
		nightDescription,
		nightButtons,
		possibleEvents = [],
		backPath = "/",
		noEventProbability,
	}) => {
		const { gameTime } = useRootStore();
		const isDay = gameTime.data.gameDay === "Tag";

		// Wenn nightDescription bzw. nightButtons fehlen oder leer, fallback auf Tag
		const hasNightDescription = !!nightDescription;
		const hasNightButtons = !!nightButtons && nightButtons.length > 0;
		const canUseNachtInhalte = hasNightDescription && hasNightButtons;
		const showDayBlock = isDay || !canUseNachtInhalte;
		//#endregion

		//#region [jsx]
		return (
			<div className="max-width">
				<h2>{title}</h2>
				<div className="mb-1">{description}</div>

				{showDayBlock ? (
					<>
						{dayDescription}
						{dayButtons.map((btn) => (
							<ActionButton key={btn.label} onClick={btn.onClick} label={btn.label} />
						))}
					</>
				) : (
					<>
						{nightDescription}
						{nightButtons?.map((btn) => (
							<ActionButton key={btn.label} onClick={btn.onClick} label={btn.label} />
						))}
					</>
				)}

				<EventManager
					events={possibleEvents}
					backPath={backPath}
					noEventProbability={noEventProbability}
				/>
			</div>
		);
	}
);
//#endregion
