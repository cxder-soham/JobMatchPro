// components/ThemeProvider.js

'use client';

import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    // Check if the user's preference is stored in localStorage
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        // Get stored theme from localStorage
        const storedTheme = localStorage.getItem('theme');

        if (storedTheme) {
            setTheme(storedTheme);
        } else {
            // If no preference, default to light theme
            setTheme('light');
        }
    }, []);

    // Update localStorage and the HTML class when theme changes
    useEffect(() => {
        localStorage.setItem('theme', theme);

        const root = window.document.documentElement;

        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
