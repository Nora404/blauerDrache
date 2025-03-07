//#region [imports]
import React, { useState, useEffect } from "react";
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

	const handleFinishEvent = () => {
		onEventEnd && onEventEnd();
		currentEventId && setCurrentEventId(null);

		if (onFinish) {
			onFinish();
		} else {
			navigate(backPath);
		}
	};

	useEffect(() => {
		if (currentEventId !== null) {
			onEventStart && onEventStart();
		}
	}, [currentEventId, onEventStart]);

	// Entweder das forcedEventId oder ein zufälliges Event auswählen
	useEffect(() => {
		if (currentEventId !== null) return;
		if (events.length === 0 && !forcedEventId) return;

		const chosenEventId = forcedEventId || pickRandomEvent(validEvents, noEventProbability);
		if (chosenEventId) {
			setCurrentEventId(chosenEventId);
		} else {
			handleFinishEvent();
		}
		// Wichtig: currentEventId ist nicht als Dependency, damit einmalig gewählt wird.
	}, [forcedEventId, events, validEvents, onFinish]);

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
					onNextEvent={(nextId) => {
						setCurrentEventId(nextId);
					}}
					onFinish={handleFinishEvent}
				/>

				<p>
					{questDone && (
						<ActionButton
							onClick={() => setCurrentEventId(questDone.eventByEnd)}
							label="Quest abgeben"
						/>
					)}
				</p>
			</>
		);
	}

	return <>{backBtn && <ActionButton onClick={handleFinishEvent} label="Sich abwenden" />}</>;
};
//#endregion
