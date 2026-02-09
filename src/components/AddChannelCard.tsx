import { motion } from "framer-motion";
import { Plus } from "lucide-react";

interface AddChannelCardProps {
  onClick: () => void;
}

export function AddChannelCard({ onClick }: AddChannelCardProps) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="bg-card/50 border-2 border-dashed border-border hover:border-primary/50 rounded-xl flex flex-col items-center justify-center gap-3 aspect-[1/1.25] transition-all duration-300 group"
    >
      <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
        <Plus className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
      <span className="text-sm text-muted-foreground group-hover:text-foreground font-medium transition-colors">
        Add Channel
      </span>
    </motion.button>
  );
}
