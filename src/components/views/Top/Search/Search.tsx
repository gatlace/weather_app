import React, { useEffect, useRef, useState } from 'react'
import { useUpdateCurrentCity } from 'hooks/useCurrentCity'
import { CityResult, getCity, searchCities } from 'locations';
import List, { Entry } from 'components/templates/List';
import Modal from 'components/templates/Modal/Modal';

const Search = () => {
  const searchBox = useRef({} as HTMLInputElement);
  const [ currentSearch, setCurrentSearch ] = useState('');
  const updateCurrentCity = useUpdateCurrentCity();
  const [ autoComplete, setAutoComplete ] = useState([] as Entry[]);
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  
  
  useEffect(() => {
    if (currentSearch.length > 0) {
      getCities(currentSearch);
    }
  }, [currentSearch]);

  const convertAutoComplete = (results: CityResult[]): Entry[] => {
    const autoComplete = results.map(result => {
      return {
        name: result.matching_full_name,
        onSelect: () => {
          handleSelect(result);
        }
      };
    });
    return autoComplete;
  }

  const getCities = async (search: string) => {
    searchCities(search).then(res => {
      const convert = convertAutoComplete(res);
      if (convert.length === 0) {
        alert("No results found");
        return;
      }
      setAutoComplete(convert);
      setIsModalOpen(true);
    });
  }

  const getDetails = async (city: CityResult) => {
    getCity(city).then(res => {
      updateCurrentCity(res);
    });
  }
  
  const handleSearch = (search: string) => {
    setCurrentSearch(search);
  }

  const handleSelect = async (city: CityResult) => {
    getDetails(city)

    setAutoComplete([]);
    setCurrentSearch('');
    setIsModalOpen(false);
  }



  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        handleSearch(e.currentTarget.value);
    }
  }

  return (
      <div className="flex flex-col grow h-full justify-center items-center">
          <div 
            className="flex sticky w-full h-1/2  items-center justify-end">
              <input 
                ref={searchBox}
                className="w-full h-full p-1 text-black"
                type="text"
                placeholder="Search" 
                onKeyDown={handleKeyDown}/>
          </div>
          <Modal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            >
            <List entries={autoComplete} />
          </Modal>
      </div>
  )
}

export default Search;