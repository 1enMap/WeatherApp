import { useState } from 'react';
import { Search, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onBookmark: (city: string) => void;
  isBookmarked: boolean;
  currentCity: string | null;
}

export const SearchBar = ({ onSearch, onBookmark, isBookmarked, currentCity }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-md mx-auto"
    >
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search city..."
          className="w-full px-4 py-2 pl-10 pr-12 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-white/70"
        />
        <Search className="absolute left-3 top-2.5 w-5 h-5 text-white/70" />
        {currentCity && (
          <button
            type="button"
            onClick={() => onBookmark(currentCity)}
            className="absolute right-3 top-2.5"
          >
            <Star
              className={`w-5 h-5 ${
                isBookmarked ? 'text-yellow-300 fill-yellow-300' : 'text-white/70'
              }`}
            />
          </button>
        )}
      </form>
    </motion.div>
  );
};