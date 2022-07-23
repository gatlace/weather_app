import { useCurrentCity } from 'hooks/useCurrentCity';
import { useWeather } from 'hooks/useWeather';
import "./Background.scss";


const Background = () => {
  const time = useWeather().current_weather?.time;
  const timeZone = useCurrentCity()._links?.['city:timezone'].name;

  if (!time || !timeZone) {
    return null;
  } 


  const dateTime = new Date(time);
  const newTime = dateTime.toLocaleString('en-US', { timeZone });

  const timeOfDay = () => {
    if (dateTime.getHours() > 5 && dateTime.getHours() <= 9) {
      return "morning";
    } else if (dateTime.getHours() > 9 && dateTime.getHours() <= 15) {
      return "day";
    } else if (dateTime.getHours() > 15 && dateTime.getHours() <= 20) {
      return "evening";
    } else if (dateTime.getHours() > 20 || dateTime.getHours() <= 5) {
      return "night";
    }
  }

  const handleFavicon = () => {
    const favicon = document.getElementById("favicon") as HTMLLinkElement;
    
    if (timeOfDay() === "morning" || timeOfDay() === "day") {
      favicon.href = process.env.PUBLIC_URL + "/icons/day.ico";
    } else {
      favicon.href = process.env.PUBLIC_URL + "/icons/night.ico";
    }
  }

  handleFavicon()

  return (
    <div className={"background fixed h-full w-full " + (timeOfDay())}/>
  )
}

export default Background