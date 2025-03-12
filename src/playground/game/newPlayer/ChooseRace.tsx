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

	const { setRace } = playerContext;

	return (
		<div className="max-width">
			<Header>Zu welchem Volk gehörst du?</Header>
			<div className="text-left">
				<p className="mb-1">
					<Talk color="rotesWesen">
						"Glaubst du wir sind blind, das wir das nicht selbst schon erkannt haben?"{" "}
					</Talk>
					Höhnt das {CREATURE.roteWesen} während es langsam um dich herum schwebt. Das{" "}
					{CREATURE.blaueWesen} flattert zu dir und schupst das {CREATURE.roteWesen} weg.
				</p>
				<p className="mb-1">
					<Talk color="blauesWesen">
						"Er will nur wissen woher du kommst, zu welcher Gruppe du gehörst."
					</Talk>
				</p>
			</div>

			{races.map((option) => (
				<button className="btn-border" key={option.name} onClick={() => setRace(option)}>
					{option.name}
				</button>
			))}

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
