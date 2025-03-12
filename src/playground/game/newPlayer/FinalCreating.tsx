/* eslint-disable react-hooks/rules-of-hooks */
import { startTransition, useContext, useEffect } from "react";
import Header from "../../../layout/Header/Header";
import { CreatePlayerContext } from "./context";
import { useRootStore } from "../../../store";
import { useNavigate } from "react-router-dom";
import { finalizePlayerCreation } from "../../../utility/Helper/Calculate";
import { HiddenLine } from "../../../layout/HiddenLine";
import { CREATURE } from "../../../data/helper/colorfullStrings";
import Talk from "../../../utility/Formatted/Talk";

const FinalCreating: React.FC = () => {
	const playerContext = useContext(CreatePlayerContext);
	const gameContext = useRootStore();
	const navigate = useNavigate();

	if (!playerContext || !gameContext) return;

	const { name, race, origin, calling } = playerContext;
	const { playerMeta, gameState, playerBase, playerEconomy, playerStats, playerQuest } =
		gameContext;

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
			playerQuest.updateQuest("Q001StartAdventure", false);
			playerQuest.updateQuest("Q002GoToDiplomatic", false);
		});
	}, []);

	const handleGo = () => {
		navigate("/");
	};

	return (
		<div>
			<Header>Deine Reise beginnt</Header>
			<div className="text-left">
				<p className="mb-1">
					<Talk color="blauesWesen">"Ich habe alles notiert und werde es weiter leiten" </Talk> Das{" "}
					{CREATURE.blaueWesen} winkt zu jemanden am Tor zu. Kurz darauf kommt ein{" "}
					{CREATURE.geflügeltesWesen} herbei geschwebt und nimmt den Notizblock entgegen.
					<Talk color="blauesWesen">"Bring das ins Rathaus zur Bearbeitung"</Talk>{" "}
					<Talk color="geflügeltesWesen">"Jawohl!"</Talk> sagt das {CREATURE.geflügelteWesen} und
					schwirrt davon.
				</p>
				<p className="mb-1">
					<Talk color="rotesWesen">"Endlich vorbei und jetzt hau schon ab."</Talk> Beide Wesen
					wenden sich von dir ab und fliegen davon. Plötzlich dreht das {CREATURE.roteWesen} noch
					einmal um, schwebt zu dir und sagt mit einem führ ihn seltsam wirkenden Lächeln:
					<Talk color="rotesWesen">"Du solltest dem </Talk> {CREATURE.blauenDrachen}{" "}
					<Talk color="rotesWesen"> einen Besuch abstatten!"</Talk>
				</p>
			</div>

			<div className="text-left">
				<button className="btn-border" onClick={handleGo}>
					Reise beginnen
				</button>
			</div>
			<HiddenLine />
		</div>
	);
};

export default FinalCreating;
