import React, { useContext } from "react";
import { CreatePlayerContext } from "./context";
import Header from "../../../layout/Header/Header";
import { emptyOriginObj, origins } from "../../../data/originData";
import { parseDescription } from "../../../utility/Helper/ParseTextToJSX";
import { HiddenLine } from "../../../layout/HiddenLine";
import { CREATURE } from "../../../data/helper/colorfullStrings";
import Talk from "../../../utility/Formatted/Talk";

interface ChooseOriginProps {
	page: number;
	onNext: () => void;
	onBack: () => void;
}

const ChooseOrigin: React.FC<ChooseOriginProps> = ({ page, onNext, onBack }) => {
	const playerContext = useContext(CreatePlayerContext);
	if (!playerContext) return;

	const { race, origin, setOrigin } = playerContext;

	const handleBack = () => {
		setOrigin(emptyOriginObj);
		onBack();
	};

	return (
		<div className="max-width">
			<Header>Was ist dein Hintergrund?</Header>
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
						"Er will nur wissen woher du kommst, welchen Hintergund du hast."
					</Talk>
				</p>
			</div>

			<div className="mb-2">
				{origins
					.filter((option) => option.race === race.name)
					.map((option) => (
						<button
							className={`btn-border ${option.name === origin.name && "glow"}`}
							style={{ marginBottom: "10px" }}
							key={option.name}
							onClick={() => setOrigin(option)}>
							{option.label}
							<br />
							{option.bonus}
						</button>
					))}
			</div>

			<div className="text-left mb-2">
				<Header>{origin.label}</Header>
				{parseDescription(origin.description)}
			</div>

			<div className="flex-row">
				<button className="btn-border-red w-150" onClick={handleBack}>
					Zurück
				</button>
				<span>Frage: {page}</span>
				<button className="btn-border-green w-150" onClick={onNext}>
					Weiter
				</button>
			</div>

			<HiddenLine />
		</div>
	);
};

export default ChooseOrigin;
