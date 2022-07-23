import { City } from 'locations';
import { createContext, useContext, useState, useEffect, PropsWithChildren } from 'react';

const savedCitiesContext = createContext([] as City[]);
const updateSavedCitiesContext = createContext((cities: City[]) => {});

export const SavedCitiesProvider = ({ children }: PropsWithChildren) => {
    const [savedCities, setSavedCities] = useState([] as City[]);

    useEffect(() => {
        wait();
        getCities();
    }, []);

    const updateCities = (cities: City[]) => {
        setSavedCities(cities);
        localStorage.setItem("savedCities", JSON.stringify(cities));
    }


    const getCities = async () => {
        const cities = await getSavedCities();
        if (cities.length > 0) {
            setSavedCities(cities);
        }
    }

    const getSavedCities = () => {
        const cities = localStorage.getItem('savedCities');
        if (cities) {
            return JSON.parse(cities);
        } else {
            return [];
        }
    }

    const wait = async () => {
        while (!savedCities.length) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    return (
        <savedCitiesContext.Provider value={savedCities}>
            <updateSavedCitiesContext.Provider value={updateCities}>
                {children}
            </updateSavedCitiesContext.Provider>
        </savedCitiesContext.Provider>
    );
}

export const useSavedCities = () => useContext(savedCitiesContext)

export const useUpdateSavedCities = () => useContext(updateSavedCitiesContext)
