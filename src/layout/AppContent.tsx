import { GradientText } from "../utility/GradientText";
import CharakterNavi from "./CharakterNavi";
import { MainContent } from "./MainContent";
import MainNavi from "./MainNavi";
import MobileHeader from "./Mobile/MobileHeader";
import MobileFooter from "./Mobile/MobleFooter";
import logo from "../assets/logo.svg";
import { startTransition, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../store";

const AppContent: React.FC = observer(() => {
  const { gameTime } = useRootStore();

  const getBackgroundClass = (gameTime: string): string => {
    const [hours] = gameTime.split(":").map(Number);

    if (hours >= 7 && hours < 18) return "body-day";
    if (hours >= 18 && hours < 21) return "body-evening";
    if (hours >= 21 || hours < 5) return "body-night";
    return "body-morning";
  };

  useEffect(() => {
    const newClass = getBackgroundClass(gameTime.data.gameTime);

    startTransition(() => {
      document.body.classList.remove(
        "body-day",
        "body-evening",
        "body-night",
        "body-morning"
      );
      document.body.classList.add(newClass);
    });

    return () => {
      document.body.classList.remove(newClass);
    };
  }, [gameTime.data.gameTime]);

  return (
    <div>
      <div>
        <div id="header">
          <img
            src={logo}
            alt="logo"
            style={{ maxWidth: "800px", marginTop: "20px" }}
          />
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
            <GradientText colors={["#0066ff", "#00ff00"]}>
              Legende des grünen Drachen
            </GradientText>
          </a>
        </div>
        <div id="mobileFooter">
          <MobileFooter />
        </div>
      </div>
    </div>
  );
});

export default AppContent;
