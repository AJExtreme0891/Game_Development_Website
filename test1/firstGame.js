// --- DOM Elements ---
const target = document.getElementById('target');
const timerButtons = document.querySelectorAll('#timeOptions p');
const subHeader = document.getElementById('subHeader');
const timeOptionsContainer = document.getElementById('timeOptions');

// --- Game State Variables ---
let selectedTime = null; 
let timeLeft = 0;
let score = 0;
let gameInterval = null;
let isPlaying = false;

// --- 1. Handle Time Option Selection ---
timerButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (isPlaying) return;

        // Reset classes on all buttons
        timerButtons.forEach(btn => {
            btn.classList.remove('active-mode');
            btn.classList.remove('pulse-error');
        });
        
        // Add active style to selected button
        button.classList.add('active-mode');

        // Get the number from the ID (e.g., "timer10s" -> 10)
        selectedTime = parseInt(button.id.replace('timer', '').replace('s', ''));
        
        subHeader.textContent = `Time selected: ${selectedTime}s. Click the target to start!`;
        subHeader.style.color = 'white';
    });
});

target.addEventListener('click', () => {
    
    if (selectedTime === null) {
        triggerSelectionWarning();
        return;
    }

    if (!isPlaying) {
        startGame();
    } else {
        score++;
        updateSubheaderDisplay();
        moveTarget();
    }
});

// --- 3. Core Game Logic Functions ---
function startGame() {
    isPlaying = true;
    score = 1; // Count the first click that starts the game
    timeLeft = selectedTime;
    
    // Hide time options during gameplay
    timeOptionsContainer.style.visibility = 'hidden';
    
    updateSubheaderDisplay();
    moveTarget();

    // Setup the timer countdown interval
    gameInterval = setInterval(() => {
        timeLeft--;
        updateSubheaderDisplay();

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function moveTarget() {
    // Remove the center screen translation matrix so coordinates align properly
    target.style.transform = 'none';

    const targetWidth = target.offsetWidth || 100;
    const targetHeight = target.offsetHeight || 100;

    const maxX = window.innerWidth - targetWidth;
    const headerHeight = document.getElementById('headerWrapper').offsetHeight || 120;
    const minY = headerHeight + 20; 
    const maxY = window.innerHeight - targetHeight;

    // Safety checks for negative layout parameters
    const safeMaxX = maxX > 0 ? maxX : window.innerWidth - 100;
    const safeMaxY = maxY > minY ? maxY : window.innerHeight - 100;

    const randomX = Math.floor(Math.random() * safeMaxX);
    const randomY = Math.floor(Math.random() * (safeMaxY - minY)) + minY;

    target.style.left = `${randomX}px`;
    target.style.top = `${randomY}px`;
}

function updateSubheaderDisplay() {
    subHeader.textContent = `Time Left: ${timeLeft}s | Score: ${score}`;
}

function endGame() {
    clearInterval(gameInterval);
    isPlaying = false;
    selectedTime = null; // Clear time selection so they must pick again
    
    subHeader.textContent = `Game Over! Final Score: ${score}. Select a time and hit the target to play again!`;
    subHeader.style.color = '#ff4757'; 
    
    // Reset buttons
    timerButtons.forEach(btn => btn.classList.remove('active-mode'));
    timeOptionsContainer.style.visibility = 'visible';
    
    // Reset target back to screen center safely
    target.style.left = '50%';
    target.style.top = '50%';
    target.style.transform = 'translate(-50%, -50%)'; 
}

function triggerSelectionWarning() {
    subHeader.textContent = "Please select a time mode first!";
    subHeader.style.color = '#ff4757';
    
    timerButtons.forEach(btn => {
        btn.classList.remove('pulse-error');
        // Force the browser to register the animation immediately
        void btn.offsetWidth; 
        btn.classList.add('pulse-error');
    });
}
