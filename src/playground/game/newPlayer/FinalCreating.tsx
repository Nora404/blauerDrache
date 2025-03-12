import { startTransition, useContext, useEffect } from "react";
import Header from "../../../layout/Header/Header";
import { CreatePlayerContext } from "./context";
import { useRootStore } from "../../../store";
import { useNavigate } from "react-router-dom";

const FinalCreating: React.FC = () => {
	const playerContext = useContext(CreatePlayerContext);
	const gameContext = useRootStore();
	const navigate = useNavigate();

	const { name, race, origin, calling } = playerContext;
	const { playerMeta, gameState } = gameContext;

	useEffect(() => {
		startTransition(() => {
			gameState.setGameState({ creating: true });
			playerMeta.setPlayerMeta({
				name: name,
				race: race.name,
				origin: origin.name,
				calling: calling.name,
			});
		});
	}, []);

	const handleGo = () => {
		navigate("/");
	};

	return (
		<div>
			<Header>Deine Reise beginnt</Header>
			<div className="text-left">
				<button className="btn-border" onClick={handleGo}>
					Reise beginnen
				</button>
			</div>
		</div>
	);
};

export default FinalCreating;
