import React from 'react';

function WeatherCard({ weather, loading, error }) {
  if (loading) {
    return (
      <p style={{ color: '#fff', marginTop: '1rem' }}>
        Loading weather...
      </p>
    );
  }

  if (error) {
    return (
      <p style={{ color: 'salmon', marginTop: '1rem' }}>
        {error}
      </p>
    );
  }

  if (!weather) {
    return (
      <p style={{ color: '#fff', marginTop: '1rem' }}>
        Search for a city to see the weather.
      </p>
    );
  }

  const {
    name,
    sys,
    main,
    weather: weatherDetails,
    wind,
    dt,
    visibility,
  } = weather;

  const condition = weatherDetails && weatherDetails[0];
  const iconUrl = condition
    ? `https://openweathermap.org/img/wn/${condition.icon}@2x.png`
    : '';

  // Day + date
  const dateObj = new Date(dt * 1000);
  const weekday = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
  const dateText = dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  const updatedAt = dateObj.toLocaleTimeString('en-CA', {
    hour: '2-digit',
    minute: '2-digit',
  });

  // Sunrise / Sunset
  const sunrise =
    sys?.sunrise &&
    new Date(sys.sunrise * 1000).toLocaleTimeString('en-CA', {
      hour: '2-digit',
      minute: '2-digit',
    });

  const sunset =
    sys?.sunset &&
    new Date(sys.sunset * 1000).toLocaleTimeString('en-CA', {
      hour: '2-digit',
      minute: '2-digit',
    });

  // Visibility in km
  const visibilityKm =
    typeof visibility === 'number'
      ? (visibility / 1000).toFixed(1)
      : null;

  // Wind direction → compass
  const degToCompass = (deg) => {
    if (typeof deg !== 'number') return null;
    const directions = [
      'N',
      'NNE',
      'NE',
      'ENE',
      'E',
      'ESE',
      'SE',
      'SSE',
      'S',
      'SSW',
      'SW',
      'WSW',
      'W',
      'WNW',
      'NW',
      'NNW',
    ];
    const index = Math.round(deg / 22.5) % 16;
    return directions[index];
  };

  const windDir = degToCompass(wind?.deg);

  // Simple 4-day “preview” forecast (mock, based on today)
  const MS_PER_DAY = 24 * 60 * 60 * 1000;
  const forecast = Array.from({ length: 4 }, (_, i) => {
    const d = new Date(dt * 1000 + (i + 1) * MS_PER_DAY);
    return {
      weekday: d.toLocaleDateString('en-US', { weekday: 'short' }),
      temp: Math.round(main?.temp + (i - 1) * 2),
    };
  });

  return (
    <div className="weather-card">
      {/* Left big panel */}
      <div className="weather-left">
        <div className="weather-left-top">
          <div className="weather-day">{weekday}</div>
          <div className="weather-date">{dateText}</div>
          <div className="weather-location">
            {name}, {sys?.country}
          </div>

          <div className="weather-temp">
            {Math.round(main?.temp)}°C
          </div>
          <div className="weather-condition">
            {condition?.main} &bull; {condition?.description}
          </div>

          {iconUrl && (
            <div className="weather-icon">
              <img src={iconUrl} alt={condition?.description} />
            </div>
          )}
        </div>

        <div className="weather-updated">
          Updated at {updatedAt}
        </div>
      </div>

      {/* Right side – details + extras + mini forecast */}
      <div className="weather-right">
        <div>
          <div className="weather-right-title">Today&apos;s details</div>
          <div className="weather-metrics">
            <div>
              <div className="metric-label">Feels like</div>
              <div className="metric-value">
                {Math.round(main?.feels_like)}°C
              </div>
            </div>

            <div>
              <div className="metric-label">Humidity</div>
              <div className="metric-value">{main?.humidity}%</div>
            </div>

            <div>
              <div className="metric-label">Min temp</div>
              <div className="metric-value">
                {Math.round(main?.temp_min)}°C
              </div>
            </div>

            <div>
              <div className="metric-label">Max temp</div>
              <div className="metric-value">
                {Math.round(main?.temp_max)}°C
              </div>
            </div>

            <div>
              <div className="metric-label">Pressure</div>
              <div className="metric-value">{main?.pressure} hPa</div>
            </div>

            <div>
              <div className="metric-label">Wind</div>
              <div className="metric-value">
                {wind?.speed} m/s {windDir ? `(${windDir})` : ''}
              </div>
            </div>

            {visibilityKm && (
              <div>
                <div className="metric-label">Visibility</div>
                <div className="metric-value">{visibilityKm} km</div>
              </div>
            )}

            {sunrise && (
              <div>
                <div className="metric-label">Sunrise</div>
                <div className="metric-value">{sunrise}</div>
              </div>
            )}

            {sunset && (
              <div>
                <div className="metric-label">Sunset</div>
                <div className="metric-value">{sunset}</div>
              </div>
            )}
          </div>
        </div>

        {/* Mini 4-day forecast bar */}
        <div className="forecast-row">
          {forecast.map((day) => (
            <div key={day.weekday} className="forecast-item">
              <div className="forecast-day">{day.weekday}</div>
              <div className="forecast-temp">{day.temp}°C</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
