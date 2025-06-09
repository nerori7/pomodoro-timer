let timer = null;
let isRunning = false;
let currentMode = 'pomodoro';

// 各モードの秒数格納オブジェクト
const times = {
  pomodoro:   25 * 60,
  shortBreak:  5 * 60,
  longBreak:  15 * 60
};

// 入力欄から分・秒を読み取って times を更新
function updateTimesFromInput() {
  const wM = parseInt(document.getElementById('workMin').value,      10);
  const wS = parseInt(document.getElementById('workSec').value,      10);
  const sM = parseInt(document.getElementById('shortMin').value,     10);
  const sS = parseInt(document.getElementById('shortSec').value,     10);
  const lM = parseInt(document.getElementById('longMin').value,      10);
  const lS = parseInt(document.getElementById('longSec').value,      10);

  times.pomodoro   = ((isNaN(wM) ? 25 : wM) * 60) + (isNaN(wS) ? 0 : wS);
  times.shortBreak = ((isNaN(sM) ?  5 : sM) * 60) + (isNaN(sS) ? 0 : sS);
  times.longBreak  = ((isNaN(lM) ? 15 : lM) * 60) + (isNaN(lS) ? 0 : lS);
}

// 現在の残秒数
let timeLeft = times.pomodoro;

// 表示更新
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
      // 自動切替：ポモドーロ→短休憩、休憩→ポモドーロ
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

// 各種イベント
document.getElementById('applySettings').addEventListener('click', () => resetTimer());
document.getElementById('startBtn').      addEventListener('click', startTimer);
document.getElementById('pauseBtn').      addEventListener('click', pauseTimer);
document.getElementById('resetBtn').      addEventListener('click', resetTimer);
document.getElementById('pomodoroBtn').   addEventListener('click', () => setMode('pomodoro'));
document.getElementById('shortBreakBtn'). addEventListener('click', () => setMode('shortBreak'));
document.getElementById('longBreakBtn').  addEventListener('click', () => setMode('longBreak'));

// 初期化
setMode('pomodoro');
