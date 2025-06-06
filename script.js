let timer;
let isRunning = false;
let currentMode = "work"; // または "break"
let timeLeft = 25 * 60;

const timeDisplay = document.getElementById("time");
const modeDisplay = document.getElementById("mode");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const applyBtn = document.getElementById("applySettings");

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timeDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  modeDisplay.textContent = currentMode === "work" ? "作業中" : "休憩中";
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      switchMode();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  pauseTimer();
  const baseMinutes = currentMode === "work"
    ? parseInt(document.getElementById("workTime").value)
    : parseInt(document.getElementById("breakTime").value);
  timeLeft = baseMinutes * 60;
  updateDisplay();
}

function switchMode() {
  currentMode = currentMode === "work" ? "break" : "work";
  resetTimer();
  startTimer();
}

applyBtn.addEventListener("click", () => {
  resetTimer();
});

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateDisplay();
