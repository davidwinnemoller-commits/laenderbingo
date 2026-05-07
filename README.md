# 🌍 Länderbingo

Geografiespiel: 42 Länder, 16 Kategorien, 42 Züge.

## Spielregeln

- Du siehst ein **4×4 Bingo-Feld** mit Geografiekategorien (z.B. „EU-Mitglied", „Inselstaat", „100+ Olympia-Medaillen")
- Es werden dir **42 Länder nacheinander** gezeigt
- Für jedes Land kannst du **eine Zelle anklicken**, um das Land dieser Kategorie zuzuordnen:
  - ✅ Richtig zugeordnet → **−1 Zug**
  - ❌ Falsch zugeordnet → **−2 Züge**
  - ⏭ Übersprungen (kein passendes Feld) → **−1 Zug**
- Ziel: Möglichst viele Kategorien füllen und **Bingo** erreichen!

---

## Projekt starten (lokal)

### Voraussetzung
Ein Browser reicht — kein Build-Tool nötig, kein Node.js.

Da das Projekt ES-Module nutzt (`type="module"`), muss es über einen lokalen Server geöffnet werden (nicht direkt als `file://`).

### Option 1: VS Code Live Server (empfohlen)
1. Installiere die Extension **Live Server** (von Ritwick Dey)
2. Rechtsklick auf `index.html` → **"Open with Live Server"**
3. Browser öffnet sich automatisch ✅

### Option 2: Python (falls installiert)
```bash
cd laenderbingo
python -m http.server 8000
# dann: http://localhost:8000
```

### Option 3: Node.js
```bash
cd laenderbingo
npx serve .
```

---

## Projektstruktur

```
laenderbingo/
├── index.html              # Haupt-HTML, alle UI-Elemente
├── src/
│   ├── main.js             # Einstiegspunkt, verbindet Logic & UI
│   ├── style.css           # Alle Styles
│   ├── data/
│   │   ├── countries.js    # Länderdaten (Name, Flagge, alle Eigenschaften)
│   │   └── categories.js   # Alle möglichen Kategorien mit Check-Funktion
│   ├── game/
│   │   └── logic.js        # Spiellogik (Zustand, Regeln, Bingo)
│   └── ui/
│       └── render.js       # DOM-Manipulationen, Animationen
└── README.md
```

---

## Erweiterungen (Ideen für später)

### Neue Länder hinzufügen
→ Datei: `src/data/countries.js`
Kopiere einen bestehenden Eintrag und passe alle Felder an.
Alle boolean-Felder müssen gesetzt sein (kein `undefined`).

### Neue Kategorien hinzufügen
→ Datei: `src/data/categories.js`
```js
{
  id: "meine_kategorie",
  icon: "🎯",
  label: "Kurze Beschreibung",
  check: c => c.irgendeinFeld === true,
}
```

### Schwierigkeitsgrade
- Leicht: 50 Züge, nur einfache Kategorien
- Mittel: 42 Züge (Standard)
- Schwer: 35 Züge, schwierigere Kategorien

### Weitere Spielmodi (Ideen)
- Zeitmodus
- Mehrspieler (lokal, abwechselnd)
- Highscore mit localStorage

---

## Technologie

- Vanilla JavaScript (ES Modules)
- Kein Framework, kein Build-Tool
- CSS Custom Properties für Theming
- `type="module"` → braucht lokalen Server
