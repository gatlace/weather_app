import React from 'react'
import { IsMobileProvider } from 'hooks/useIsMobile'
import { IsDarkModeProvider } from 'hooks/useIsDarkMode'
import { CurrentCityProvider } from 'hooks/useCurrentCity';
import Bottom from '../Bottom/Main';
import Background from './Background/Background';
import { WeatherProvider } from 'hooks/useWeather';
import { OptionsProvider } from 'hooks/useOptions';
import Top from "../Top/Main";

const Main = () => {
  return (
    <div className="h-screen text-white p-2">
      <IsMobileProvider>
        <IsDarkModeProvider>
          <CurrentCityProvider>
            <OptionsProvider>
              <WeatherProvider>
                <Background/>
                <Top />
                <Bottom />
              </WeatherProvider>
            </OptionsProvider>
          </CurrentCityProvider>
        </IsDarkModeProvider>
      </IsMobileProvider>
    </div>
  )
}

export default Main