import { motion } from "framer-motion";
import { Play, Pause, Trash2 } from "lucide-react";
import { RadioStation } from "@/data/stations";

interface RadioCardProps {
  station: RadioStation;
  isPlaying: boolean;
  isCurrent: boolean;
  onPlay: () => void;
  onRemove?: () => void;
}

export function RadioCard({ station, isPlaying, isCurrent, onPlay, onRemove }: RadioCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`
        group relative bg-card rounded-xl overflow-hidden card-hover cursor-pointer border
        ${isCurrent && isPlaying ? "border-primary playing-pulse" : "border-border hover:border-primary/40"}
      `}
      onClick={onPlay}
    >
      {/* Logo */}
      <div className="aspect-square bg-secondary flex items-center justify-center p-6 relative overflow-hidden">
        {station.logoUrl ? (
          <img
            src={station.logoUrl}
            alt={station.name}
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
              (e.target as HTMLImageElement).nextElementSibling?.classList.remove("hidden");
            }}
          />
        ) : null}
        <div className={`${station.logoUrl ? "hidden" : ""} text-4xl font-bold text-muted-foreground`}>
          {station.name.charAt(0)}
        </div>

        {/* Play overlay */}
        <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center glow-primary">
            {isCurrent && isPlaying ? (
              <Pause className="w-6 h-6 text-primary-foreground" />
            ) : (
              <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
            )}
          </div>
        </div>

        {/* Equalizer indicator */}
        {isCurrent && isPlaying && (
          <div className="absolute top-3 right-3 flex items-end gap-0.5 h-4">
            <div className="w-1 bg-primary rounded-full equalizer-bar" />
            <div className="w-1 bg-primary rounded-full equalizer-bar" />
            <div className="w-1 bg-primary rounded-full equalizer-bar" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-card-foreground truncate text-sm">{station.name}</h3>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-muted-foreground">{station.country}</span>
          <span className="text-xs text-primary/80 capitalize">{station.category}</span>
        </div>
      </div>

      {/* Remove button */}
      {onRemove && station.isUserAdded && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute top-2 left-2 w-7 h-7 rounded-full bg-destructive/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive"
        >
          <Trash2 className="w-3.5 h-3.5 text-destructive-foreground" />
        </button>
      )}
    </motion.div>
  );
}
