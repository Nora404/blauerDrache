import React, { useContext } from "react";
import { CreatePlayerContext } from "./context";
import Header from "../../../layout/Header/Header";
import { callings, emptyCallingObj } from "../../../data/callingData";
import { parseDescription } from "../../../utility/Helper/ParseTextToJSX";
import { HiddenLine } from "../../../layout/HiddenLine";
import { CREATURE } from "../../../data/helper/colorfullStrings";
import Talk from "../../../utility/Formatted/Talk";

interface ChooseCallingProps {
	page: number;
	onNext: () => void;
	onBack: () => void;
}

const ChooseCalling: React.FC<ChooseCallingProps> = ({ page, onNext, onBack }) => {
	const playerContext = useContext(CreatePlayerContext);
	if (!playerContext) return;

	const { calling, setCalling } = playerContext;

	const handleBack = () => {
		setCalling(emptyCallingObj);
		onBack();
	};

	return (
		<div>
			<Header>Was hat dich nach Lahtheim geführt?</Header>
			<div className="text-left">
				<p className="mb-1">
					<Talk color="blauesWesen">
						"Oh wie schön! Das hatten wir schon lange nicht mehr hier."{" "}
					</Talk>
					Das {CREATURE.roteWesen} schaut ungläubig das {CREATURE.blaueWesen} an.
				</p>
				<p className="mb-1">
					<Talk color="rotesWesen">
						"Das meinst du nicht ernst oder? Von denen hier laufen doch hunderte herum und tun so
						als wären sie einzigartig und die 'Auserwählten' um unser reich vor den Drachen zu
						retten!"
					</Talk>
				</p>
				<p className="mb-1">
					<Talk color="blauesWesen">
						"Drachen sind so freundliche Wesen, niemand braucht uns vor ihnen zu retten. Sei doch
						einmal etwas freundlicher!"
					</Talk>{" "}
					sagt das {CREATURE.blaueWesen} empört. Die Beiden tauschen noch weitere nicht ganz so
					freundliche Worte aus. In der Zeit überlegst du warum es dich nach Lahtheim verschleppt
					hat. Was ist deine Berufung?
				</p>
			</div>

			<div className="grid-2 mb-2" style={{ gap: "15px" }}>
				{callings.map((option) => (
					<button
						className={`btn-border ${option.name === calling.name && "glow"}`}
						style={{ margin: 0 }}
						key={option.name}
						onClick={() => setCalling(option)}>
						{option.label}
						<br />
						{option.bonus}
					</button>
				))}
			</div>

			<div className="text-left mb-2">
				<Header>{calling.label}</Header>
				{parseDescription(calling.description)}
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

export default ChooseCalling;
