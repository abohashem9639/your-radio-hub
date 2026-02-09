import { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { Radio, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRadioStations } from "@/hooks/useRadioStations";
import { CategoryFilter } from "@/components/CategoryFilter";
import { RadioCard } from "@/components/RadioCard";
import { AddChannelCard } from "@/components/AddChannelCard";
import { AddChannelDialog } from "@/components/AddChannelDialog";
import { RadioPlayer } from "@/components/RadioPlayer";
import { AuthPrompt } from "@/components/AuthPrompt";

const Index = () => {
  const {
    stations,
    authMode,
    currentStation,
    isPlaying,
    addStation,
    removeStation,
    playStation,
    setIsPlaying,
    chooseAuthMode,
  } = useRadioStations();

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const filteredStations = useMemo(() => {
    return stations.filter((s) => {
      const matchesCategory = activeCategory === "all" || s.category === activeCategory;
      const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.country.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [stations, activeCategory, searchQuery]);

  if (!authMode) {
    return <AuthPrompt onChoose={chooseAuthMode} />;
  }

  return (
    <div className="min-h-screen gradient-mesh pb-24">
      {/* Header */}
      <header className="border-b border-border glass sticky top-0 z-40">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Radio className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-xl font-bold text-foreground">MyRadio</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full">
              {authMode === "guest" ? "Guest Mode" : "Account"}
            </span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container max-w-6xl mx-auto px-4 py-8">
        {/* Search and filters */}
        <div className="space-y-4 mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search stations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>
          <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        </div>

        {/* Station grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredStations.map((station) => (
              <RadioCard
                key={station.id}
                station={station}
                isPlaying={isPlaying}
                isCurrent={currentStation?.id === station.id}
                onPlay={() => playStation(station)}
                onRemove={() => removeStation(station.id)}
              />
            ))}
          </AnimatePresence>
          <AddChannelCard onClick={() => setAddDialogOpen(true)} />
        </div>

        {filteredStations.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No stations found. Try a different filter or add a new one!</p>
          </div>
        )}
      </main>

      {/* Add Dialog */}
      <AddChannelDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onAdd={addStation}
      />

      {/* Player */}
      <RadioPlayer
        station={currentStation}
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onClose={() => {
          setIsPlaying(false);
        }}
      />
    </div>
  );
};

export default Index;
