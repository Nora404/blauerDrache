import './index.css';
import './App.css'
import './layout/Responsiv.css'
import { NewGameStoreProvider } from './store/newGameStore';
import AppContent from './layout/AppContent';


function App() {

  return (
    <NewGameStoreProvider>
      <AppContent />
    </NewGameStoreProvider>
  )
}

export default App
