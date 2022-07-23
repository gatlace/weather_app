import React from 'react'
import { useOptions } from 'hooks/useOptions';
import { useWeather } from 'hooks/useWeather';
import { useIsMobile } from 'hooks/useIsMobile';

const CurrentWeather = () => {
  const options = useOptions();
  const currentWeather = useWeather().current_weather;
  const isMobile = useIsMobile();
  
  if (!currentWeather) {
    return <div>Loading...</div>;
  }

  const windDirection = () => {
    const windDegree = currentWeather.winddirection;
    if (windDegree < 22.5) {
      return "N";
    } else if (windDegree < 67.5) {
      return "NE";
    } else if (windDegree < 112.5) {
      return "E";
    } else if (windDegree < 157.5) {
      return "SE";
    } else if (windDegree < 202.5) {
      return "S";
    } else if (windDegree < 247.5) {
      return "SW";
    } else if (windDegree < 292.5) {
      return "W";
    } else if (windDegree < 337.5) {
      return "NW";
    } else {
      return "N";
    }
  }

  const windSpeedUnit = () => {
    if (options.windSpeedUnit === "ms") {
      return "m/s";
    } else if (options.windSpeedUnit === "kmh") {
      return "km/h";
    } else if (options.windSpeedUnit === "mph") {
      return "mph";
    } else {
      return "knots";
    }
  }

  return (
    <div className= "bg-black/40 rounded-lg">
      <h1 className={"text-3xl border-b m-2 " + (!isMobile && "text-center")}>Right Now</h1>
      <div className="text-center">
      <h1 className="text-xl">Temperature: {currentWeather.temperature + "\u00B0" + (options.temperatureUnit === "celsius"? "C":"F")}</h1>
      <h2>Wind Speed: {currentWeather.windspeed + windSpeedUnit()}</h2>
      <h3>Wind Direction: {currentWeather.winddirection + "\u00B0 " + windDirection()}</h3>
      </div>
    </div>
  )
}

export default CurrentWeather