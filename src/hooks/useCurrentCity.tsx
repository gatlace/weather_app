import { createContext, useContext, useState, useEffect, PropsWithChildren } from 'react';
import { City, getCity } from 'locations';

const currentCityContext = createContext({} as City);
const updateCurrentCityContext = createContext((city: City) => {});

export const CurrentCityProvider = ({ children }: PropsWithChildren) => {
    const [currentCity, setCurrentCity] = useState({} as City);
    
    useEffect(() => {
        wait();
        getDefaultCity();
    }, []);

    const getDefaultCity = async () => {
        getCity().then(setCurrentCity);
    }

    const updateCurrentCity = (city: City) => {
        setCurrentCity(city);
    }

    const wait = async () => {
        while (!currentCity._links) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    return (
        <currentCityContext.Provider value={currentCity}>
            <updateCurrentCityContext.Provider value={updateCurrentCity}>
                {children}
            </updateCurrentCityContext.Provider>
        </currentCityContext.Provider>
    );
}

export const useCurrentCity = () => {
    return useContext(currentCityContext);
}

export const useUpdateCurrentCity = () => {
    return useContext(updateCurrentCityContext);
}