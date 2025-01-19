import './index.css';
import './App.css'
import './layout/Responsiv.css'
import { NewGameStoreProvider } from './store/newGameStore';
import AppContent from './layout/AppContent';
import { StoreProvider } from './store';


function App() {

  return (
    <NewGameStoreProvider>
      <StoreProvider>

        <AppContent />
      </StoreProvider>
    </NewGameStoreProvider>
  )
}

export default App
