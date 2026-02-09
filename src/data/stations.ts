export type Category = {
  id: string;
  label: string;
  icon: string;
};

export type RadioStation = {
  id: string;
  name: string;
  streamUrl: string;
  logoUrl: string;
  category: string;
  country: string;
  isUserAdded?: boolean;
};

export const CATEGORIES: Category[] = [
  { id: "all", label: "All", icon: "📻" },
  { id: "music", label: "Music", icon: "🎵" },
  { id: "news", label: "News", icon: "📰" },
  { id: "talk", label: "Talk", icon: "🎙️" },
  { id: "sports", label: "Sports", icon: "⚽" },
  { id: "culture", label: "Culture", icon: "🎭" },
  { id: "religious", label: "Religious", icon: "🕌" },
  { id: "mixed", label: "Mixed", icon: "🔀" },
];

export const COUNTRIES = [
  "United Kingdom", "United States", "Lebanon", "Jordan", "Egypt",
  "Saudi Arabia", "UAE", "France", "Germany", "Spain",
  "Turkey", "Iraq", "Syria", "Palestine", "Morocco",
  "Tunisia", "Algeria", "Kuwait", "Qatar", "Bahrain",
];

export const SAMPLE_STATIONS: RadioStation[] = [
  {
    id: "1",
    name: "BBC Radio 1",
    streamUrl: "https://stream.live.vc.bbcmedia.co.uk/bbc_radio_one",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/BBC_Radio_1.svg/800px-BBC_Radio_1.svg.png",
    category: "music",
    country: "United Kingdom",
  },
  {
    id: "2",
    name: "Capital FM",
    streamUrl: "https://media-ice.musicradio.com/CapitalMP3",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Capital_London_logo.svg/800px-Capital_London_logo.svg.png",
    category: "music",
    country: "United Kingdom",
  },
  {
    id: "3",
    name: "Classic FM",
    streamUrl: "https://media-ice.musicradio.com/ClassicFMMP3",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/Classic_FM_UK.svg/800px-Classic_FM_UK.svg.png",
    category: "music",
    country: "United Kingdom",
  },
  {
    id: "4",
    name: "LBC",
    streamUrl: "https://media-ice.musicradio.com/LBCUKMP3",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/LBC_logo_%282020%29.svg/800px-LBC_logo_%282020%29.svg.png",
    category: "talk",
    country: "United Kingdom",
  },
  {
    id: "5",
    name: "Sky News",
    streamUrl: "https://video.foxstreaming.com/skynews/skynews.mp3",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/7/74/Sky_News_2021.svg/800px-Sky_News_2021.svg.png",
    category: "news",
    country: "United Kingdom",
  },
  {
    id: "6",
    name: "talkSPORT",
    streamUrl: "https://radio.talksport.com/stream",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/1/13/TalkSPORT_logo.svg/800px-TalkSPORT_logo.svg.png",
    category: "sports",
    country: "United Kingdom",
  },
];
