const timerDisplay = document.getElementById("timer");
const sessionsDisplay = document.getElementById("sessions");
const currentModeDisplay = document.getElementById("current-mode");

const workButton = document.getElementById("work-button");
const shortButton = document.getElementById("short-button");
const longButton = document.getElementById("long-button");

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

    timerInterval = setInterval(() => {
        timeLeft--;

        updateDisplay();

        if (timeLeft <= 0) {
            completeSession();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);

    timerInterval = null;
    isRunning = false;
}

function resetTimer() {
    clearInterval(timerInterval);

    timerInterval = null;
    isRunning = false;

    timeLeft = modes[currentMode];

    updateDisplay();
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

        if (sessionsCompleted % 4 === 0) {
            setMode("long");
        } else {
            setMode("short");
        }
    } else {
        setMode("work");
    }

    startTimer();
}

updateDisplay();
updateModeButtons();