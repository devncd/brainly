import './App.css'
import { Dashboard } from './pages/dashboard';
import { Navbar } from './components/Navbar';

function App() {

  return (
    <div className='bg-app-bg min-h-screen'>
      {/* top navigation bar */}
      <Navbar />
      {/* collections */}
      <Dashboard />
    </div>
  )
}

export default App
