import React, { useContext } from "react";
import Header from "../../../layout/Header/Header";
import { CreatePlayerContext } from "./context";

const PlayerPreview: React.FC = () => {
	const playerContext = useContext(CreatePlayerContext);
	if (!playerContext) return;
	const { name, race, origin, calling } = playerContext;

	return (
		<div className="max-width">
			<Header>Aktueller Steckbrief</Header>
			<p className="text-left">
				Name: {name}
				<br />
				Rasse: {race.label}, {race.bonus}
				<br />
				Herkunft: {origin.label}, {origin.bonus}
				<br />
				Berufung: {calling.label}, {calling.bonus}
				<br />
			</p>
		</div>
	);
};

export default PlayerPreview;
