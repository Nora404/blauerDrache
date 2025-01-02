import './index.css';
import './App.css'
import './layout/Responsiv.css'
import logo from './assets/logo.svg';
import { GradientText } from './utility/GradientText';

import { GameStoreProvider } from './data/gameStore';
import { GameStateProvider } from './data/gameState';
import CharakterNavi from './layout/CharakterNavi';
import MainNavi from './layout/MainNavi';
import { MainContent } from './layout/MainContent';
import { NewGameStoreProvider } from './store/newGameStore';


function App() {

  return (
    <GameStoreProvider>
      <GameStateProvider>
        <NewGameStoreProvider>
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
                <MainNavi />
              </div>
              <div id="main">
                <MainContent />
              </div>
              <div id="charakter" className="custom-scrollbar milchglas">
                <CharakterNavi />
              </div>
            </div>
            <div id="footer">Diese Seite wurde inspiriert von der &nbsp;
              <a href="https://lotgd.de/home.php?" target='blank'>
                <GradientText colors={["#0066ff", "#00ff00"]}>Legende des grünen Drachen</GradientText>
              </a>
            </div>
          </div>
        </NewGameStoreProvider>
      </GameStateProvider>
    </GameStoreProvider>
  )
}

export default App
