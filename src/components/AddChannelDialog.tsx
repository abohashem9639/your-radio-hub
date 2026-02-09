import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CATEGORIES, COUNTRIES, SAMPLE_STATIONS, RadioStation } from "@/data/stations";
import { Radio, Search } from "lucide-react";

interface AddChannelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (station: Omit<RadioStation, "id" | "isUserAdded">) => void;
}

export function AddChannelDialog({ open, onOpenChange, onAdd }: AddChannelDialogProps) {
  const [mode, setMode] = useState<"browse" | "custom">("browse");
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [streamUrl, setStreamUrl] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");

  const filteredStations = SAMPLE_STATIONS.filter(
    (s) => s.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddCustom = () => {
    if (!name || !streamUrl || !category || !country) return;
    onAdd({ name, streamUrl, logoUrl, category, country });
    resetForm();
    onOpenChange(false);
  };

  const handleAddFromDB = (station: RadioStation) => {
    onAdd({
      name: station.name,
      streamUrl: station.streamUrl,
      logoUrl: station.logoUrl,
      category: station.category,
      country: station.country,
    });
    onOpenChange(false);
  };

  const resetForm = () => {
    setName("");
    setStreamUrl("");
    setLogoUrl("");
    setCategory("");
    setCountry("");
    setSearch("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-popover border-border max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-foreground flex items-center gap-2">
            <Radio className="w-5 h-5 text-primary" />
            Add Channel
          </DialogTitle>
        </DialogHeader>

        {/* Mode toggle */}
        <div className="flex gap-2 mb-4">
          <Button
            variant={mode === "browse" ? "default" : "secondary"}
            size="sm"
            onClick={() => setMode("browse")}
            className="flex-1"
          >
            Browse Stations
          </Button>
          <Button
            variant={mode === "custom" ? "default" : "secondary"}
            size="sm"
            onClick={() => setMode("custom")}
            className="flex-1"
          >
            Add Custom
          </Button>
        </div>

        {mode === "browse" ? (
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search stations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-input border-border"
              />
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {filteredStations.map((station) => (
                <button
                  key={station.id}
                  onClick={() => handleAddFromDB(station)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg bg-secondary hover:bg-surface-hover transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center overflow-hidden shrink-0">
                    {station.logoUrl ? (
                      <img src={station.logoUrl} alt="" className="w-full h-full object-contain p-1" />
                    ) : (
                      <span className="text-sm font-bold text-muted-foreground">{station.name[0]}</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{station.name}</p>
                    <p className="text-xs text-muted-foreground">{station.country} · {station.category}</p>
                  </div>
                </button>
              ))}
              {filteredStations.length === 0 && (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No stations found. Try adding a custom one!
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <Label className="text-foreground">Station Name</Label>
              <Input
                placeholder="e.g. My Radio Station"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1.5 bg-input border-border"
              />
            </div>
            <div>
              <Label className="text-foreground">Stream URL</Label>
              <Input
                placeholder="https://stream.example.com/radio.mp3"
                value={streamUrl}
                onChange={(e) => setStreamUrl(e.target.value)}
                className="mt-1.5 bg-input border-border"
              />
            </div>
            <div>
              <Label className="text-foreground">Logo URL (optional)</Label>
              <Input
                placeholder="https://example.com/logo.png"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                className="mt-1.5 bg-input border-border"
              />
            </div>
            <div>
              <Label className="text-foreground">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="mt-1.5 bg-input border-border">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.icon} {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-foreground">Country</Label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger className="mt-1.5 bg-input border-border">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {COUNTRIES.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleAddCustom}
              disabled={!name || !streamUrl || !category || !country}
              className="w-full"
            >
              Add Station
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
