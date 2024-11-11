import { motion } from 'framer-motion';
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  Moon,
} from 'lucide-react';

interface WeatherIconProps {
  condition: string;
  isNight?: boolean;
  className?: string;
}

export const WeatherIcon = ({ condition, isNight, className = "" }: WeatherIconProps) => {
  const getIcon = () => {
    if (isNight && (condition === 'Clear' || condition === 'Clouds')) {
      return Moon;
    }

    switch (condition) {
      case 'Clear':
        return Sun;
      case 'Clouds':
        return Cloud;
      case 'Rain':
        return CloudRain;
      case 'Snow':
        return CloudSnow;
      case 'Thunderstorm':
        return CloudLightning;
      case 'Drizzle':
        return CloudDrizzle;
      default:
        return Cloud;
    }
  };

  const Icon = getIcon();

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <Icon className={`w-12 h-12 ${className}`} />
    </motion.div>
  );
};