import React, { useContext } from "react";
import { races } from "../../../data/raceData";
import { CreatePlayerContext } from "./context";
import Header from "../../../layout/Header/Header";
import Talk from "../../../utility/Formatted/Talk";
import { CREATURE } from "../../../data/helper/colorfullStrings";
import { parseDescription } from "../../../utility/Helper/ParseTextToJSX";
import { HiddenLine } from "../../../layout/HiddenLine";
import { GradientText } from "../../../utility/Formatted/GradientText";
import { darkBlueColors } from "../../../data/helper/colorMappingData";

interface ChooseRaceProps {
	page: number;
	onNext: () => void;
}

const ChooseRace: React.FC<ChooseRaceProps> = ({ page, onNext }) => {
	const playerContext = useContext(CreatePlayerContext);
	if (!playerContext) return;

	const { race, setRace } = playerContext;

	return (
		<div className="max-width">
			<Header>Zu welchem Volk gehörst du?</Header>
			<div className="text-left">
				<p className="mb-2">
					<p className="mb-1">
						Ein kleines {CREATURE.blauesWesen} fliegt direkt auf dich zu. Es hält nur wenige
						Zentimeter vor deinem Kopf an und betrachtet dich kritisch.
						<Talk>"Wa-wa-wa..."</Talk> stammelst du.
						<br />
					</p>
					<p className="mb-1">
						<Talk color="rotesWesen">
							"Du beherschst anscheinend nicht unsere Sprache. Dann werde ich l a n g s a m reden!"
						</Talk>
						<br />
						hörst du eine Stimme hinter dir. Erschrochen drehst du dich um und erkennst ein{" "}
						{CREATURE.rotesWesen}. Es setzt sich auf deine Schulter wärend {CREATURE.blauesWesen} zu
						sprechen beginnt.
						<Talk color="blauesWesen">
							"Also, wir sind hier, um dich mit diesem Reich vertraut zu machen, also tust du gut
							daran, uns ganz genau zuzuhören"
						</Talk>
					</p>
					<p className="mb-1">
						Du nickst stumm und schenkst diesen seltsamen Wesen deine volle Aufmerksamkeit.
					</p>
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
						<br />
						{option.bonus}
					</button>
				))}
			</div>

			<div className="text-left mb-2">
				<Header>{race.label}</Header>
				{parseDescription(race.description)}
			</div>

			<div className="flex-row">
				<button className="btn-border w-150" disabled={true}>
					<GradientText colors={darkBlueColors}>Zurück</GradientText>
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

export default ChooseRace;
