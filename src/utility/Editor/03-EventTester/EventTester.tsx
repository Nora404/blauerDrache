import React, { useState } from "react";
import { gameBattlesEvents } from "../../../data/battleList";
import { gameQuestEvents } from "../../../data/questList";
import { EventManager } from "../../../layout/Events/EventManager";
import { randomTriggerEvents } from "../../../data/gameEvents/randoms/randomEventList";
import { lahtheimCenterTriggerEvents } from "../../../data/gameEvents/lahtheim/center/lahtheimCenterList";
import { HiddenLine } from "../../../layout/HiddenLine";

export const TestEventManager: React.FC = () => {
	const [selectedEventType, setSelectedEventType] = useState<string>("");
	const [selectedEventId, setSelectedEventId] = useState<string>("");

	const [showManager, setShowManager] = useState(false);
	const [forcedId, setForcedId] = useState<string | undefined>(undefined);

	const filteredEvents = React.useMemo(() => {
		switch (selectedEventType) {
			case "random":
				return randomTriggerEvents;
			case "lahtheim":
				return lahtheimCenterTriggerEvents;
			case "battle":
				return gameBattlesEvents;
			case "quest":
				return gameQuestEvents.filter((q) => q.id.endsWith("Trigger"));
			default:
				return [];
		}
	}, [selectedEventType]);

	const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedEventType(e.target.value);
		setSelectedEventId("");
	};

	const handleStart = () => {
		if (selectedEventId) {
			setForcedId(selectedEventId);
			setShowManager(true);
		}
	};

	const handleFinish = () => {
		setShowManager(false);
		setForcedId(undefined);
	};

	return (
		<div className="max-width">
			<h2>Test Event Manager</h2>
			<div className="flex-row m-2-e" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
				<select value={selectedEventType} onChange={handleTypeChange} style={{ flex: 1 }}>
					<option value="">Wähle eine Eventart</option>
					<option value="random">Random</option>
					<option value="lahtheim">Lahtheim</option>
					<option value="battle">Battle</option>
					<option value="quest">Quest</option>
				</select>

				<select
					value={selectedEventId}
					onChange={(e) => setSelectedEventId(e.target.value)}
					style={{ flex: 1 }}>
					<option value="">Wähle ein Event</option>
					{filteredEvents.map((ev) => (
						<option key={ev.id} value={ev.id}>
							{ev.label || ev.id}
						</option>
					))}
				</select>

				<button onClick={handleStart} className="btn-border add-button w-100px">
					Start
				</button>
				<button onClick={handleFinish} className="btn-border remove-button w-100px">
					Reset
				</button>
			</div>

			<hr />
			<br />
			{/* Falls forcedId gesetzt und showManager true ist, wird der EventManager gerendert */}
			{showManager && forcedId && (
				<EventManager events={[]} forcedEventId={forcedId} onFinish={handleFinish} backBtn={true} />
			)}

			<HiddenLine />
		</div>
	);
};
