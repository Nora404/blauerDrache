import './index.css';
import './App.css'
import './layout/Responsiv.css'
import AppContent from './layout/AppContent';
import { StoreProvider } from './store';
import { RouteSync } from './utility/Helper/RouteSync';


function App() {

  return (
    <StoreProvider>
      <RouteSync />
      <AppContent />
    </StoreProvider>
  )
}

export default App
