// #region [imports]
import React from "react";
import { observer } from "mobx-react-lite";
import { WeightedEvent } from "../../../../../data/eventData";
import PlaceTemplate from "../../../../../layout/PlaceTemplate";
// #endregion

// #region [prepare]
const FountainBoardUse: React.FC = observer(() => {
	const possibleEvents: WeightedEvent[] = [
		// { eventId: "E003FindStoneTrigger", probability: 100, questId: "Q003FindStone" },
		// { eventId: "E004OneTrashTrigger", probability: 100, questId: "Q004OneTrash" },
	];

	const description = (
		<p className="mb-1 text-left">
			Dein Blick schweift aufmerksam über die Zettel, während du nach einer leichten Gelegenheit
			suchst, dir ein paar Münzen dazuzuverdienen. Die Bewohner von Lahtheim sind erfinderisch
			darin, ihre kleinen Alltagsprobleme in lukrative Aufträge zu verwandeln. Ob es darum geht,
			einen verwilderten Garten wieder zu bewässern, mit deinem musikalischen Talent die Taverne zu
			beleben oder die erloschenen Öllampen in einem dunklen Keller anzuzünden - keine Aufgabe
			scheint zu gewöhnlich, solange der Preis stimmt.
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

export default FountainBoardUse;
