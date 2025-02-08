import './index.css';
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
