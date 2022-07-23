import { getWeather, Weather } from 'currentWeather'
import React, { PropsWithChildren, useContext, useEffect } from 'react'
import { useCurrentCity } from './useCurrentCity';
import { useOptions } from './useOptions';

const weatherContext = React.createContext({} as Weather);

export const WeatherProvider = (props: PropsWithChildren) => {
    const currentCity = useCurrentCity();
    const [weather, setWeather] = React.useState({} as Weather);
    const options = useOptions();
    
    useEffect(() => {
        if (!currentCity.name) {
            return;
        }
        getWeather(currentCity, options).then(weather => {
            setWeather(weather);
        });
    }, [currentCity, options]);
    
  return (
    <weatherContext.Provider value={weather}>
        { props.children }
    </weatherContext.Provider>
  )
}

export const useWeather = (): Weather => {
    return useContext(weatherContext);
}