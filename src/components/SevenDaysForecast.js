import './sevendaysforecast.css';
import {WeatherDataContext} from './UserContext';
import {useContext} from 'react';


function getDayText(dateString){
  let number = new Date(dateString).getDay();
  // console.log(number);
  switch(number){
    case 0:
      return "Sun";
    case 1:
      return "Mon";
    case 2:
      return "Tue";
    case 3:
      return "Wed";
    case 4:
      return "Thu";
    case 5:
      return "Fri";
    case 6:
      return "Sat";
    default:
      return "NaD";
  }


}

function SevenDaysForecast() {

  let veri = useContext(WeatherDataContext);

  // console.log("xxxxxxxxxxxxxxx ", veri.wdata.data[0].datetime);
  return (
    <div className='sdfCover'>
      <div className='sdfHeaderArea'> <span className='sdfHeaderText'>Weekly Forecast</span> </div>



      <div className='sdfCardsCover'>
      <div className='sdfCardsArea1'>
          {veri.wdata.data.map((item, index)=>{return index < 4 && <div className='sdfCard' key={index}>
            <p className='sdfCardDayofWeek'>{getDayText(item.datetime)}</p> 
            <img className='sdfCardIcon' src={require(`../icons/${item.weather.icon}.png`)}/>  
            <p className='tempMaxMin'><span className='temp_max'>{item.max_temp}&deg;</span><span className='temp_min'>{item.min_temp}&deg;</span></p>
            </div>})}
      </div>

      <div className='sdfCardsArea2'>
          {veri.wdata.data.map((item, index)=>{return index > 3 && index < 8 && <div className='sdfCard' key={index}>
            <p className='sdfCardDayofWeek'>{getDayText(item.datetime)}</p> 
            <img className='sdfCardIcon' src={require(`../icons/${item.weather.icon}.png`)}/>  
            <p className='tempMaxMin'><span className='temp_max'>{item.max_temp}&deg;</span><span className='temp_min'>{item.min_temp}&deg;</span></p>
            </div>})}
      </div>
      </div>


    </div>
  )
}

export default SevenDaysForecast