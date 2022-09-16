import './header.css';
import providenceCoordinatList from '../providenceCoordinats';
import { GiPositionMarker } from 'react-icons/gi';
import {WeatherDataContext} from './UserContext';
import {useContext, useState} from 'react';
// console.log(providenceCoordinatList);


function getCoordinates(cityName){
  // console.log("cityname : ", cityName);

  let result = {};

  providenceCoordinatList.forEach(element => {

    if(element.il_adi === cityName){
      // console.log("getCoordinates lat : ", element.lat);
      // console.log("getCoordinates lon : ", element.lon);

      result = {lat:element.lat, lon:element.lon}
    }
  });

  return result;
}


function Header() {

  let veri = useContext(WeatherDataContext);

  const handleGPS = (e)=>{
    veri.setLoading(true);
    veri.getLocation();
  }
  
  
  const handleSelectedCity = (e)=>{
    if(e.target.value !== "default"){
      veri.setLoading(true);
      let koordinatlar = getCoordinates(e.target.value);
      veri.getLocation(koordinatlar.lat, koordinatlar.lon);
      veri.setSelectedCity(e.target.value);
    }

  }
  
  return (



    <div className='headerCover'>
        <img className='logo' src={require('../backgrounds/4s.png')}/>

        <select className='citySelection' value={veri.selectedCity} onChange={handleSelectedCity}>
          <option key={0} value="default" defaultChecked>Select a City</option>
            {providenceCoordinatList.map((item, index)=>{return <option key={index + 1} value={item.il_adi}>{item.il_adi}</option> })}
        </select>




        <button className='findGPSCoordinates' onClick={handleGPS}>
            Find GPS <img className='gpslogo' src={require('../backgrounds/gps4.png')}/>
        </button>
        {veri.gpserror && <span className='gpserror'>GPS verisi alınamıyor !</span>}
    </div>
  )
}

export default Header