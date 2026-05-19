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
  startTimer,
  stopTimer,
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

// ── Hilfsfunktion: Review-Bar ─────────────────

const reviewBar     = document.getElementById("review-bar");
const reviewRestBtn = document.getElementById("review-restart-btn");
const reviewBtn     = document.getElementById("review-btn");

function showReviewBar() {
  reviewBar.style.display = "flex";
  // Padding damit Grid nicht hinter Bar verschwindet
}

function hideReviewBar() {
  reviewBar.style.display = "none";
}

// ── Spiel starten ────────────────────────────

function startGame() {
  hideEndScreen();
  hideStartScreen();
  hideReviewBar();

  state = createGameState();

  renderGrid(state, handleCellClick);
  renderCurrentCountry(state.queue[0]);
  updateHeader(state);
  setSkipEnabled(true);

  startTimer(() => {
    if (!state || state.gameOver) return;
    state.gameOver = true;
    setSkipEnabled(false);
    showEndScreen({ ...getResult(state), timeout: true });
  });
}

// ── Zell-Klick ───────────────────────────────

function handleCellClick(cellIndex) {
  if (!state || state.gameOver) return;

  if (state.filled[cellIndex].length > 0) {
    showFeedback("Diese Kategorie ist bereits belegt!", "bad");
    return;
  }

  const country  = state.queue[state.queueIndex];
  const category = state.categories[cellIndex];
  const result   = assignCountry(state, cellIndex);

  if (!result) return;

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
  stopTimer();
  setSkipEnabled(false);
  const result = getResult(state);
  showEndScreen(result);
}

// ── Event Listeners ──────────────────────────

DOM.startBtn.addEventListener("click", startGame);
DOM.restartBtn.addEventListener("click", startGame);
DOM.skipBtn.addEventListener("click", handleSkip);

// "Feld anzeigen" — End-Screen schließen, Review-Bar einblenden
reviewBtn.addEventListener("click", () => {
  hideEndScreen();
  // Grid nochmal rendern ohne Klick-Handler (read-only)
  renderGrid(state, () => {});
  showReviewBar();
});

// "Neues Spiel" aus der Review-Bar
reviewRestBtn.addEventListener("click", startGame);