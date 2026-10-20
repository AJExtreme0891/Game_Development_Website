const target = document.getElementById("target");
const timer = document.getElementById("timer");

let timeLeft = 30;
let isPlaying = false

target.addEventListener("click", function() {

      if (!isPlaying) {
        startGame();
    } else {
        score++;
        updateSubheaderDisplay();
        moveTarget();
    }
})

function updateSubheaderDisplay(){
   timer.textContent = `Time Left: ${timeLeft}s | Score: ${score}`;
}


function startGame(){

    isPlaying = true;
    score = 1; 
    

    
    updateSubheaderDisplay();
    moveTarget();

    
    gameInterval = setInterval(() => {
        timeLeft--;
        updateSubheaderDisplay();

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);


}

function moveTarget() {
    
    target.style.transform = 'none';

    const targetWidth = target.offsetWidth || 100;
    const targetHeight = target.offsetHeight || 100;

    const maxX = window.innerWidth - targetWidth;
    
    
    const maxY = window.innerHeight - targetHeight;

   
    const safeMaxX = maxX > 0 ? maxX : window.innerWidth - 100;
    const safeMaxY = window.innerHeight - 100;

    const randomX = Math.floor(Math.random() * safeMaxX);
    const randomY = Math.floor(Math.random() * (safeMaxY));

    target.style.left = `${randomX}px`;
    target.style.top = `${randomY}px`;
}



function endGame() {
    clearInterval(gameInterval);
    isPlaying = false;
     
    
    timer.textContent = `Game Over! Final Score: ${score}. Select a time and hit the target to play again!`;
    timer.style.color = '#ff4757'; 
  
    target.style.left = '50%';
    target.style.top = '50%';
    target.style.transform = 'translate(-50%, -50%)'; 
}