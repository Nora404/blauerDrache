// #region [imports]
import React from "react";
import { observer } from "mobx-react-lite";
import { WeightedEvent } from "../../../../../data/eventData";
import PlaceTemplate from "../../../../../layout/PlaceTemplate";
// #endregion

// #region [prepare]
const FountainBoardBase: React.FC = observer(() => {
	const possibleEvents: WeightedEvent[] = [
		// { eventId: "E003FindStoneTrigger", probability: 100, questId: "Q003FindStone" },
		// { eventId: "E004OneTrashTrigger", probability: 100, questId: "Q004OneTrash" },
	];

	const description = (
		<p className="mb-1 text-left">
			Einige Zettel scheinen gezielt nur Abenteurer anzusprechen, die bereits eine gewisse Erfahrung
			vorweisen können. Bei näherem Hinsehen erkennst du Anforderungen, die deinen Ruf, deine Stärke
			oder andere besondere Fertigkeiten voraussetzen. Manchmal winkt ein seltener Bogen nur denen,
			die sich schon bewiesen haben, oder ein besonders wertvolles Schwert lässt sich ausschließlich
			von kampferprobten Händen führen. Vielleicht öffnet dir auch dein Ansehen Türen, die anderen
			verschlossen bleiben – es lohnt sich, regelmäßig nachzusehen, ob du dich bereits qualifiziert
			hast.
		</p>
	);

	// #endregion

	// #region [jsx]
	return (
		<div className="max-width">
			<PlaceTemplate
				title={<b>Erfahrung</b>}
				description={description}
				backPath="/fountain-board"
				possibleEvents={possibleEvents}
			/>
		</div>
	);
	// #endregion
});

export default FountainBoardBase;
