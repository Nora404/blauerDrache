import React, { useContext } from "react";
import { races } from "../../../data/raceData";
import { CreatePlayerContext } from "./context";

interface ChooseNameProps {
	page: number;
	onNext: () => void;
	onBack: () => void;
}

const ChooseName: React.FC<ChooseNameProps> = ({ page, onNext, onBack }) => {
	const playerContext = useContext(CreatePlayerContext);
	if (!playerContext) return;

	const { setRace } = playerContext;

	return (
		<div>
			<h1>Header</h1>
			<p>Dies ist ein kurzer Text.</p>

			{races.map((option) => (
				<button key={option.name} onClick={() => setRace(option)}>
					{option.name}
				</button>
			))}

			<div>
				<button onClick={onBack}>Zurück</button>
				<span>Frage: {page}</span>
				<button onClick={onNext}>Weiter</button>
			</div>
		</div>
	);
};

export default ChooseName;
