// #region [imports]
import React from "react";
import { observer } from "mobx-react-lite";
import { WeightedEvent } from "../../../../../data/eventData";
import PlaceTemplate from "../../../../../layout/PlaceTemplate";
// #endregion

// #region [prepare]
const FountainBoardKill: React.FC = observer(() => {
	const possibleEvents: WeightedEvent[] = [
		// { eventId: "E003FindStoneTrigger", probability: 100, questId: "Q003FindStone" },
		// { eventId: "E004OneTrashTrigger", probability: 100, questId: "Q004OneTrash" },
	];

	const description = (
		<p className="mb-1 text-left">
			Deine Augen überfliegen die zahlreichen Gesuche am schwarzen Brett auf der Suche nach etwas
			Action - einem guten Kampf oder einer Herausforderung, bei der es handfest zugehen darf.
			Glücklicherweise bietet Lahtheim genug Ärger, um fündig zu werden: Von lästigem Ungeziefer,
			das dringend beseitigt werden muss, bis hin zu wertvollen und gefährlichen Kopfgeldern ist
			alles vertreten. Zum Glück erwartet niemand ernsthaft von dir, dass du tatsächlich einen
			abgetrennten Kopf durch die Straßen trägst - wobei du dich fragst, was wohl mit all den
			zurückgelassenen Körpern passiert. Gibt es dafür vielleicht auch einen passenden Auftrag?
		</p>
	);

	// #endregion

	// #region [jsx]
	return (
		<div className="max-width">
			<PlaceTemplate
				title={<>PLACES.vergessen</>}
				description={description}
				backPath="/fountain-board"
				possibleEvents={possibleEvents}
			/>
		</div>
	);
	// #endregion
});

export default FountainBoardKill;
