import './index.css';
import './App.css'
import logo from './assets/logo.png';
import drache from './assets/drache.png';
import { GradientText } from './utility/GradientText';
import YouAre from './charakter/YouAre';
import YouCan from './charakter/YouCan';
import YouHave from './charakter/YouHave';
import Start from './playground/Start';
import NewPlayer from './navigation/NewPlayer';
import { Route, Routes } from 'react-router-dom';
import CreatePlayer from './playground/CreatePlayer';
import Map from './playground/Map';

function App() {

  return (
    <div>
      <div id="header"><img src={logo} className='logo' alt="logo" /></div>
      <div id="drache" className='drache'><img src={drache} className='dracheImg' alt="drache" /></div>
      <div id="content">
        <div id="navi" className="custom-scrollbar">
          <NewPlayer />
        </div>
        <div id="main" className="custom-scrollbar">
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/start" element={<Start />} />
            <Route path="/charakter" element={<CreatePlayer />} />
            <Route path="/map" element={<Map />} />
          </Routes>
        </div>
        <div id="charakter" className="custom-scrollbar">
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
  )
}

export default App
