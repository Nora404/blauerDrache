//#region [imports]
import React, { useState, useEffect, useCallback } from "react";
import { WeightedEvent } from "../../data/eventData";
import { pickRandomEvent } from "../../utility/Event/TriggerEvent";
import { useEventFilter } from "../../utility/Hooks/EventFilter";
import Combat from "./Combat";
import Quest from "./Quest";
import Event from "./Event";
import { useNavigate } from "react-router-dom";
import ActionButton from "../ActionButtons/ActionButton";
import { useQuestsIsDone } from "../../utility/Hooks/QuestEvents";
//#endregion

//#region [prepare]
type EventManagerProps = {
	events: WeightedEvent[];
	forcedEventId?: string;
	backPath?: string;
	noEventProbability?: number;
	backBtn?: boolean;
	onFinish?: () => void;
	onEventStart?: () => void;
	onEventEnd?: () => void;
};

/**
 * @param {Array<WeightedEvent>} events - Array von möglichen Events.
 * @param {string} [forcedEventId] - Optional: ID eines zu erzwingenden Events.
 * @param {string} [backPath="/"] - Optional: Pfad, zu dem zurückgekehrt wird, wenn ein Event abgeschlossen ist.
 * @param {number} [noEventProbability] - Optional: Wahrscheinlichkeit, dass KEIN Event stattfindet (z. B. 0.1 für 10%).
 * @param {boolean} [backBtn=false] - Optional: Flag, ob ein Button zum Abbrechen/Zurückgehen angezeigt wird.
 * @param {Function} [onFinish] - Optionaler Callback, der ausgeführt wird, wenn ein Event abgeschlossen ist.
 * @param {Function} [onEventStart] - Optionaler Callback, der ausgeführt wird, wenn ein Event startet.
 * @param {Function} [onEventEnd] - Optionaler Callback, der ausgeführt wird, wenn ein Event endet.
 */
export const EventManager: React.FC<EventManagerProps> = ({
	events,
	forcedEventId,
	noEventProbability,
	backPath = "/",
	backBtn = false,
	onFinish,
	onEventStart,
	onEventEnd,
}) => {
	const navigate = useNavigate();
	const validEvents = useEventFilter(events);
	const questsDone = useQuestsIsDone();

	const [currentBattleId, setCurrentBattleId] = useState<string | null>(null);
	const [currentQuestId, setCurrentQuestId] = useState<string | null>(null);
	const [currentEventId, setCurrentEventId] = useState<string | null>(null);

	const [showQuestButton, setShowQuestButton] = useState<boolean>(() => {
		return questsDone !== undefined;
	});
	//#endregion

	//#region [handler]

	const handleFinishEvent = useCallback(() => {
		onEventEnd?.();
		if (currentEventId) setCurrentEventId(null);
		if (onFinish) {
			onFinish();
		} else {
			navigate(backPath);
		}
	}, [onEventEnd, onFinish, currentEventId, navigate, backPath]);

	const handleSelectEvent = useCallback(() => {
		// Wenn keine Events vorhanden sind, wird nichts gerendert.
		if (events.length === 0 && !forcedEventId) return;

		// default: nimm die gefilterten Events als Basis
		let selectionPool = validEvents;

		// Ist der Original-Array nicht leer, aber der gefilterte Event-Array leer geworden?
		if (events.length > 0 && validEvents.length === 0) {
			selectionPool = [{ eventId: "000Nothing", probability: 100 }];
		}

		// Wähle ein Event aus der Auswahl der gefilterten Events
		const chosenEventId = forcedEventId || pickRandomEvent(selectionPool, noEventProbability);
		if (chosenEventId) {
			setCurrentEventId(chosenEventId);
		} else {
			handleFinishEvent();
		}
	}, [events, forcedEventId, validEvents, noEventProbability, handleFinishEvent]);

	const handleQuestButton = useCallback((eventId: string) => {
		setCurrentEventId(eventId);
		setShowQuestButton(false);
	}, []);

	//#endregion

	//#region [useEffect]
	useEffect(() => {
		setShowQuestButton(questsDone !== undefined);
	}, [questsDone]);

	useEffect(() => {
		if (currentEventId !== null) {
			onEventStart?.();
		}
	}, [currentEventId, onEventStart]);

	useEffect(() => {
		if (currentEventId === null) {
			handleSelectEvent();
		}
	}, [currentEventId, handleSelectEvent]);
	//#endregion

	//#region [rendern]
	const questsBtn = () => {
		if (!questsDone || questsDone.length === 0) return null;

		return (
			<>
				{questsDone.map((quest) => {
					return (
						<p key={quest.id}>
							<ActionButton
								onClick={() => handleQuestButton(quest.eventByEnd)}
								bgColor="yellow"
								label={"Quest abgeben: " + quest.label}
							/>
						</p>
					);
				})}
			</>
		);
	};

	if (currentBattleId) {
		return <Combat battleId={currentBattleId} onFinish={handleFinishEvent} />;
	}

	if (currentQuestId) {
		return <Quest questId={currentQuestId} onFinish={handleFinishEvent} />;
	}

	if (currentEventId) {
		return (
			<>
				<p>
					<Event
						eventId={currentEventId}
						onTriggerBattle={setCurrentBattleId}
						onTriggerQuest={setCurrentQuestId}
						onNextEvent={setCurrentEventId}
					/>
				</p>
				<p>{showQuestButton && questsBtn()}</p>
				<p>
					{backBtn && (
						<ActionButton onClick={handleFinishEvent} bgColor={"red"} label="Sich abwenden" />
					)}
				</p>
			</>
		);
	}

	//#endregion

	return (
		<>
			<p>{showQuestButton && questsBtn()}</p>
			<p>
				{backBtn && (
					<ActionButton onClick={handleFinishEvent} bgColor={"red"} label="Sich abwenden" />
				)}
			</p>
		</>
	);
};
