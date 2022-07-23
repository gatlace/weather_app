import List from 'components/templates/List';
import Modal from 'components/templates/Modal/Modal';
import { useCurrentCity } from 'hooks/useCurrentCity';
import { useSavedCities, useUpdateSavedCities } from 'hooks/useSavedCities'
import { City } from 'locations';

interface Props {
    isOpen: boolean;
    onClose: (bool: boolean) => void;
}

const SavedCities = (props: Props) => {
    const [cities, setCities] = [useSavedCities(), useUpdateSavedCities()];
    const [isOpen, setIsOpen] = [props.isOpen, props.onClose];
    const currentCity = useCurrentCity();

    console.log(isOpen)
    
    const handleSaveCity = (city: City) => {
        setCities([...cities, city]);
        setIsOpen(false);
    }

    const handleRemoveCity = (city: City) => {
        setCities(cities.filter(c => c.full_name !== city.full_name));
        setIsOpen(false)
    }

    const entries = () => {
        let cityEntries = [];
        if (cities.length > 0) {
            cityEntries = cities.map((city: City) => {
                return {
                    name: city.name,
                    onSelect: () => handleRemoveCity(city),
                }
            })
        } else {
            cityEntries = [{
                name: "No cities saved",
                onSelect: () => {}
            }]
        }

        cityEntries.push({
            name: "Save current city",
            onSelect: () => handleSaveCity(currentCity)
        })

        return cityEntries
    }

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <List entries={entries()}/>
    </Modal>
  )
}

export default SavedCities