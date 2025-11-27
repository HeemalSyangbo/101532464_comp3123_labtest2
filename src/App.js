import React, { useEffect, useState } from 'react';
import WeatherSearch from './components/WeatherSearch';
import WeatherCard from './components/WeatherCard';
import { fetchWeatherByCity } from './services/weatherApi';
import './index.css';

function App() {
  const [city, setCity] = useState('Toronto');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadWeather = async () => {
    if (!city) return;

    try {
      setLoading(true);
      setError('');
      const data = await fetchWeatherByCity(city);
      setWeather(data);
    } catch (err) {
      console.error(err);
      setError('Could not fetch weather. Please try another city.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app-root">
      <div className="weather-shell">
        <h1 className="weather-title">Weather Forecast</h1>

        <div className="weather-search-bar">
          <WeatherSearch
            city={city}
            onCityChange={setCity}
            onSearch={loadWeather}
          />
        </div>

        <WeatherCard weather={weather} loading={loading} error={error} />
      </div>
    </div>
  );
}

export default App;
