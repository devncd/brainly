import React, { useState, createContext, useContext, useEffect } from 'react';

// define the shape of context
interface ThemeContextType {
    theme: 'light' | 'dark';
    toggleTheme: ()=>void
}

// create context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// create a provider component
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>(()=>{
        // check for saved theme in localStorage
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        if(savedTheme === 'light' || savedTheme === 'dark'){
            return savedTheme;
        }
        // or default to user's system preference
        const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if(userPrefersDark){
            return userPrefersDark ? 'dark' : 'light';
        }
        // default to 'light' if all else fails
        return 'light';
    });

    useEffect(()=>{
        const root = document.documentElement;
        // remove previous theme class
        root.classList.remove('light', 'dark');
        // add current theme class
        root.classList.add(theme);
        // save theme to localStorage
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = ()=>{
        setTheme((prevTheme) => (prevTheme==='dark' ? 'light' : 'dark'));
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

// create custom hook to easily use the theme context
export const useTheme = ()=>{
    const context = useContext(ThemeContext);
    if(context === undefined){
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context;
}