let timer;
let isRunning = false;
let timeLeft = 25 * 60;

const MODES = {
  pomodoro: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60
};

let currentMode = "pomodoro";

const timeDisplay = document.getElementById("time");
const modeLabel = document.getElementById("mode");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");

const modeButtons = {
  pomodoro: document.getElementById("pomodoroBtn"),
  shortBreak: document.getElementById("shortBreakBtn"),
  longBreak: document.getElementById("longBreakBtn")
};

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timeDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  modeLabel.textContent = currentMode === "pomodoro" ? "作業中" : currentMode === "shortBreak" ? "短い休憩" : "長い休憩";
}

function setMode(mode) {
  currentMode = mode;
  timeLeft = MODES[mode];
  updateDisplay();
  document.querySelectorAll(".mode-btn").forEach(btn => btn.classList.remove("active"));
  modeButtons[mode].classList.add("active");
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      clearInterval(timer);
      isRunning = false;
      if (currentMode === "pomodoro") {
        setMode("shortBreak");
        startTimer();
      } else {
        setMode("pomodoro");
      }
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  pauseTimer();
  setMode(currentMode);
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

Object.entries(modeButtons).forEach(([mode, button]) => {
  button.addEventListener("click", () => {
    pauseTimer();
    setMode(mode);
  });
});

setMode("pomodoro");
