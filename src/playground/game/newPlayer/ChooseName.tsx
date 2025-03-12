import React, { useContext } from "react";
import { CreatePlayerContext } from "./context";
import Header from "../../../layout/Header/Header";
import { CREATURE } from "../../../data/helper/colorfullStrings";
import Talk from "../../../utility/Formatted/Talk";

interface ChooseNameProps {
	page: number;
	onNext: () => void;
	onBack: () => void;
}

const ChooseName: React.FC<ChooseNameProps> = ({ page, onNext, onBack }) => {
	const playerContext = useContext(CreatePlayerContext);
	if (!playerContext) return;

	const { name, setName } = playerContext;

	const handleNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		setName(evt.target.value);
	};

	return (
		<div>
			<Header>Wie lautet dein Name?</Header>
			<div className="text-left">
				<p className="mb-1">
					Nachdem du deine Berufung offenbart hast lassen die beiden streitenden Wesen von einander
					ab und wenden sich wieder dir zu. Das {CREATURE.blaueWesen} nickt zufrieden.
					<Talk color="blauesWesen">"Sehr gut, ich notiere das ..." </Talk> Nachdem es mit
					dramatischer Bewegung den letzten Strich gezogen hat, das {CREATURE.roteWesen} rollt mit
					den Augen, fragt es dich mit verheißungsvoller Stimme:
				</p>
				<p className="mb-1">
					<Talk color="blauesWesen">"Und wie ist dein Name?"</Talk>
				</p>
			</div>

			<input
				type="text"
				value={name}
				onChange={handleNameChange}
				placeholder="Name"
				style={{ width: 250, textAlign: "center" }}
			/>
			<br />

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

export default ChooseName;
