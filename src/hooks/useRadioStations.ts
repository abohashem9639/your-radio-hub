import { useState, useEffect, useCallback } from "react";
import { RadioStation, SAMPLE_STATIONS } from "@/data/stations";

const LOCAL_STORAGE_KEY = "radio-stations";
const AUTH_MODE_KEY = "radio-auth-mode";

export type AuthMode = "guest" | "account" | null;

export function useRadioStations() {
  const [stations, setStations] = useState<RadioStation[]>([]);
  const [authMode, setAuthMode] = useState<AuthMode>(null);
  const [currentStation, setCurrentStation] = useState<RadioStation | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Load auth mode and stations
  useEffect(() => {
    const savedMode = localStorage.getItem(AUTH_MODE_KEY) as AuthMode;
    if (savedMode) {
      setAuthMode(savedMode);
    }

    const savedStations = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedStations) {
      try {
        setStations(JSON.parse(savedStations));
      } catch {
        setStations(SAMPLE_STATIONS);
      }
    } else {
      setStations(SAMPLE_STATIONS);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(SAMPLE_STATIONS));
    }
  }, []);

  const saveStations = useCallback((newStations: RadioStation[]) => {
    setStations(newStations);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newStations));
  }, []);

  const addStation = useCallback((station: Omit<RadioStation, "id" | "isUserAdded">) => {
    const newStation: RadioStation = {
      ...station,
      id: crypto.randomUUID(),
      isUserAdded: true,
    };
    saveStations([...stations, newStation]);
    return newStation;
  }, [stations, saveStations]);

  const removeStation = useCallback((id: string) => {
    saveStations(stations.filter((s) => s.id !== id));
    if (currentStation?.id === id) {
      setCurrentStation(null);
      setIsPlaying(false);
    }
  }, [stations, saveStations, currentStation]);

  const playStation = useCallback((station: RadioStation) => {
    if (currentStation?.id === station.id && isPlaying) {
      setIsPlaying(false);
    } else {
      setCurrentStation(station);
      setIsPlaying(true);
    }
  }, [currentStation, isPlaying]);

  const chooseAuthMode = useCallback((mode: AuthMode) => {
    setAuthMode(mode);
    if (mode) {
      localStorage.setItem(AUTH_MODE_KEY, mode);
    }
  }, []);

  return {
    stations,
    authMode,
    currentStation,
    isPlaying,
    addStation,
    removeStation,
    playStation,
    setIsPlaying,
    chooseAuthMode,
  };
}
