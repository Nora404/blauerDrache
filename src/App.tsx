import './index.css';
import './App.css'
import './layout/Responsiv.css'
import logo from './assets/logo.svg';
import { GradientText } from './utility/GradientText';
import YouAre from './charakter/YouAre';
import YouCan from './charakter/YouCan';
import YouHave from './charakter/YouHave';

import { GameProvider } from './data/gameStore';
import NewPlayer from './playground/game/newPlayer/CreatePlayerNavi';
import OtherThingsNavi from './playground/game/otherThings/OtherThingsNavi';
import navigationMap from './NavigationList';
import { useEffect, useState } from 'react';
import RoutesList from './RoutesList';
import { useLocation } from 'react-router-dom';


function App() {
  const location = useLocation();
  const [currentNav, setCurrentNav] = useState<JSX.Element | undefined>(undefined);

  useEffect(() => {
    const NavComponent = navigationMap[location.pathname];
    if (NavComponent) {
      setCurrentNav(<NavComponent />);
    }
  }, [location.pathname]);

  return (
    <GameProvider>
      <div>
        <div id="header">
          <img
            src={logo}
            alt="logo"
            style={{ maxWidth: '800px', marginTop: '20px' }}
          />
        </div>
        <div id="content">
          <div id="navi" className="custom-scrollbar milchglas">
            <NewPlayer />
            {currentNav}
            <OtherThingsNavi />
          </div>
          <div id="main" className="custom-scrollbar milchglas">
            <RoutesList />
          </div>
          <div id="charakter" className="custom-scrollbar milchglas">
            <YouAre />
            <YouCan />
            <YouHave />
          </div>
        </div>
        <div id="footer">Diese Seite wurde inspiriert von der &nbsp;
          <a href="https://lotgd.de/home.php?" target='blank'>
            <GradientText colors={["#0066ff", "#00ff00"]}>Legende des grünen Drachen</GradientText>
          </a>
        </div>
      </div>
    </GameProvider>
  )
}

export default App
