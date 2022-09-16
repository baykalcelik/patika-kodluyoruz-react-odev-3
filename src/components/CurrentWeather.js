import './currentweather.css';
import {WeatherDataContext} from './UserContext';
import {useContext} from 'react';



function getMonthText(dateString){
  let number = parseInt(new Date(dateString).getMonth().toLocaleString()) + 1;
  console.log(number);
  switch(number){
    case 1:
      return "January";
    case 2:
      return "February";
    case 3:
      return "March";
    case 4:
      return "April";
    case 5:
      return "May";
    case 6:
      return "June";
    case 7:
      return "July";
    case 8:
      return "August";
    case 9:
      return "September";
    case 10:
      return "October";
    case 11:
      return "November";
    case 12:
      return "December";
    default:
      return "NaM";
  }


}



function CurrentWeather() {

  let veri = useContext(WeatherDataContext);
  // console.log(veri.wdata);
  // console.log(veri.wdata.data[0].datetime);
  // console.log(veri.wdata.data[0].date_time);

  getMonthText(veri.wdata.data[0].datetime);
  let mevsimResim = "../icons/" + veri.wdata.data[0].weather.icon + ".png";
  console.log(mevsimResim);
  // if(veri.wdata.data[0].weather.description)
  return (
    <div className='cwCover'>

      <div className='leftSide'>
          <p className='cityName'>{veri.wdata.city_name}</p>
          <p className='date_text'>{getMonthText(veri.wdata.data[0].datetime) + " " + new Date(veri.wdata.data[0].datetime).getDate() + ", " + new Date(veri.wdata.data[0].datetime).getFullYear() }</p>
          <div className='currentWeatherIconCover'>

              {/* <img className='crwhicon' src={"../icons/" + veri.wdata.data[0].weather.icon + ".png"}/> */}
              <img className='currentWeatherIcon' src={require(`../icons/${veri.wdata.data[0].weather.icon}.png`)}/>


              <p className='currentWeatherIconText'>{veri.wdata.data[0].weather.description}</p>
          </div>
      </div>


      <div className='rightSide'>
          <p className='current_temprature'>{veri.wdata.data[0].temp}<span className='degreesymbolcurrent'>&deg;</span></p>
          <p className='max_min'> <span className='max_temp'>{veri.wdata.data[0].max_temp}<span className='degreesymbol'>&deg;</span></span>/<span className='min_temp'>{veri.wdata.data[0].min_temp}<span className='degreesymbol'>&deg;</span></span> </p>
      </div>

    </div>
  )
}

export default CurrentWeather