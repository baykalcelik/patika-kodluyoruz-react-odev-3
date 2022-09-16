import './App.css';
import WeatherApp from './components/WeatherApp';
import { WeatherAppDataProvider } from  './components/UserContext';


function App() {
  return (
    <WeatherAppDataProvider>
        <WeatherApp />
    </WeatherAppDataProvider>

  );
}

export default App;
