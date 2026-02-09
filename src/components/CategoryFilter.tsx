import { motion } from "framer-motion";
import { CATEGORIES } from "@/data/stations";

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => (
        <motion.button
          key={cat.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(cat.id)}
          className={`
            px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
            ${
              activeCategory === cat.id
                ? "bg-primary text-primary-foreground glow-primary"
                : "bg-secondary text-secondary-foreground hover:bg-surface-hover"
            }
          `}
        >
          <span className="mr-1.5">{cat.icon}</span>
          {cat.label}
        </motion.button>
      ))}
    </div>
  );
}
