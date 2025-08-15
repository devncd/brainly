import './App.css'
import { Button } from './components/Button';
import { ThemeToggle } from './components/ThemeToggle';
import { PlusIcon, ShareIcon } from './assets/icons';
import { Card } from './components/Card';

function App() {

  return (
    <div className='bg-app-bg min-h-screen'>
      {/* top navigation bar */}
      <div className='p-4 flex justify-end items-center space-x-2'>

        <Button
          variant='secondary' 
          size='sm' 
          startIcon={ShareIcon}
          text='Share Brain'
          onClick={()=>console.log("Share button clicked.")} />

          <Button 
          variant='primary' 
          size='sm' 
          startIcon={PlusIcon}
          text='Add Content'
          onClick={()=>console.log("Buy button clicked.")} />

          <ThemeToggle size='sm'/>
      </div>

      {/* collections */}
      <div className='flex flex-wrap gap-4 p-4 pt-2'>
        <Card
          title={"First video"}
          link={"https://www.youtube.com/watch?v=T_o542Ujj5o"}
          type={'video'}
          tags={['geopolitics', 'india-pak']} />

        <Card
          title={"First tweet"}
          link={"https://x.com/adamtaylorl/status/1955585624272253382"}
          type={'article'}
          tags={['ai', 'gemini']} />

        <Card
          title={"River front Kota Rajasthan India lorem ipsum"}
          link={"https://cdn2.iguzzini.com/getmedia/c91a2159-7725-4e1e-90c4-87c7f45f0bbf/03_Chambal-Riverfront?width=1500&height=1000"}
          type={'image'}
          tags={['kota', 'city']} />
      </div>

    </div>
  )
}

export default App
