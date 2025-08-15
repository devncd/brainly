import { useTheme } from '../context/ThemeContext';
import { Button } from './Button';
import { DarkModeIcon } from '../assets/icons/'

export const ThemeToggle = ({size = 'sm'}: {size?: 'sm' | 'md' | 'lg'})=>{
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            variant={'secondary'}
            size={size}
            isIconOnly={true}
            startIcon={DarkModeIcon}
            onClick={toggleTheme} />
    )
}