import { races } from "../../../../data/raceData";
import { parseDescription } from "../../../../utility/Helper/ParseTextToJSX";

const Book4: React.FC = () => {
	return (
		<div className="text-left">
			{races.map((race) => {
				return (
					<>
						<h3>{race.label}</h3>
						<p className="mb-2">{parseDescription(race.description)}</p>
						<hr className="mb-2" />
					</>
				);
			})}
		</div>
	);
};

export default Book4;
