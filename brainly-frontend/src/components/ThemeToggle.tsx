import { useTheme } from '../context/ThemeContext';
import { Button } from './Button';
import { DarkModeIcon } from '../assets/icons/'

export const ThemeToggle = ()=>{
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            variant={'secondary'}
            size={'md'}
            isIconOnly={true}
            startIcon={DarkModeIcon}
            onClick={toggleTheme} />
    )
}