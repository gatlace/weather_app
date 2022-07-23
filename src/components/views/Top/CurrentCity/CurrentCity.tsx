import Search from '../Search/Search';
import { useCurrentCity } from 'hooks/useCurrentCity';
import SavedCities from './SavedCities/SavedCities';
import { useState } from 'react';


const CurrentCity = () => {
  const currentCity = useCurrentCity();
  const [isSavedCitiesOpen, setIsSavedCitiesOpen] = useState(false);
  
  return (
    <div className="flex w-11/12 items-center" id="current-city">
        <div className="box-border p-2 w-max shadow-outline active:shadow-none">{
          currentCity._links?
            <button onClick={() => setIsSavedCitiesOpen(true)}>
            {currentCity.name}, {currentCity._links['city:admin1_division'].name}
            </button>
        : "Loading..."
        }</div>
        <SavedCities isOpen={isSavedCitiesOpen} onClose={setIsSavedCitiesOpen}/>
        <Search />
    </div>
  )
}

export default CurrentCity