import './App.css'
import { Dashboard } from './pages/dashboard';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';

function App() {

  return (
    <div className='bg-app-bg min-h-screen flex flex-row'>
      <Sidebar/>
      <div className='flex flex-col flex-1 ml-56'>
        <Navbar/>
        <Dashboard/>
      </div>
    </div>
  )
}

export default App
