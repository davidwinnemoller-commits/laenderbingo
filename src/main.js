// =============================================
// main.js
// Einstiegspunkt — verbindet Logic und UI
// =============================================

import {
  createGameState,
  assignCountry,
  skipCountry,
  getResult,
} from "./game/logic.js";

import {
  DOM,
  initTheme,
  renderGrid,
  renderCurrentCountry,
  updateHeader,
  showFeedback,
  flashCell,
  showEndScreen,
  hideEndScreen,
  hideStartScreen,
  setSkipEnabled,
} from "./ui/render.js";

// ── Dark Mode ────────────────────────────────
initTheme();

// ── Spielzustand ─────────────────────────────
let state = null;

// ── Spiel starten ────────────────────────────

function startGame() {
  hideEndScreen();
  hideStartScreen();

  state = createGameState();

  renderGrid(state, handleCellClick);
  renderCurrentCountry(state.queue[0]);
  updateHeader(state);
  setSkipEnabled(true);
}

// ── Zell-Klick ───────────────────────────────

function handleCellClick(cellIndex) {
  if (!state || state.gameOver) return;

  const country  = state.queue[state.queueIndex];
  const category = state.categories[cellIndex];
  const result   = assignCountry(state, cellIndex);

  if (!result) return;

  // Feedback
  if (result.correct) {
    showFeedback(`✓ ${country.name} passt zu „${category.label}"`, "good");
    flashCell(cellIndex, "correct");
  } else {
    showFeedback(`✗ ${country.name} passt nicht zu „${category.label}" (−2 Züge)`, "bad");
    flashCell(cellIndex, "wrong");
  }

  updateHeader(state);

  if (result.done) {
    setTimeout(() => endGame(), 700);
    return;
  }

  setTimeout(() => {
    renderGrid(state, handleCellClick);
    renderCurrentCountry(state.queue[state.queueIndex]);
  }, 500);
}

// ── Skip ─────────────────────────────────────

function handleSkip() {
  if (!state || state.gameOver) return;

  const result = skipCountry(state);
  if (!result) return;

  showFeedback("→ Übersprungen (−1 Zug)", "info");
  updateHeader(state);

  if (result.done) {
    setTimeout(() => endGame(), 400);
    return;
  }

  renderCurrentCountry(state.queue[state.queueIndex]);
}

// ── Spiel beenden ────────────────────────────

function endGame() {
  setSkipEnabled(false);
  const result = getResult(state);
  showEndScreen(result);
}

// ── Event Listeners ──────────────────────────

DOM.startBtn.addEventListener("click", startGame);
DOM.restartBtn.addEventListener("click", startGame);
DOM.skipBtn.addEventListener("click", handleSkip);
