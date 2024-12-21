import './index.css';
import './App.css'
import logo from './assets/logo.png';
import drache from './assets/drache.png';
import { GradientText } from './utility/GradientText';

function App() {

  return (
    <div>
      <div id="header"><img src={logo} alt="logo" /></div>
      <div id="drache" className='drache'><img src={drache} alt="drache" width={450} /></div>
      <div id="content">
        <div id="navi" className="custom-scrollbar">
          Navi <br /> <p>Test</p>Test<p>Test</p>Test<p>Test</p>Test<p>Test</p>Test<p>Test</p>Test<p>Test</p>Test<p>Test</p>Test<p>Test</p>Test<p>Test</p>Test<p>Test</p>Test<p>Test</p>Test<p>Test</p>Test<p>Test</p>Test<p>Test</p>Test<p>Test</p>Test
        </div>
        <div id="main" className="custom-scrollbar">
          Main<br /> <p>Test</p>Test<p>Test</p>Test<p>Test</p>Test<p>Test</p>Test<p>Test</p>Test<p>Test</p>Test<p>Test</p>Test<p>Test</p>Test<p>Test</p>Test<p>Test</p>Test<p>Test</p>Test<p>Test</p>Test<p>Test</p>Test<p>Test</p>Test<p>Test</p>Test
        </div>
        <div id="charakter" className="custom-scrollbar">
          Das bist du <br /><hr />
          <p className='text-left'>
            Name: Nora404<br />
            Rasse: Entwickler<br />
            Herkunft: Kinderzimmer<br />
          </p>
          Das kannst du <br /><hr />
          <p className='text-left'>
            Leben: 100<br />
            Runden: 10<br />
            Angriff: 10<br />
            Verteidigung: 10<br />
            Glück: 10<br />
          </p>
          Das hast du <br /><hr />
          <p className='text-left'>
            Nichts
          </p>
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
