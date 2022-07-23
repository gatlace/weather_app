import { LinkOptions } from "currentWeather";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

const OptionsContext = createContext({} as LinkOptions)
const setOptionsContext = createContext((options: LinkOptions) => {});
const DEFAULT_OPTIONS: LinkOptions = {
    temperatureUnit: "celsius",
    windSpeedUnit: "ms",
    precipitationUnit: "mm",
}

export const POSSIBLE_OPTIONS = {
    temperatureUnit: ["celsius", "fahrenheit"],
    windSpeedUnit: ["ms", "kmh", "mph", "kn"],
    precipitationUnit: ["mm", "inch"],
}

export const OptionsProvider = ({ children }: PropsWithChildren<{}>) => {
    const [options, setOptions] = useState({} as LinkOptions);

    const updateOptions = (options: LinkOptions) => {
        setOptions(options);
        localStorage.setItem("options", JSON.stringify(options));
    }

    useEffect(() => {
        const options = localStorage.getItem("options");
        if (options) {
            setOptions(JSON.parse(options));
        } else {
        setOptions(DEFAULT_OPTIONS);
        }
    }, []); 

    return <OptionsContext.Provider value={options}>
            <setOptionsContext.Provider value={updateOptions}>
                {children}
            </setOptionsContext.Provider>
        </OptionsContext.Provider>
}

export const useOptions = () => useContext(OptionsContext)
export const useSetOptions = () => useContext(setOptionsContext)
