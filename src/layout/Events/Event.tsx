//#region [imports]
import React, { useState } from "react";
import { GameAction } from "../../data/eventData";
import { parseDescription } from "../../utility/Helper/ParseTextToJSX";
import {
	getBattleTiggerById,
	getGameEventById,
	getQuestTriggerById,
	pickRandomEvent,
} from "../../utility/Event/TriggerEvent";
import { useApplyGameAction } from "../../utility/Hooks/ApplyGameAction";
import ActionButton from "../ActionButtons/ActionButton";
import HeaderSmall from "../Header/HeaderSmall";
import { useButtonFilter } from "../../utility/Hooks/EventFilter";
//#endregion

//#region [prepare]
type EventProps = {
	eventId: string;
	onTriggerBattle?: (battleId: string) => void;
	onTriggerQuest?: (questId: string) => void;
	onNextEvent?: (nextEventId: string) => void;
};

/**
 * @param {string} eventId - ID des Events, das geladen wird.
 * @param {function} [onTriggerBattle] - Optionaler Callback, der aufgerufen wird, wenn ein Kampf-Trigger ausgelöst wird (erhält die Battle-ID).
 * @param {function} [onTriggerQuest] - Optionaler Callback, der aufgerufen wird, wenn ein Quest-Trigger ausgelöst wird (erhält die Quest-ID).
 * @param {function} [onNextEvent] - Optionaler Callback, der aufgerufen wird, um das nächste Event zu starten (erhält die ID des nächsten Events).
 */
const Event: React.FC<EventProps> = ({ eventId, onTriggerBattle, onTriggerQuest, onNextEvent }) => {
	const { applyGameAction } = useApplyGameAction();
	const [finalOutcome, setFinalOutcome] = useState<React.ReactNode | null>(null);

	const event =
		getGameEventById(eventId) || getQuestTriggerById(eventId) || getBattleTiggerById(eventId);

	// Hooks müssen vor Bedingungen/Early-Return aufgerufen werden
	const validButtons = useButtonFilter(event ? event.buttons : []);

	if (!event) {
		return <div>Unbekanntes Event: {eventId}</div>;
	}

	const descriptionJSX = parseDescription(event.description);
	//#endregion

	//#region [handler]
	const handleButtonClick = (getAction: () => GameAction) => {
		const action = getAction();
		applyGameAction(action);

		if (action.triggerBattle) {
			onTriggerBattle?.(action.triggerBattle);
			return;
		}
		if (action.triggerQuest) {
			onTriggerQuest?.(action.triggerQuest);
			return;
		}

		let nextEventId: string | null = null;
		if (action.nextEvents && action.nextEvents.length > 0) {
			nextEventId = pickRandomEvent(action.nextEvents, 0);
		} else if (action.nextEvents) {
			nextEventId = action.nextEvents[0].eventId;
		}

		const outcomeMsg = createOutcomeMessage(action);

		if (nextEventId) {
			onNextEvent?.(nextEventId);
		} else {
			setFinalOutcome(outcomeMsg);
		}
	};
	//#endregion

	//#region [jsx]
	return (
		<div className="max-width">
			{event.label && <HeaderSmall>{event.label}</HeaderSmall>}
			<p className="mb-1 text-left">{descriptionJSX}</p>
			{finalOutcome === null ? (
				validButtons.map((btn) => (
					<ActionButton
						key={btn.label}
						onClick={() => handleButtonClick(btn.getAction)}
						label={btn.label}
						result={btn.result}
					/>
				))
			) : (
				<p className="mb-1 text-left" style={{ color: "#aaffff" }}>
					{finalOutcome}
				</p>
			)}
		</div>
	);
};

export default Event;
//#endregion

// Ändere den Rückgabetyp von string zu React.ReactNode
export function createOutcomeMessage(action: GameAction): React.ReactNode {
	const messages: string[] = [];
	if (action.message) {
		messages.push(action.message);
	}

	if (action.itemsDelta) {
		const itemMessages = Object.entries(action.itemsDelta)
			.filter(([_, delta]) => delta !== 0)
			.map(([item, delta]) => {
				const verb = delta > 0 ? "{SYSTEM.erhalten}" : "{SYSTEM.abgegeben}";
				return `${Math.abs(delta)} ${item} ${verb}`;
			});
		if (itemMessages.length > 0) {
			messages.push(`\n${itemMessages.join(", ")}`);
		}
	}

	if (action.economyDelta) {
		const econMessages: string[] = [];
		if (typeof action.economyDelta.gold === "number" && action.economyDelta.gold !== 0) {
			const verb = action.economyDelta.gold > 0 ? "{SYSTEM.erhalten}" : "{SYSTEM.bezahlt}";
			econMessages.push(`\n${Math.abs(action.economyDelta.gold)} {SYSTEM.Gold} ${verb}`);
		}
		if (
			typeof action.economyDelta.edelsteine === "number" &&
			action.economyDelta.edelsteine !== 0
		) {
			const verb = action.economyDelta.edelsteine > 0 ? "{SYSTEM.erhalten}" : "{SYSTEM.bezahlt}";
			econMessages.push(
				`\n${Math.abs(action.economyDelta.edelsteine)} {SYSTEM.Edelsteine} ${verb}`
			);
		}
		if (econMessages.length > 0) {
			messages.push(econMessages.join(", "));
		}
	}

	if (action.baseDelta) {
		if (typeof action.baseDelta.leumund === "number" && action.baseDelta.leumund !== 0) {
			const verb = action.baseDelta.leumund > 0 ? "{SYSTEM.verbessert}" : "{SYSTEM.verschlechtert}";
			messages.push(`\nDein Leumund hat sich ${verb} um ${Math.abs(action.baseDelta.leumund)}`);
		}
	}

	// Falls es sowohl eine action.message als auch weitere generierte Nachrichten gibt,
	// trenne diese mit einem doppelten Zeilenumbruch ("\n\n")
	let fullMsg = "";
	if (action.message && messages.length > 1) {
		fullMsg = [messages[0], messages.slice(1).join(". ")].join("\n");
	} else {
		fullMsg = messages.join(". ");
	}

	return parseDescription(fullMsg);
}
