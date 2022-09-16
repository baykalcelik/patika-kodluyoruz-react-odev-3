import Legand from './Legand';
import Loading from './Loading';
import {WeatherDataContext } from  './UserContext';
import {useContext} from 'react';
import './weatherapp.css';


function WeatherApp() {

  let veri = useContext(WeatherDataContext);

  console.log("yükleme bitmedi mi ? ", veri.loading);

  return (
    <div className='waCover'>
      {!veri.loading ? <Legand/> : <Loading/>}
    </div>
  )


}

export default WeatherApp