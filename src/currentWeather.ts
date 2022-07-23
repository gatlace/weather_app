import { City } from "locations";
const BASE_URL = "https://api.open-meteo.com/v1/forecast?";

export interface LinkOptions {
    [key: string]: string;
    temperatureUnit: "fahrenheit" | "celsius";
    windSpeedUnit: "mph" | "ms" | "kn" | "kmh";
    precipitationUnit: "inch" | "mm";
}

export interface Weather {
    [key: string]: any;
    latitude:           number;
    longitude:          number;
    generationtime_ms:  number;
    utc_offset_seconds: number;
    elevation:          number;
    current_weather:    CurrentWeather;
    daily_units:        DailyUnits;
    daily:              Daily;
}

interface CurrentWeather {
    temperature:   number;
    windspeed:     number;
    winddirection: number;
    weathercode:   number;
    time:          string;
}

interface Daily {
    [key: string]: any;
    time:               Date[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    sunrise:            string[];
    sunset:             string[];
    precipitation_sum:  number[];
}

interface DailyUnits {
    [key: string]: string;
    time:               string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    sunrise:            string;
    sunset:             string;
    precipitation_sum:  string;
}


const baseLink = (city: City): string => {
    const { latitude, longitude } = city.location.latlon;
    const link = `${BASE_URL}latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    return link;
}

const addDaily = (link: string): string => {
    const daily = "&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum";
    const linkWithDaily = `${link}${daily}`;
    return linkWithDaily;
}

const addLinkOptions = (link: string, options?: LinkOptions): string => {
    if (!options) {
        return link;
    }

    const { temperatureUnit, windSpeedUnit, precipitationUnit } = options;

    if (temperatureUnit) {
        if (temperatureUnit !== "celsius") {
            link += `&temperature_unit=${temperatureUnit}`;
        }
    }

    if (windSpeedUnit) {
        if (windSpeedUnit !== "kmh") {
            link += `&windspeed_unit=${windSpeedUnit}`;
        }
    }

    if (precipitationUnit) {
        if (precipitationUnit !== "mm") {
            link += `&precipitation_unit=${precipitationUnit}`;
        }
    }

    return link;
}

const addTimeZone = (link: string, city: City): string => {
    const timezone = city._links["city:timezone"].name;
    return `${link}&timezone=${timezone}`;
}

export const getWeather = async (city: City, options: LinkOptions): Promise<Weather> => {
    while (!city.location) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    const linkWithDaily = addDaily(baseLink(city));
    const linkWithOptions = addLinkOptions(linkWithDaily, options);
    const linkWithTimeZone = addTimeZone(linkWithOptions, city);
    console.log(linkWithTimeZone);
    const response = await fetch(linkWithTimeZone)
        .then(response => response.json())
        .then(data => data);
    return response;

}