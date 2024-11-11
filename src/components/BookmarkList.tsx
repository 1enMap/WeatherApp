import { motion, AnimatePresence } from 'framer-motion';
import { Star, X } from 'lucide-react';

interface BookmarkListProps {
  bookmarks: string[];
  onSelectBookmark: (city: string) => void;
  onRemoveBookmark: (city: string) => void;
}

export const BookmarkList = ({ bookmarks, onSelectBookmark, onRemoveBookmark }: BookmarkListProps) => {
  if (bookmarks.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
    >
      <AnimatePresence>
        {bookmarks.map((city) => (
          <motion.div
            key={city}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full"
          >
            <Star className="w-4 h-4 text-yellow-300" />
            <button
              onClick={() => onSelectBookmark(city)}
              className="text-sm text-white hover:text-white/80"
            >
              {city}
            </button>
            <button
              onClick={() => onRemoveBookmark(city)}
              className="p-0.5 hover:bg-white/10 rounded-full"
            >
              <X className="w-3 h-3 text-white/70" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};