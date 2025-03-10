// #region [imports]
import React from "react";
import { observer } from "mobx-react-lite";
import { WeightedEvent } from "../../../../../data/eventData";
import PlaceTemplate from "../../../../../layout/PlaceTemplate";
// #endregion

// #region [prepare]
const FountainBoardStats: React.FC = observer(() => {
	const possibleEvents: WeightedEvent[] = [
		// { eventId: "E003FindStoneTrigger", probability: 100, questId: "Q003FindStone" },
		// { eventId: "E004OneTrashTrigger", probability: 100, questId: "Q004OneTrash" },
	];

	const description = (
		<p className="mb-1 text-left">
			Deine Aufmerksamkeit wird von Zetteln angezogen, auf denen Bewohner um Hilfe bitten, um sich
			selbst zu übertreffen oder in kleinen Rivalitäten vorne zu liegen. Mal geht es um
			Kraftvergleiche, Geschicklichkeitsspiele oder darum, wer in Lahtheim gerade der Reichste oder
			Beliebteste ist. Manche wollen nur einen Rat, andere direkte Unterstützung, um ihre Chancen zu
			erhöhen. Wer weiß, vielleicht lernst du ja auch etwas dabei - und profitierst selbst von
			diesen ehrgeizigen Zeitgenossen.
		</p>
	);

	// #endregion

	// #region [jsx]
	return (
		<div className="max-width">
			<PlaceTemplate
				title={<b>Verbessern</b>}
				description={description}
				backPath="/fountain-board"
				possibleEvents={possibleEvents}
			/>
		</div>
	);
	// #endregion
});

export default FountainBoardStats;
