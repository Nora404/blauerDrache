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
import { useQuestIsDone } from "../../utility/Hooks/QuestEvents";
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
	const questDone = useQuestIsDone();

	const [currentBattleId, setCurrentBattleId] = useState<string | null>(null);
	const [currentQuestId, setCurrentQuestId] = useState<string | null>(null);
	const [currentEventId, setCurrentEventId] = useState<string | null>(null);

	const [showQuestButton, setShowQuestButton] = useState<boolean>(() => {
		return questDone !== undefined ? true : false;
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
	}, [questDone]);

	//#endregion

	//#region [useEffect]
	useEffect(() => {
		setShowQuestButton(questDone !== undefined ? true : false);
	}, [questDone]);

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
	if (currentBattleId) {
		return <Combat battleId={currentBattleId} onFinish={handleFinishEvent} />;
	}

	if (currentQuestId) {
		return <Quest questId={currentQuestId} onFinish={handleFinishEvent} />;
	}

	if (currentEventId) {
		return (
			<>
				<Event
					eventId={currentEventId}
					onTriggerBattle={setCurrentBattleId}
					onTriggerQuest={setCurrentQuestId}
					onNextEvent={setCurrentEventId}
					onFinish={handleFinishEvent}
				/>

				{/* Zeige Button, falls Quest abgeschlossen */}
				{showQuestButton && questDone && (
					<p>
						<ActionButton
							onClick={() => handleQuestButton(questDone.eventByEnd)}
							label={"Quest abgeben: " + questDone.label}
						/>
					</p>
				)}
			</>
		);

	}

	//#endregion

	return <>{backBtn && <ActionButton onClick={handleFinishEvent} label="Sich abwenden" />}</>;
};
