// =============================================
// game/logic.js
// Kernlogik: Spielzustand, Regeln, Bingo
// =============================================

import { COUNTRIES } from "../data/countries.js";
import { ALL_CATEGORIES } from "../data/categories.js";

const QUEUE_SIZE = 42;
const GRID_SIZE  = 16; // 4x4

// ── Hilfsfunktionen ──────────────────────────

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Wählt 16 zufällige Kategorien aus ALL_CATEGORIES,
 * die alle durch den Länder-Pool abgedeckt werden.
 */
function selectCategories() {
  const valid = ALL_CATEGORIES.filter(cat =>
    COUNTRIES.some(c => cat.check(c))
  );
  return shuffle(valid).slice(0, GRID_SIZE);
}

/**
 * Baut eine Queue von 42 Ländern:
 * - Mindestens 1 passendes Land pro Kategorie garantiert
 * - Auch Länder ohne passende Kategorie dabei (Skip-Fälle)
 */
function buildQueue(categories) {
  // Garantiere mind. 1 Match pro Kategorie
  const mustHave = categories.map(cat => {
    const matches = COUNTRIES.filter(c => cat.check(c));
    return matches[Math.floor(Math.random() * matches.length)];
  });

  const uniqueMustHave = [...new Set(mustHave)];

  // Fülle restliche Slots mit zufälligen Ländern (inkl. No-fit)
  const rest = shuffle(COUNTRIES.filter(c => !uniqueMustHave.includes(c)));
  const needed = QUEUE_SIZE - uniqueMustHave.length;
  const queue = shuffle([...uniqueMustHave, ...rest.slice(0, needed)]);

  return queue.slice(0, QUEUE_SIZE);
}

// ── Bingo-Prüfung ────────────────────────────

const BINGO_LINES = [
  // Zeilen
  [0,1,2,3], [4,5,6,7], [8,9,10,11], [12,13,14,15],
  // Spalten
  [0,4,8,12], [1,5,9,13], [2,6,10,14], [3,7,11,15],
  // Diagonalen
  [0,5,10,15], [3,6,9,12],
];

/**
 * Gibt alle neu vollendeten Bingo-Linien zurück.
 * @param {Array<Array>} filled  - state.filled (Array of country arrays per cell)
 * @param {Set<string>}  known   - bereits gemeldete Linien (als "0-1-2-3")
 * @returns {{ newLines: string[], newCells: Set<number> }}
 */
export function checkBingo(filled, knownLines) {
  const newLines = [];
  const newCells = new Set();

  for (const line of BINGO_LINES) {
    const key = line.join("-");
    if (knownLines.has(key)) continue;
    if (line.every(i => filled[i] && filled[i].length > 0)) {
      newLines.push(key);
      line.forEach(i => newCells.add(i));
    }
  }

  return { newLines, newCells };
}

// ── Spielzustand erstellen ───────────────────

/**
 * Erstellt einen frischen Spielzustand.
 * @returns {GameState}
 */
export function createGameState() {
  const categories = selectCategories();
  const queue      = buildQueue(categories);

  return {
    categories,           // Array[16] von Kategorie-Objekten
    queue,                // Array[42] von Länder-Objekten
    queueIndex: 0,        // Welches Land ist gerade dran
    moves: QUEUE_SIZE,    // Verbleibende Züge (startet bei 42)
    filled: Array(GRID_SIZE).fill(null).map(() => []),
    // filled[i] = Array von Ländern in Zelle i

    correct: 0,           // Richtige Zuordnungen
    wrong: 0,             // Falsche Zuordnungen
    skipped: 0,           // Übersprungene Länder

    bingoLines: new Set(), // Bereits gemeldete Linien-Keys
    bingoCells: new Set(), // Zellen die zu einer Bingo-Linie gehören

    gameOver: false,
    finished: false,      // true wenn alle 42 Länder durch
  };
}

// ── Spielaktionen ────────────────────────────

/**
 * Spieler ordnet aktuelles Land einer Kategorie zu.
 * @returns {{ correct: boolean, bingoResult: object, done: boolean }}
 */
export function assignCountry(state, cellIndex) {
  if (state.gameOver) return null;

  const country  = state.queue[state.queueIndex];
  const category = state.categories[cellIndex];
  const fits     = category.check(country);

  // Zug immer abziehen
  state.moves -= 1;

  if (fits) {
    state.filled[cellIndex].push(country);
    state.correct += 1;
  } else {
    // Falsch: extra Zug abziehen
    state.moves -= 1;
    state.wrong += 1;
  }

  state.moves    = Math.max(0, state.moves);
  state.queueIndex += 1;

  // Bingo prüfen
  const bingoResult = checkBingo(state.filled, state.bingoLines);
  bingoResult.newLines.forEach(l => state.bingoLines.add(l));
  bingoResult.newCells.forEach(c => state.bingoCells.add(c));

  // Gewonnen wenn alle 16 Kategorien gefüllt sind
const allFilled = state.filled.every(arr => arr.length > 0);
const outOfMoves = state.moves <= 0;
const outOfCountries = state.queueIndex >= state.queue.length;

if (allFilled) {
  state.gameOver = true;
  state.finished = true;   // Sieg
} else if (outOfMoves || outOfCountries) {
  state.gameOver = true;
  state.finished = false;  // Niederlage
}

  return { correct: fits, bingoResult, done };
}

/**
 * Spieler überspringt das aktuelle Land (−1 Zug).
 * @returns {{ done: boolean }}
 */
export function skipCountry(state) {
  if (state.gameOver) return null;

  state.moves -= 1;
  state.moves  = Math.max(0, state.moves);
  state.skipped += 1;
  state.queueIndex += 1;

  const allFilled = state.filled.every(arr => arr.length > 0);
const outOfMoves = state.moves <= 0;
const outOfCountries = state.queueIndex >= state.queue.length;

if (allFilled) {
  state.gameOver = true;
  state.finished = true;
} else if (outOfMoves || outOfCountries) {
  state.gameOver = true;
  state.finished = false;
}

  return { done };
}

// ── Ergebnis-Zusammenfassung ─────────────────

export function getResult(state) {
  const filledCount = state.filled.filter(arr => arr.length > 0).length;
  const bingoCount  = state.bingoLines.size;

  return {
    filledCells: filledCount,
    totalCells:  GRID_SIZE,
    bingoCount,
    correct:  state.correct,
    wrong:    state.wrong,
    skipped:  state.skipped,
    movesLeft: state.moves,
    finished:  state.finished,
  };
}
