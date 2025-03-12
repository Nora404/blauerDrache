/* eslint-disable react-hooks/rules-of-hooks */
import { startTransition, useContext, useEffect } from "react";
import Header from "../../../layout/Header/Header";
import { CreatePlayerContext } from "./context";
import { useRootStore } from "../../../store";
import { useNavigate } from "react-router-dom";
import { finalizePlayerCreation } from "../../../utility/Helper/Calculate";

const FinalCreating: React.FC = () => {
	const playerContext = useContext(CreatePlayerContext);
	const gameContext = useRootStore();
	const navigate = useNavigate();

	if (!playerContext || !gameContext) return;

	const { name, race, origin, calling } = playerContext;
	const { playerMeta, gameState, playerBase, playerEconomy, playerStats } = gameContext;

	useEffect(() => {
		startTransition(() => {
			gameState.setGameState({ creating: true });
			finalizePlayerCreation(
				{
					name,
					race,
					origin,
					calling,
				},
				{
					playerBase,
					playerStats,
					playerEconomy,
					playerMeta,
				}
			);
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
