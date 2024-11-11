import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { ForecastCard } from './components/ForecastCard';
import { BookmarkList } from './components/BookmarkList';
import { getWeatherByCity, getForecastByCity, getWeatherByCoords, getForecastByCoords } from './utils/api';
import type { WeatherData, ForecastData, TemperatureUnit } from './types/weather';
import { MapPin } from 'lucide-react';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<TemperatureUnit>('celsius');
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem('weatherBookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  const getBackgroundGradient = () => {
    if (!weatherData) return 'bg-gradient-to-br from-blue-900 to-purple-900';
    
    const condition = weatherData.weather[0].main.toLowerCase();
    const isNight = Date.now() / 1000 > weatherData.sys.sunset || Date.now() / 1000 < weatherData.sys.sunrise;

    if (isNight) return 'bg-gradient-to-br from-blue-900 to-purple-900';
    
    switch (condition) {
      case 'clear':
        return 'bg-gradient-to-br from-blue-400 to-cyan-300';
      case 'rain':
        return 'bg-gradient-to-br from-blue-700 to-blue-900';
      case 'clouds':
        return 'bg-gradient-to-br from-gray-400 to-gray-600';
      default:
        return 'bg-gradient-to-br from-blue-500 to-purple-600';
    }
  };

  useEffect(() => {
    localStorage.setItem('weatherBookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              setLoading(true);
              const [weather, forecast] = await Promise.all([
                getWeatherByCoords(position.coords.latitude, position.coords.longitude),
                getForecastByCoords(position.coords.latitude, position.coords.longitude)
              ]);
              setWeatherData(weather);
              setForecastData(forecast);
            } catch (err) {
              setError('Failed to fetch weather data for your location.');
            } finally {
              setLoading(false);
            }
          },
          () => {
            setError('Location access denied. Please search for a city manually.');
          }
        );
      }
    };

    getUserLocation();
  }, []);

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const [weather, forecast] = await Promise.all([
        getWeatherByCity(city),
        getForecastByCity(city)
      ]);
      setWeatherData(weather);
      setForecastData(forecast);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleUnit = () => {
    setUnit(prev => prev === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  const toggleBookmark = (city: string) => {
    setBookmarks(prev => {
      if (prev.includes(city)) {
        return prev.filter(b => b !== city);
      }
      return [...prev, city];
    });
  };

  return (
    <div className={`min-h-screen ${getBackgroundGradient()} transition-colors duration-500`}>
      <div className="container mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white text-center mb-8"
        >
          Weather Forecast
        </motion.h1>

        <div className="space-y-4 mb-8">
          <SearchBar
            onSearch={handleSearch}
            onBookmark={toggleBookmark}
            isBookmarked={weatherData ? bookmarks.includes(weatherData.name) : false}
            currentCity={weatherData?.name || null}
          />
          
          <BookmarkList
            bookmarks={bookmarks}
            onSelectBookmark={handleSearch}
            onRemoveBookmark={toggleBookmark}
          />
        </div>

        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center mt-8"
            >
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-300 text-center mt-4"
            >
              {error}
            </motion.div>
          )}

          {weatherData && (
            <div className="mt-8 space-y-8">
              <WeatherCard
                data={weatherData}
                unit={unit}
                onUnitToggle={toggleUnit}
              />

              {forecastData && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="overflow-x-auto pb-4"
                >
                  <div className="flex gap-4 justify-between min-w-max">
                    {forecastData.list
                      .filter((_, index) => index % 8 === 0)
                      .slice(0, 5)
                      .map((forecast, index) => (
                        <ForecastCard
                          key={forecast.dt}
                          date={forecast.dt}
                          temp={forecast.main.temp}
                          condition={forecast.weather[0].main}
                          unit={unit}
                        />
                      ))}
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;