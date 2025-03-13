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
import { getItemLabelByName, ItemName } from "../../data/gameItems/ItemData";
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
	const nodes: React.ReactNode[] = [];

	// Basisnachricht, falls vorhanden
	if (action.message) {
		nodes.push(parseDescription(action.message));
		nodes.push(<br key="br-msg" />);
	}

	// Items-Änderungen
	if (action.itemsDelta) {
		const itemNodes = Object.entries(action.itemsDelta)
			.filter(([_, delta]) => delta !== 0)
			.map(([item, delta], index) => {
				const label = getItemLabelByName(item as ItemName);
				const verbToken = delta > 0 ? "{SYSTEM.erhalten}" : "{SYSTEM.abgegeben}";
				// parseDescription sorgt hier für das richtige Format der Tokens
				const verb = parseDescription(verbToken);
				return (
					<span key={`item-${index}`}>
						{Math.abs(delta)} {label} {verb}
					</span>
				);
			});

		if (itemNodes.length > 0) {
			// Absatz bzw. Zeilenumbruch zwischen Basisnachricht und Items
			nodes.push(<br key="br-items" />);
			nodes.push(...itemNodes);
		}
	}

	// Economy-Änderungen
	if (action.economyDelta) {
		const econNodes: React.ReactNode[] = [];
		if (typeof action.economyDelta.gold === "number" && action.economyDelta.gold !== 0) {
			const verbToken = action.economyDelta.gold > 0 ? "{SYSTEM.erhalten}" : "{SYSTEM.bezahlt}";
			econNodes.push(
				<span key="gold">
					{Math.abs(action.economyDelta.gold)} {parseDescription("{SYSTEM.Gold}")}{" "}
					{parseDescription(verbToken)}
				</span>
			);
		}
		if (
			typeof action.economyDelta.edelsteine === "number" &&
			action.economyDelta.edelsteine !== 0
		) {
			const verbToken =
				action.economyDelta.edelsteine > 0 ? "{SYSTEM.erhalten}" : "{SYSTEM.bezahlt}";
			econNodes.push(
				<span key="edelsteine">
					{Math.abs(action.economyDelta.edelsteine)} {parseDescription("{SYSTEM.Edelsteine}")}{" "}
					{parseDescription(verbToken)}
				</span>
			);
		}
		if (econNodes.length > 0) {
			nodes.push(<br key="br-econ" />);
			nodes.push(...econNodes);
		}
	}

	// Base-Änderungen (z. B. Leumund)
	if (action.baseDelta) {
		if (typeof action.baseDelta.leumund === "number" && action.baseDelta.leumund !== 0) {
			const verbToken =
				action.baseDelta.leumund > 0 ? "{SYSTEM.verbessert}" : "{SYSTEM.verschlechtert}";
			nodes.push(<br key="br-base" />);
			nodes.push(
				parseDescription(
					`Dein Leumund hat sich ${verbToken} um ${Math.abs(action.baseDelta.leumund)}`
				)
			);
		}
	}

	return <>{nodes}</>;
}
