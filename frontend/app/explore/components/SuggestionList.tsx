import { motion, AnimatePresence } from "framer-motion";

interface Suggestion {
  title: string;
}

interface SuggestionListProps {
  suggestions: Suggestion[];
}

export const SuggestionList = ({ suggestions }: SuggestionListProps) => {
  return (
    <AnimatePresence>
      {suggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700"
        >
          <h3 className="text-sm font-medium text-gray-300 mb-3">
            検索結果
          </h3>
          <ul className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-sm text-gray-400 hover:text-white hover:bg-gray-700/50 p-2 rounded-lg cursor-pointer transition-colors"
              >
                {suggestion.title}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 