import { useEffect, useState } from 'react';
import './App.css'
import { Button } from './components/Button';
import { ThemeToggle } from './components/ThemeToggle';
import { PlusIcon } from './assets/icons';

function App() {

  return (
    <div className='bg-app-bg h-screen'>
      <div className='p-4 flex justify-end items-center space-x-2'>

        <ThemeToggle/>
        
        <Button 
          variant='primary' 
          size='sm' 
          startIcon={PlusIcon}
          text='Add Content'
          onClick={()=>console.log("Buy button clicked.")} />
        <Button
          variant='secondary' 
          size='sm' 
          text='Share'
          onClick={()=>console.log("Share button clicked.")} />
        <Button
          disabled={true}
          variant='primary' 
          size='sm' 
          text='Disabled'
          onClick={()=>{}} />
        <Button
          disabled={true}
          variant='secondary' 
          size='sm' 
          text='Disabled'
          onClick={()=>{}} />
      </div>
    </div>
  )
}

export default App
