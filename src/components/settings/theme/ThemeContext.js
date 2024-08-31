import React from 'react';

const getInitialTheme = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
        // @todo: vk - get theme from user prefs instead of local storage
        // The theme will be available via the user profile object - retrieve from user prefs
        const storedPrefs = window.localStorage.getItem('color-theme');
        if (typeof storedPrefs === 'string') {
            return storedPrefs;
        }

        const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
        if (userMedia.matches) {
            return 'dark';
        }
    }

    // If you want to use another theme as the default, return 'dark', 'contrast', etc instead
    return 'light';
};

export const ThemeContext = React.createContext();

export const ThemeProvider = ({ initialTheme, children }) => {
    const [theme, setTheme] = React.useState(getInitialTheme);

    const rawSetTheme = (rawTheme) => {
        const root = window.document.documentElement;

        root.classList.remove('light', 'solar', 'dark', 'contrast');
        root.classList.add(rawTheme);

        // @todo: vk - store back to user prefs instead of local storage
        localStorage.setItem('color-theme', rawTheme);
    };

    if (initialTheme) {
        rawSetTheme(initialTheme);
    }

    React.useEffect(() => {
        rawSetTheme(theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};