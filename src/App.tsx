import './index.css';
import './App.css'
import './layout/Responsiv.css'
import logo from './assets/logo.svg';
import { GradientText } from './utility/GradientText';

import CharakterNavi from './layout/CharakterNavi';
import MainNavi from './layout/MainNavi';
import { MainContent } from './layout/MainContent';
import { NewGameStoreProvider } from './store/newGameStore';
import MobileFooter from './layout/Mobile/MobleFooter';
import MobileHeader from './layout/Mobile/MobileHeader';
import FallingParticles from './layout/FallingParticles';


function App() {

  return (
    <NewGameStoreProvider>
      <div>
        <div id="header">
          <img
            src={logo}
            alt="logo"
            style={{ maxWidth: '800px', marginTop: '20px' }}
          />
        </div>
        <div id="mobileHeader" className='milchglas'>
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



        <div id="footer">Diese Seite wurde inspiriert von der &nbsp;
          <a href="https://lotgd.de/home.php?" target='blank'>
            <GradientText colors={["#0066ff", "#00ff00"]}>Legende des grünen Drachen</GradientText>
          </a>
        </div>
        <div id="mobileFooter">
          <MobileFooter />
        </div>
      </div>
      <FallingParticles />
    </NewGameStoreProvider>
  )
}

export default App
