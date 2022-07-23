const BASE_URL = "https://api.teleport.org/api/cities/";

export interface CityResult {
    _links:                   {"city:item" : {href: string}};
    matching_alternate_names: string[];
    matching_full_name:       string;
}

export interface City {
    _links:     Links;
    full_name:  string;
    geoname_id: number;
    location:   {latlon: {latitude: number, longitude: number}};
    name:       string;
    population: number;
}

export interface Links {
    "city:admin1_division": {href: string; name: string;};
    "city:alternate-names": { href: string; };
    "city:country":         {href: string; name: string;};
    "city:timezone":        {href: string; name: string;};
    "city:urban_area":      {href: string; name: string;};
    curies:                 {name: string; href: string; templated: boolean;};
    self:                   {href: string;};
}

export const searchCities = async (city: string): Promise<CityResult[]> => {
    const response = await fetch(`${BASE_URL}?search=${city}`);
    const data = await response.json().then(data => data._embedded["city:search-results"]);
    return data;
}

export const getCity = async (city?: CityResult): Promise<City> => {
    let finalCity: City
    if (city === undefined) {
        finalCity = await searchCities("Waterbury").then(data => data[0])
            .then(data => fetch(data._links["city:item"].href))
            .then(data => data.json());
    } else {
        finalCity = await fetch(city._links["city:item"].href)
            .then(data => data.json());
    }

    return finalCity;
}