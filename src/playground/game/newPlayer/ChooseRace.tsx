import React, { useContext } from "react";
import { races } from "../../../data/raceData";
import { CreatePlayerContext } from "./context";
import Header from "../../../layout/Header/Header";
import Talk from "../../../utility/Formatted/Talk";
import { CREATURE } from "../../../data/helper/colorfullStrings";

interface ChooseRaceProps {
	page: number;
	onNext: () => void;
	onBack: () => void;
}

const ChooseRace: React.FC<ChooseRaceProps> = ({ page, onNext, onBack }) => {
	const playerContext = useContext(CreatePlayerContext);
	if (!playerContext) return;

	const { race, setRace } = playerContext;

	return (
		<div className="max-width">
			<Header>Zu welchem Volk gehörst du?</Header>
			<div className="text-left">
				<p className="mb-1">
					<Talk color="rotesWesen">
						"Gut, dann fangen wir mal an. Zuerst musst du dich hier anmelden. Dafür brauchen wir
						deinen Namen, deine Herkunft und so weiter."
					</Talk>{" "}
					beginnt das {CREATURE.rotesWesen} seinen Text herunter zu rattern. Zeitgleich holt das{" "}
					{CREATURE.blauesWesen} einen Notizblock und zaubert eine Füllfeder aus dem Nichts heraus.
					Es macht sich bereit zu schreiben ...
				</p>
			</div>

			<div className="grid-2 mb-2" style={{ gap: "15px" }}>
				{races.map((option) => (
					<button
						className={`btn-border ${option.name === race.name && "glow"}`}
						style={{ margin: 0 }}
						key={option.name}
						onClick={() => setRace(option)}>
						{option.label}
					</button>
				))}
			</div>

			<div className="flex-row">
				<button className="btn-border-red w-150" onClick={onBack}>
					Zurück
				</button>
				<span>Frage: {page}</span>
				<button className="btn-border-green w-150" onClick={onNext}>
					Weiter
				</button>
			</div>
		</div>
	);
};

export default ChooseRace;
