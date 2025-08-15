import { PlusIcon, ShareIcon } from "../assets/icons"
import { Button } from "./Button"
import { ThemeToggle } from "./ThemeToggle"

export const Navbar = () => {
    return (
        <>
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
        </>
    )
}