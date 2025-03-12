import { useEffect, useState } from "react";

import ChooseRace from "./ChooseRace";
import ChooseOrigin from "./ChooseOrigin";
import ChooseCalling from "./ChooseCalling";
import ChooseName from "./ChooseName";
import { CreatePlayerProvider } from "./context";
import PlayerPreview from "./PlayerPreview";
import FinalCreating from "./FinalCreating";
import { useRootStore } from "../../../store";

const CreatePlayer = () => {
	const [page, setPage] = useState(1);

	// Erst einmal alle Daten Löschen
	const { resetGameData } = useRootStore();
	useEffect(() => {
		resetGameData();
	}, [resetGameData]);

	const onNext = () => setPage((prev) => prev + 1);
	const onBack = () => setPage((prev) => Math.max(prev - 1, 1));

	const renderStep = () => {
		switch (page) {
			case 1:
				return <ChooseRace page={page} onNext={onNext} onBack={onBack} />;
			case 2:
				return <ChooseOrigin page={page} onNext={onNext} onBack={onBack} />;
			case 3:
				return <ChooseCalling page={page} onNext={onNext} onBack={onBack} />;
			case 4:
				return <ChooseName page={page} onNext={onNext} onBack={onBack} />;
			case 5:
				return <FinalCreating />;
			default:
				return <div>Ungültige Seite</div>;
		}
	};

	return (
		<CreatePlayerProvider>
			<PlayerPreview />
			{renderStep()}
		</CreatePlayerProvider>
	);
};

export default CreatePlayer;
