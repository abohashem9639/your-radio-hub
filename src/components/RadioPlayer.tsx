import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, X } from "lucide-react";
import { RadioStation } from "@/data/stations";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface RadioPlayerProps {
  station: RadioStation | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onClose: () => void;
}

export function RadioPlayer({ station, isPlaying, onPlayPause, onClose }: RadioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!station) return;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }

    const audio = new Audio(station.streamUrl);
    audio.volume = isMuted ? 0 : volume / 100;
    audioRef.current = audio;

    if (isPlaying) {
      audio.play().catch(() => {});
    }

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [station?.id]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : volume / 100;
  }, [volume, isMuted]);

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {station && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border"
          style={{ background: "hsl(var(--player-bg) / 0.95)" }}
        >
          <div className="container max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
            {/* Station info */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center overflow-hidden shrink-0">
                {station.logoUrl ? (
                  <img src={station.logoUrl} alt="" className="w-full h-full object-contain p-1" />
                ) : (
                  <span className="text-lg font-bold text-muted-foreground">{station.name[0]}</span>
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{station.name}</p>
                <p className="text-xs text-muted-foreground">{station.country}</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={onPlayPause}
                className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:opacity-90 transition-opacity glow-primary"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-primary-foreground" />
                ) : (
                  <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
                )}
              </button>
            </div>

            {/* Volume */}
            <div className="hidden sm:flex items-center gap-2 w-32">
              <button onClick={() => setIsMuted(!isMuted)} className="text-muted-foreground hover:text-foreground transition-colors">
                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <Slider
                value={[isMuted ? 0 : volume]}
                onValueChange={([v]) => {
                  setVolume(v);
                  setIsMuted(false);
                }}
                max={100}
                step={1}
                className="flex-1"
              />
            </div>

            {/* Close */}
            <button onClick={handleClose} className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
