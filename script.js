class PomodoroTimer {
    constructor() {
        this.timer = document.getElementById('timer');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.pomodoroBtn = document.getElementById('pomodoroBtn');
        this.shortBreakBtn = document.getElementById('shortBreakBtn');
        this.longBreakBtn = document.getElementById('longBreakBtn');
        
        this.currentMode = 'pomodoro';
        this.isRunning = false;
        this.interval = null;
        
        this.setMode('pomodoro');
        
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.pomodoroBtn.addEventListener('click', () => this.setMode('pomodoro'));
        this.shortBreakBtn.addEventListener('click', () => this.setMode('shortBreak'));
        this.longBreakBtn.addEventListener('click', () => this.setMode('longBreak'));
    }

    setMode(mode) {
        this.currentMode = mode;
        this.reset();
        
        // モードボタンのアクティブ状態を更新
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.getElementById(`${mode}Btn`).classList.add('active');
        
        // 各モードの時間設定
        const times = {
            pomodoro: 25 * 60,
            shortBreak: 5 * 60,
            longBreak: 15 * 60
        };
        
        this.timeLeft = times[mode];
        this.updateDisplay();
    }

    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.interval = setInterval(() => {
            this.timeLeft--;
            if (this.timeLeft < 0) {
                this.reset();
                this.playSound();
            }
            this.updateDisplay();
        }, 1000);
    }

    pause() {
        if (!this.isRunning) return;
        
        this.isRunning = false;
        clearInterval(this.interval);
    }

    reset() {
        this.isRunning = false;
        clearInterval(this.interval);
        
        const times = {
            pomodoro: 25 * 60,
            shortBreak: 5 * 60,
            longBreak: 15 * 60
        };
        
        this.timeLeft = times[this.currentMode];
        this.updateDisplay();
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    playSound() {
        const audio = new Audio('https://notificationsounds.com/soundfiles/6f8383978240458595252f32231e4774/notification-1.mp3');
        audio.play();
    }
}

// インスタンスの作成
const pomodoroTimer = new PomodoroTimer();
