import './App.css'
import { Button } from './components/Button';
import { ThemeToggle } from './components/ThemeToggle';
import { PlusIcon, ShareIcon } from './assets/icons';

function App() {

  return (
    <div className='bg-app-bg h-screen'>
      <div className='p-4 flex justify-end items-center space-x-2'>

        
        
        <Button
          variant='secondary' 
          size='md' 
          startIcon={ShareIcon}
          text='Share Brain'
          onClick={()=>console.log("Share button clicked.")} />

          <Button 
          variant='primary' 
          size='md' 
          startIcon={PlusIcon}
          text='Add Content'
          onClick={()=>console.log("Buy button clicked.")} />

          <ThemeToggle/>
      </div>
    </div>
  )
}

export default App
