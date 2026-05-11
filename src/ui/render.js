// =============================================
// ui/render.js
// Alles was das DOM berührt
// =============================================

// ── DOM-Referenzen ───────────────────────────

const $ = id => document.getElementById(id);

export const DOM = {
  movesDisplay:   $("moves-display"),
  statusText:     $("status-text"),
  skipBtn:        $("skip-btn"),
  themeBtn:       $("theme-btn"),
  currentCountry: $("current-country"),
  countryFlag:    $("country-flag"),
  countryName:    $("country-name"),
  countryHint:    $("country-hint"),
  feedback:       $("feedback"),
  grid:           $("grid"),
  correctCount:   $("correct-count"),
  wrongCount:     $("wrong-count"),
  skipCount:      $("skip-count"),
  endScreen:      $("end-screen"),
  endTitle:       $("end-title"),
  endSub:         $("end-sub"),
  endBingo:       $("end-bingo"),
  restartBtn:     $("restart-btn"),
  startScreen:    $("start-screen"),
  startBtn:       $("start-btn"),
};

// ── Dark Mode ────────────────────────────────

const STORAGE_KEY = "geogrid-theme";

function applyTheme(dark) {
  document.body.classList.toggle("dark", dark);
  DOM.themeBtn.textContent = dark ? "☀️" : "🌙";
  DOM.themeBtn.title = dark ? "Zum hellen Modus wechseln" : "Zum dunklen Modus wechseln";
  localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light");
}

export function initTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dark = saved ? saved === "dark" : prefersDark;
  applyTheme(dark);

  DOM.themeBtn.addEventListener("click", () => {
    applyTheme(!document.body.classList.contains("dark"));
  });
}

// ── Grid rendern ─────────────────────────────

export function renderGrid(state, onCellClick) {
  DOM.grid.innerHTML = "";

  state.categories.forEach((cat, i) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    if (state.filled[i].length > 0) cell.classList.add("filled");
    if (state.bingoCells.has(i))    cell.classList.add("bingo-line");

    const flags = state.filled[i].map(c =>
      `<img src="https://flagcdn.com/w20/${c.code}.png" height="14" alt="${c.name}" style="border-radius:2px">`
    ).join(" ");

    cell.innerHTML = `
      <span class="cell-icon">${cat.icon}</span>
      <span class="cell-label">${cat.label}</span>
      <span class="cell-countries">${flags}</span>
    `;

    cell.addEventListener("click", () => onCellClick(i));
    DOM.grid.appendChild(cell);
  });
}

// ── Aktuelles Land ───────────────────────────

export function renderCurrentCountry(country) {
  DOM.countryFlag.innerHTML = `<img src="https://flagcdn.com/w80/${country.code}.png" height="48" alt="${country.name}" style="border-radius:4px;box-shadow:0 1px 4px rgba(0,0,0,0.15)">`;
  DOM.countryName.textContent = country.name;
  DOM.countryHint.textContent = "";
}

// ── Header / Stats ───────────────────────────

export function updateHeader(state) {
  DOM.movesDisplay.textContent = state.moves;

  DOM.movesDisplay.classList.remove("warning", "danger");
  if (state.moves <= 5)       DOM.movesDisplay.classList.add("danger");
  else if (state.moves <= 15) DOM.movesDisplay.classList.add("warning");

  const countryNum = Math.min(state.queueIndex + 1, 42);
  DOM.statusText.textContent =
    `${state.moves} Züge übrig · Land ${countryNum} von 42`;

  DOM.correctCount.textContent = state.correct;
  DOM.wrongCount.textContent   = state.wrong;
  DOM.skipCount.textContent    = state.skipped;
}

// ── Feedback-Meldung ─────────────────────────

let feedbackTimer = null;

export function showFeedback(msg, type = "info") {
  clearTimeout(feedbackTimer);
  DOM.feedback.textContent  = msg;
  DOM.feedback.className    = `feedback ${type}`;
  feedbackTimer = setTimeout(() => {
    DOM.feedback.textContent = "";
    DOM.feedback.className   = "feedback";
  }, 2500);
}

// ── Zell-Flash-Animation ─────────────────────

export function flashCell(index, type) {
  const cells = DOM.grid.querySelectorAll(".cell");
  const cell  = cells[index];
  if (!cell) return;

  cell.classList.add(`flash-${type}`);
  setTimeout(() => cell.classList.remove(`flash-${type}`), 400);
}

// ── End-Screen ───────────────────────────────

export function showEndScreen(result) {
  const title = result.finished ? "Alle Länder gespielt! 🎉" : "Keine Züge mehr!";

  const sub = [
    `${result.filledCells}/${result.totalCells} Kategorien gefüllt`,
    `${result.correct} richtig · ${result.wrong} falsch · ${result.skipped} übersprungen`,
  ].join("\n");

  const bingoText = result.bingoCount > 0
    ? `${result.bingoCount} Bingo${result.bingoCount > 1 ? "s" : ""}! 🎊`
    : "Kein Bingo diesmal.";

  DOM.endTitle.textContent = title;
  DOM.endSub.textContent   = sub;
  DOM.endBingo.textContent = bingoText;
  DOM.endScreen.style.display = "flex";
}

export function hideEndScreen() {
  DOM.endScreen.style.display = "none";
}

// ── Start-Screen ─────────────────────────────

export function hideStartScreen() {
  DOM.startScreen.style.display = "none";
}

// ── Skip-Button ──────────────────────────────

export function setSkipEnabled(enabled) {
  DOM.skipBtn.disabled = !enabled;
}