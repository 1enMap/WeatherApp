import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { WeatherIcon } from './WeatherIcon';
import type { TemperatureUnit } from '../types/weather';

interface ForecastCardProps {
  date: number;
  temp: number;
  condition: string;
  unit: TemperatureUnit;
}

const convertTemp = (temp: number, unit: TemperatureUnit) => {
  if (unit === 'fahrenheit') {
    return ((temp * 9/5) + 32).toFixed(1);
  }
  return temp.toFixed(1);
};

export const ForecastCard = ({ date, temp, condition, unit }: ForecastCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center p-4 bg-white/5 backdrop-blur-sm rounded-lg"
    >
      <p className="text-sm text-white/80 mb-2">
        {format(date * 1000, 'EEE')}
      </p>
      <WeatherIcon condition={condition} className="w-8 h-8 mb-2" />
      <p className="text-lg font-semibold text-white">
        {convertTemp(temp, unit)}°
      </p>
    </motion.div>
  );
};