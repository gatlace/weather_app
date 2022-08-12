import { CurrentCityProvider } from 'hooks/useCurrentCity';
import { useIsMobile } from 'hooks/useIsMobile';
import { SavedCitiesProvider } from 'hooks/useSavedCities';
import React from 'react'
import CurrentCity from './CurrentCity/CurrentCity'
import Options from './OptionsButton/Options'

const Main = () => {
  const isMobile = useIsMobile();

  return (
    <div id="top-main" className="min-h-fit h-1/6 bg-transparent">
      <div className="absolute text-xs text-end">
        <div>
          <a href="https://open-meteo.com/">
            Weather data by Open-Meteo.com
          </a>
        </div>
      <div>
        <a href="https://teleport.org/">
          Location data by Teleport.org
        </a>
      </div>
    </div>
      <h1 className={
        "px-2 flex text-3xl items-center h-1/2 " + 
        (!isMobile && "justify-center")}>
        Weather
      </h1>
      <div className="flex justify-between h-1/2 min-h-fit">
        <SavedCitiesProvider>
          <CurrentCity />
        </SavedCitiesProvider>
        <Options />
      </div>
    </div>
  )
}

export default Main;
