//#region [import]
import { GradientText } from "../utility/Formatted/GradientText";
import CharakterNavi from "./CharakterNavi";
import { MainContent } from "./MainContent";
import MainNavi from "./MainNavi";
import MobileHeader from "./Mobile/MobileHeader";
import MobileFooter from "./Mobile/MobleFooter";
import { useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../store";

import lahtheim from "../assets/img/lahtheim.webp";
import pathImg from "../assets/img/path.webp";
import edge from "../assets/img/edge.webp";
import forest from "../assets/img/forest.webp";
//#endregion

//#region [prepare]
const backgroundsMap: Record<string, string> = {
	"/north-gate": lahtheim,
	"/path": pathImg,
	"/forest-edge": edge,
	"/forest": forest
};

const AppContent: React.FC = observer(() => {
	const { gameState } = useRootStore();

	const currentPath = gameState.data.currentPath;

	const getBackgroundImageUrl = (): string => {
		return lahtheim;
	};

	const [currentBg, setCurrentBg] = useState(getBackgroundImageUrl());
	//#endregion

	//#region [useEffect]
	const newBg = useMemo(() => {
		return backgroundsMap[currentPath];
	}, [currentPath]);

	useEffect(() => {
		if (!newBg) {
			return;
		}

		if (currentBg === null) {
			setCurrentBg(newBg);
			return;
		}

		if (newBg !== currentBg) {
			setCurrentBg(newBg);
		}
	}, [newBg, currentBg]);
	//#endregion

	//#region [jsx]
	return (
		<div>
			<div
				className="background-layer"
				style={{
					backgroundImage: `
						linear-gradient(
							to top, 
							rgba(0,0,0,1) 0%, 
							rgba(0,0,0,0.9) 40%, 
							rgba(0,0,0,0.8) 50%, 
							rgba(0,0,0,0.6) 60%, 
							rgba(0,0,0,0.4) 80%, 
							rgba(0,0,0,0.2) 100%
						), 
						url(${currentBg})
						`,
					backgroundSize: 'cover, cover',
					backgroundRepeat: 'no-repeat, no-repeat',
					backgroundAttachment: 'fixed, fixed',
					backgroundPosition: 'center center',
				}}
			/>

			<div>
				<div id="header">
					{/* <img src={logo} alt="logo" style={{ maxWidth: "800px", marginTop: "20px" }} /> */}
					<div className="milchglas w-full big-header mx-2 p-2" style={{ maxWidth: "1820px" }}>
						Legende des blauen Drachen
					</div>
				</div>
				<div id="mobileHeader" className="milchglas">
					<MobileHeader />
				</div>

				<div id="content">
					<div id="navi" className="custom-scrollbar milchglas">
						<MainNavi />
					</div>
					<div id="main">
						<MainContent />
					</div>
					<div id="charakter" className="custom-scrollbar milchglas">
						<CharakterNavi />
					</div>
				</div>

				<div id="footer">
					Diese Seite wurde inspiriert von der &nbsp;
					<a href="https://lotgd.de/home.php?" target="blank">
						<GradientText colors={["#0066ff", "#00ff00"]}>Legende des grünen Drachen</GradientText>
					</a>
				</div>
				<div id="mobileFooter">
					<MobileFooter />
				</div>
			</div>
		</div>
	);
	//#endregion
});

export default AppContent;
