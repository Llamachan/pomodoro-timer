const timerDisplay = document.getElementById("timer");
const sessionDisplay = document.getElementById("sessions");

let timeLeft = 25 * 60;
let timerInterval = null;
let isRunning = false;

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    //padStart - adding pads at the start to maintain uniformity in the display.
    timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function startTimer() {
    if (isRunning) return;

    isRunning = true;

    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
            isRunning = false;
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
    timeLeft = 25 * 60;

    updateDisplay();
}

updateDisplay();