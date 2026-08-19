const timerDisplay = document.getElementById("timer");
const sessionsDisplay = document.getElementById("sessions");
const currentModeDisplay = document.getElementById("current-mode");

const workButton = document.getElementById("work-button");
const shortButton = document.getElementById("short-button");
const longButton = document.getElementById("long-button");

const startButton = document.getElementById("start-button");
const pauseButton = document.getElementById("pause-button");
const completionMessage = document.getElementById("completion-message");

let timeLeft = 25 * 60;
let timerInterval = null;
let isRunning = false;
let currentMode = "work";
let sessionsCompleted = 0;

const modes = {
    work: 25 * 60,
    short: 5 * 60,
    long: 15 * 60
};

const modeLabels = {
    work: "💻 Work Session 💻",
    short: "☕ Short Break ☕",
    long: "🌱 Long Break 🌱"
};

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timerDisplay.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function startTimer() {
    if (isRunning) return;

    isRunning = true;

    startButton.textContent = "Running...";
    startButton.disabled = true;

    pauseButton.disabled = false;

    //completionMessage.textContent = "";

    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;

            updateDisplay();
            updatePageTitle();
        } else {
            completeSession();
        }
    }, 1000);
}

function pauseTimer() {
    if (!isRunning) return;

    clearInterval(timerInterval);

    timerInterval = null;
    isRunning = false;

    startButton.textContent = "Resume";
    startButton.disabled = false;

    pauseButton.disabled = true;
}

function resetTimer() {
    clearInterval(timerInterval);

    timerInterval = null;
    isRunning = false;

    timeLeft = modes[currentMode];

    startButton.textContent = "Start";
    startButton.disabled = false;

    pauseButton.disabled = false;

    completionMessage.textContent = "";

    updateDisplay();
    updatePageTitle();
}

function setMode(mode) {
    clearInterval(timerInterval);

    timerInterval = null;
    isRunning = false;

    currentMode = mode;
    timeLeft = modes[mode];

    currentModeDisplay.textContent = modeLabels[mode];

    updateModeButtons();
    updateDisplay();
    updatePageTitle();
}
function updateModeButtons() {
    workButton.classList.remove("active");
    shortButton.classList.remove("active");
    longButton.classList.remove("active");

    if (currentMode === "work") {
        workButton.classList.add("active");
    }

    if (currentMode === "short") {
        shortButton.classList.add("active");
    }

    if (currentMode === "long") {
        longButton.classList.add("active");
    }
}

function completeSession() {
    clearInterval(timerInterval);

    timerInterval = null;
    isRunning = false;

    if (currentMode === "work") {
        sessionsCompleted++;

        sessionsDisplay.textContent = sessionsCompleted;

        completionMessage.textContent = "🎉 Work session complete!";

        if (sessionsCompleted % 4 === 0) {
            setMode("long");
        } else {
            setMode("short");
        }
    } else {
        completionMessage.textContent = "✨ Break complete!";

        setMode("work");
    }

    updatePageTitle();

    startTimer();
}

function updatePageTitle() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const formattedTime =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    document.title = `${formattedTime} — Pomodoro`;
}
updateDisplay();
updateModeButtons();