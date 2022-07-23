import Card from 'components/templates/Card/Card';
import { Weather } from 'currentWeather';
import { useWeather } from 'hooks/useWeather';


const Forecast = () => {
  const weather: Weather = useWeather();
  if (weather.daily === undefined) {
    return <div>Loading...</div>
  }

  
  const cardsInfo = () => {
    const units = weather.daily_units;
    let cardsInfo = []
    for (const index in weather.daily.time) {
      const cardInfo: any  = {};
      for (const [key, value] of Object.entries(weather.daily)) {
        if (key === "sunrise" || key === "sunset") {
          cardInfo[key] = new Date(value[index]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else if (key === "time") {
          cardInfo[key] = new Date(value[index]).toLocaleDateString()
        } else {
          cardInfo[key] = `${value[index]}${units[key]}`
        }
      };
      cardsInfo.push(cardInfo);
    };

    return cardsInfo
  }

  return (
  <div className="flex flex-col bg-black/40 mt-10 rounded-lg grow">
    <h1 className="text-3xl border-b m-2 text-center">Forecast</h1>
    <div className="flex gap-6 m-2 overflow-x-auto h-full max-h-96 pb-10">
      {cardsInfo().map((cardInfo, index) => (
        <Card key={index}>
              <h1 className="text-center text-xl border-b mx-4">{cardInfo.time}</h1>
            <div className="flex flex-col justify-evenly items-center h-full">
              <h2>High: {cardInfo.temperature_2m_max}</h2>
              <h2>Low: {cardInfo.temperature_2m_min}</h2>
              <h3>Sunrise: {cardInfo.sunrise}</h3>
              <h4>Sunset: {cardInfo.sunset}</h4>
              <h4>Precipitation: {cardInfo.precipitation_sum}</h4>
            </div>
        </Card>))}
    </div>
  </div>
  )
}

export default Forecast;