import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { WeatherIcon } from './WeatherIcon';
import { Droplets, Wind, Sunrise, Sunset } from 'lucide-react';
import type { WeatherData, TemperatureUnit } from '../types/weather';

interface WeatherCardProps {
  data: WeatherData;
  unit: TemperatureUnit;
  onUnitToggle: () => void;
}

const convertTemp = (temp: number, unit: TemperatureUnit) => {
  if (unit === 'fahrenheit') {
    return ((temp * 9/5) + 32).toFixed(1);
  }
  return temp.toFixed(1);
};

export const WeatherCard = ({ data, unit, onUnitToggle }: WeatherCardProps) => {
  const isNight = Date.now() / 1000 > data.sys.sunset || Date.now() / 1000 < data.sys.sunrise;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-xl p-6 text-white shadow-lg border border-white/20"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-3xl font-bold">{data.name}</h2>
          <p className="text-lg opacity-80">{data.weather[0].description}</p>
        </div>
        <WeatherIcon condition={data.weather[0].main} isNight={isNight} />
      </div>

      <div className="flex justify-between items-center mb-8">
        <div className="text-6xl font-bold">
          {convertTemp(data.main.temp, unit)}°
          <button
            onClick={onUnitToggle}
            className="text-sm ml-2 opacity-80 hover:opacity-100"
          >
            {unit === 'celsius' ? 'C' : 'F'}
          </button>
        </div>
        <div className="text-right">
          <p className="text-sm opacity-80">Feels like</p>
          <p className="text-2xl">{convertTemp(data.main.feels_like, unit)}°</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2 bg-white/5 rounded-lg p-3">
          <Droplets className="w-5 h-5 text-blue-300" />
          <div>
            <p className="text-sm opacity-80">Humidity</p>
            <p className="text-lg">{data.main.humidity}%</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/5 rounded-lg p-3">
          <Wind className="w-5 h-5 text-blue-300" />
          <div>
            <p className="text-sm opacity-80">Wind Speed</p>
            <p className="text-lg">{data.wind.speed} m/s</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/5 rounded-lg p-3">
          <Sunrise className="w-5 h-5 text-yellow-300" />
          <div>
            <p className="text-sm opacity-80">Sunrise</p>
            <p className="text-lg">{format(data.sys.sunrise * 1000, 'HH:mm')}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/5 rounded-lg p-3">
          <Sunset className="w-5 h-5 text-orange-300" />
          <div>
            <p className="text-sm opacity-80">Sunset</p>
            <p className="text-lg">{format(data.sys.sunset * 1000, 'HH:mm')}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};