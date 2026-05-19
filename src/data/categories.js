// =============================================
// data/categories.js
// Alle möglichen Kategorien für Länderbingo
// =============================================

export const ALL_CATEGORIES = [
  // ── BESTEHENDE KATEGORIEN ─────────────────
  {
    id: "olympic100",
    icon: "🏅",
    label: "100+ Olympia-Medaillen",
    check: c => c.olympicMedals >= 100,
  },
  {
    id: "temp25",
    icon: "🌡️",
    label: "Ø-Temp über 25°C",
    check: c => c.avgTemp > 25,
  },
  {
    id: "pop100m",
    icon: "👥",
    label: "100+ Mio. Einwohner",
    check: c => c.population >= 100,
  },
  {
    id: "peak5000",
    icon: "🏔️",
    label: "Berg über 5000 m",
    check: c => c.highestPeak > 5000,
  },
  {
    id: "landlocked",
    icon: "🔒",
    label: "Kein Meereszugang",
    check: c => c.landlocked,
  },
  {
    id: "euMember",
    icon: "🇪🇺",
    label: "EU-Mitglied",
    check: c => c.euMember,
  },
  {
    id: "gdp40k",
    icon: "💰",
    label: "BIP/Kopf über $40.000",
    check: c => c.gdpPerCapita >= 40000,
  },
  {
    id: "worldCup",
    icon: "🏆",
    label: "Fußball-Weltmeister",
    check: c => c.worldCupWinner,
  },
  {
    id: "island",
    icon: "🏝️",
    label: "Inselstaat",
    check: c => c.isIsland,
  },
  {
    id: "area1m",
    icon: "📏",
    label: "Fläche über 1 Mio. km²",
    check: c => c.area >= 1000000,
  },
  {
    id: "africa",
    icon: "🌍",
    label: "In Afrika",
    check: c => c.continent === "Africa",
  },
  {
    id: "southAmerica",
    icon: "🗺️",
    label: "In Südamerika",
    check: c => c.continent === "South America",
  },
  {
    id: "literacy99",
    icon: "🎓",
    label: "Alphabetisierung 99%+",
    check: c => c.literacy >= 99,
  },
  {
    id: "equator",
    icon: "🌴",
    label: "Nahe Äquator (<10°)",
    check: c => c.equatorNear,
  },
  {
    id: "nuclear",
    icon: "⚛️",
    label: "Atommacht",
    check: c => c.nuclearPower,
  },
  {
    id: "elephants",
    icon: "🐘",
    label: "Freilebende Elefanten",
    check: c => c.wildElephants,
  },
  {
    id: "g7",
    icon: "🤝",
    label: "G7-Mitglied",
    check: c => c.g7Member,
  },
  {
    id: "alpine",
    icon: "⛷️",
    label: "An den Alpen gelegen",
    check: c => c.alpineCountry,
  },
  {
    id: "mediterranean",
    icon: "☀️",
    label: "Mittelmeeranrainer",
    check: c => c.mediterranean,
  },
  {
    id: "pop5m",
    icon: "🔬",
    label: "Unter 5 Mio. Einwohner",
    check: c => c.population < 5,
  },
  {
    id: "gdpLow",
    icon: "📉",
    label: "BIP/Kopf unter $2.000",
    check: c => c.gdpPerCapita < 2000,
  },
  {
    id: "asia",
    icon: "🏯",
    label: "In Asien",
    check: c => c.continent === "Asia",
  },
  {
    id: "tempCold",
    icon: "🧊",
    label: "Ø-Temp unter 5°C",
    check: c => c.avgTemp < 5,
  },
  {
    id: "olympic500",
    icon: "🥇",
    label: "500+ Olympia-Medaillen",
    check: c => c.olympicMedals >= 500,
  },

  // ── NEUE KATEGORIEN (20) ──────────────────

  // LEICHT
  {
    id: "europe",
    icon: "🏰",
    label: "In Europa",
    check: c => c.continent === "Europe",
  },
  {
    id: "northAmerica",
    icon: "🗽",
    label: "In Nordamerika",
    check: c => c.continent === "North America",
  },
  {
    id: "monarchy",
    icon: "👑",
    label: "Monarchie",
    check: c => c.isMonarchy,
  },
  {
    id: "nato",
    icon: "🛡️",
    label: "NATO-Mitglied",
    check: c => c.natoMember,
  },
  {
    id: "desert",
    icon: "🏜️",
    label: "Wüste im Land",
    check: c => c.hasDesert,
  },
  {
    id: "volcano",
    icon: "🌋",
    label: "Aktiver Vulkan",
    check: c => c.hasVolcano,
  },
  {
    id: "pop50m",
    icon: "🏙️",
    label: "50–100 Mio. Einwohner",
    check: c => c.population >= 50 && c.population < 100,
  },
  {
    id: "gdp10to30",
    icon: "💵",
    label: "BIP/Kopf $10.000–$30.000",
    check: c => c.gdpPerCapita >= 10000 && c.gdpPerCapita < 30000,
  },

  // MITTEL
  {
    id: "schengen",
    icon: "🛂",
    label: "Schengen-Mitglied",
    check: c => c.schengenMember,
  },
  {
    id: "peak8000",
    icon: "🗻",
    label: "Berg über 8000 m",
    check: c => c.highestPeak >= 8000,
  },
  {
    id: "area500k",
    icon: "🗾",
    label: "Fläche unter 100.000 km²",
    check: c => c.area < 100000,
  },
  {
    id: "olympic50",
    icon: "🎽",
    label: "Weniger als 10 Olympia-Medaillen",
    check: c => c.olympicMedals < 10,
  },
  {
    id: "rainforest",
    icon: "🌿",
    label: "Regenwald im Land",
    check: c => c.hasRainforest,
  },
  {
    id: "highLiteracy",
    icon: "📚",
    label: "Alphabetisierung unter 80%",
    check: c => c.literacy < 80,
  },
  {
    id: "oilExporter",
    icon: "🛢️",
    label: "Bedeutender Ölexporteur",
    check: c => c.majorOilExporter,
  },

  // SCHWER
  {
    id: "twoContinent",
    icon: "🌐",
    label: "Auf 2 Kontinenten",
    check: c => c.transcontinental,
  },
  {
    id: "microstate",
    icon: "🔭",
    label: "Kleinstaat (<1000 km²)",
    check: c => c.area < 1000,
  },
  {
    id: "noArmy",
    icon: "☮️",
    label: "Keine eigene Armee",
    check: c => c.noArmy,
  },
  {
    id: "gdpTop5",
    icon: "📈",
    label: "Top-5 BIP weltweit",
    check: c => c.topGdpCountry,
  },
  {
    id: "rightHandTraffic",
    icon: "🚗",
    label: "Linksverkehr",
    check: c => c.leftHandTraffic,
  },
];