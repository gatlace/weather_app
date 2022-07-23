import CurrentWeather from './CurrentWeather/CurrentWeather'
import Forecast from './Forecast/Forecast'

const Main = () => {
  return (
    <div id="bottom-main" className="flex flex-col h-5/6 pt-20">
      <CurrentWeather/>
      <Forecast />
    </div>
  )
}

export default Main