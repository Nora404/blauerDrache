import './index.css';
import './App.css'
import './layout/Responsiv.css'
import AppContent from './layout/AppContent';
import { StoreProvider } from './store';


function App() {

  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  )
}

export default App
