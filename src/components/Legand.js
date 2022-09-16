import './legand.css';

import SevenDaysForecast from './SevenDaysForecast';
import CurrentWeather from './CurrentWeather';
import Header from './Header';

import { useContext } from 'react';
import {WeatherDataContext } from  './UserContext';

function Legand() {

    let veri = useContext(WeatherDataContext);

  return (
    <div className='blurBackground'>

      <img className='backgroundImg' src={veri.season === "winter" ? require('../backgrounds/w1.jpg') : veri.season === "summer" ? require('../backgrounds/s2.jpg') : veri.season === "spring" ? require('../backgrounds/spring4.jpg') : veri.season === "fall" ? require('../backgrounds/a1.jpg') : ''}/>

        <div className="innerCover">
          <Header/>
          <CurrentWeather/>
          <SevenDaysForecast/>
        </div>

    </div>
    
  )
}

export default Legand