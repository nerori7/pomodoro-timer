let timer = null;
let isRunning = false;
let currentMode = 'pomodoro';

// デフォルト時間（秒）
const times = {
  pomodoro: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60
};

// 入力欄の値を times に反映する
function updateTimesFromInput() {
  const w = parseInt(document.getElementById('workTime').value, 10);
  const s = parseInt(document.getElementById('shortBreakTime').value, 10);
  const l = parseInt(document.getElementById('longBreakTime').value, 10);
  times.pomodoro   = (isNaN(w) ? 25 : w) * 60;
  times.shortBreak = (isNaN(s) ?  5 : s) * 60;
  times.longBreak  = (isNaN(l) ? 15 : l) * 60;
}

// 現在残り時間（秒）
let timeLeft = times.pomodoro;

// 表示を更新
function updateDisplay() {
  const m = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const s = String(timeLeft % 60).padStart(2, '0');
  document.getElementById('timeDisplay').textContent = `${m}:${s}`;

  const label = currentMode === 'pomodoro'
    ? '作業中'
    : currentMode === 'shortBreak'
      ? '短い休憩'
      : '長い休憩';
  document.getElementById('modeLabel').textContent = label;
}

// モード切替
function setMode(mode) {
  pauseTimer();
  currentMode = mode;
  updateTimesFromInput();
  timeLeft = times[mode];
  // ボタンの active 切り替え
  document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById({
    pomodoro:   'pomodoroBtn',
    shortBreak: 'shortBreakBtn',
    longBreak:  'longBreakBtn'
  }[mode]).classList.add('active');
  updateDisplay();
}

// タイマー開始
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
      // 自動で次モードへ
      if (currentMode === 'pomodoro') {
        setMode('shortBreak');
        startTimer();
      } else {
        setMode('pomodoro');
      }
    }
  }, 1000);
}

// 一時停止
function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

// リセット
function resetTimer() {
  pauseTimer();
  updateTimesFromInput();
  timeLeft = times[currentMode];
  updateDisplay();
}

// イベントリスナー
document.getElementById('applySettings').addEventListener('click', () => {
  resetTimer();
});
document.getElementById('startBtn').addEventListener('click', startTimer);
document.getElementById('pauseBtn').addEventListener('click', pauseTimer);
document.getElementById('resetBtn').addEventListener('click', resetTimer);

document.getElementById('pomodoroBtn').addEventListener('click', () => setMode('pomodoro'));
document.getElementById('shortBreakBtn').addEventListener('click', () => setMode('shortBreak'));
document.getElementById('longBreakBtn').addEventListener('click', () => setMode('longBreak'));

// 初期表示
setMode('pomodoro');
