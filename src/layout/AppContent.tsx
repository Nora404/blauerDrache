
import { GradientText } from '../utility/Formatted/GradientText';
import CharakterNavi from './CharakterNavi';
import { MainContent } from './MainContent';
import MainNavi from './MainNavi';
import MobileHeader from './Mobile/MobileHeader';
import MobileFooter from './Mobile/MobleFooter';
import logo from '../assets/logo.svg';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../store';
import backgroundDay from '../assets/background.png';
import backgroundEvening from '../assets/background2.png';
import backgroundNight from '../assets/background3.png';

const AppContent: React.FC = observer(() => {
  const { gameTime } = useRootStore();

  // #2: Hilfsfunktion, die anhand der Uhrzeit den Bildpfad liefert
  const getBackgroundImageUrl = (time: string): string => {
    const [hours] = time.split(":").map(Number);
    if (hours >= 7 && hours < 18) return backgroundDay;
    if (hours >= 18 && hours < 21) return backgroundEvening;
    if (hours >= 21 || hours < 5) return backgroundNight;
    return backgroundEvening;
  };

  // #3: Zustände für aktuellen und vorherigen Hintergrund & Transition-Status
  const [currentBg, setCurrentBg] = useState(getBackgroundImageUrl(gameTime.data.gameTime));
  const [prevBg, setPrevBg] = useState<string | null>(null);
  const [isFading, setIsFading] = useState(false);

  // #4: Effekt, der auf Änderung der GameTime reagiert
  useEffect(() => {
    const newBg = getBackgroundImageUrl(gameTime.data.gameTime);
    if (newBg !== currentBg) {
      setPrevBg(currentBg); // altes Bild speichern
      setCurrentBg(newBg);  // neuen Hintergrund setzen
      setIsFading(true);
      setTimeout(() => setIsFading(false), 2000); // Dauer muss zur CSS-Transition passen
    }
  }, [gameTime.data.gameTime, currentBg]);

  return (
    <div>

      <div className="background-container">
        {/* Neue Hintergrund-Ebene */}
        <div
          className="background-layer"
          style={{ backgroundImage: `url(${currentBg})` }}
        />
        {/* Falls gerade ein Übergang stattfindet: alte Ebene, die ausgeblendet wird */}
        {isFading && prevBg && (
          <div
            className="background-layer fade-out"
            style={{ backgroundImage: `url(${prevBg})` }}
          />
        )}
      </div>

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
