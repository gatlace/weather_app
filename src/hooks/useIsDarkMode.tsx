import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

const isDarkModeContext = createContext(false);

export const IsDarkModeProvider = ({ children }: PropsWithChildren) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setIsDarkMode(true);
        }
    }, []);

    return (
        <isDarkModeContext.Provider value={isDarkMode}>
            {children}
        </isDarkModeContext.Provider>
    );
}

export const useIsDarkMode = () => {
    return useContext(isDarkModeContext);
}