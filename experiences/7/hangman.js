const canvas = document.getElementById("hangmanCanvas");
const ctx = canvas.getContext("2d");
const wordDisplay = document.getElementById("wordDisplay");
const guessInput = document.getElementById("guessInput");
const submitGuess = document.getElementById("submitGuess");
const attemptsDisplay = document.getElementById("attempts");

const words = ["apple", "banana", "cherry", "grape"];
const word = words[Math.floor(Math.random() * words.length)];

let guesses = [];
let attempts = 6;

function drawHangman(attemptsLeft) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Drawing the base and the pole
    ctx.beginPath();
    ctx.moveTo(50, 250);
    ctx.lineTo(200, 250);
    ctx.moveTo(125, 250);
    ctx.lineTo(125, 50);
    ctx.lineTo(175, 50);
    ctx.lineTo(175, 75);
    ctx.stroke();

    if (attemptsLeft < 6) {
        // Drawing the head
        ctx.beginPath();
        ctx.arc(175, 100, 25, 0, Math.PI * 2);
        ctx.stroke();
    }

    if (attemptsLeft < 5) {
        // Drawing the body
        ctx.beginPath();
        ctx.moveTo(175, 125);
        ctx.lineTo(175, 200);
        ctx.stroke();
    }

    if (attemptsLeft < 4) {
        // Drawing the left arm
        ctx.beginPath();
        ctx.moveTo(175, 135);
        ctx.lineTo(150, 175);
        ctx.stroke();
    }

    if (attemptsLeft < 3) {
        // Drawing the right arm
        ctx.beginPath();
        ctx.moveTo(175, 135);
        ctx.lineTo(200, 175);
        ctx.stroke();
    }

    if (attemptsLeft < 2) {
        // Drawing the left leg
        ctx.beginPath();
        ctx.moveTo(175, 200);
        ctx.lineTo(150, 225);
        ctx.stroke();
    }

    if (attemptsLeft < 1) {
        // Drawing the right leg
        ctx.beginPath();
        ctx.moveTo(175, 200);
        ctx.lineTo(200, 225);
        ctx.stroke();
    }
}

function updateWordDisplay() {
    let display = "";
    for (let i = 0; i < word.length; i++) {
        if (guesses.includes(word[i])) {
            display += word[i];
        } else {
            display += "_";
        }
        display += " ";
    }
    wordDisplay.textContent = display;
}

function updateAttemptsDisplay() {
    attemptsDisplay.textContent = `Attempts left: ${attempts}`;
}

function checkGameStatus() {
    if (attempts <= 0) {
        alert("Game over! The word was: " + word);
        window.location.reload();
    } else if (!wordDisplay.textContent.includes("_")) {
        alert("Congratulations! You've guessed the word!");
        window.location.reload();
    }
}

submitGuess.addEventListener("click", () => {
    const guess = guessInput.value.toLowerCase();
    if (guess.length !== 1 || !(/[a-z]/.test(guess)) || guesses.includes(guess)) {
        alert("Invalid guess. Please enter a single letter that hasn't been guessed yet.");
    } else {
        guesses.push(guess);
        if (!word.includes(guess)) {
            attempts--;
            drawHangman(attempts);
        }
        updateWordDisplay();
        updateAttemptsDisplay();
        checkGameStatus();
    }
    guessInput.value = "";
    guessInput.focus();
});

updateWordDisplay();
updateAttemptsDisplay();
drawHangman(attempts);

// Allow pressing the Enter key to submit the guess
guessInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        submitGuess.click();
    }
});

/* ... */

const backButton = document.getElementById("myButton");

backButton.addEventListener("click", () => {
    window.location.href = "../../index.html";
});

/* ... */
