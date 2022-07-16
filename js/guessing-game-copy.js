function generateWinningNumber() {
  return Math.floor(Math.random() * 100) + 1;
}
function shuffle(hint) {
  hint.sort(function (a, b) {
    return 0.5 - Math.random();
  });
  return hint;
}
function newGame() {
  playersGuess = null;
  game.attempts = 0;
  pastGuesses = [];
  titleText.textContent = "MY GUESSING GAME";
  currentStatus.textContent = "Guess a number between 1-100";
  game.winningNumber = generateWinningNumber();
  document.getElementById("guess-box").value = null;
  for (let attempt in guess) {
    guess[attempt].textContent = "-";
  }
  submitGuess.disabled = false;
  hintButton.disabled = false;
  guessBox.focus();
  guessBox.select();
}
function playersGuessSubmission(number) {
  if (number < 1 || number > 100 || typeof number !== "number") return false;
  else return number;
}
function isLower(number) {
  if (number < game.winningNumber) return true;
  else return false;
}
function isHigher(number) {
  if (number > game.winningNumber) return true;
  else return false;
}
function checkGuess(number) {
  if (pastGuesses.includes(number)) {
    currentStatus.textContent = "You already guessed that.";
  } else if (number === game.winningNumber) {
    titleText.textContent = "You Win!";
    currentStatus.textContent = "Congratulations!";
    guess[game.attempts].textContent = number;
    audio.play();
    submitGuess.disabled = true;
    hintButton.disabled = true;
  } else if (isLower(number)) {
    currentStatus.textContent = "Guess Higher!";
    guess[game.attempts].textContent = number;
    pastGuesses.push(number);
    game.attempts += 1;

    guessBox.value = null;
  } else if (isHigher(number)) {
    currentStatus.textContent = "Guess Lower!";
    guess[game.attempts].textContent = number;
    pastGuesses.push(number);
    game.attempts += 1;
    guessBox.value = null;
  } else return false;
  if (playersGuess) {
    let difference = Math.abs(playersGuess - game.winningNumber);
    if (difference) {
      if (difference < 10) {
        titleText.textContent = "You're burning up!";
      } else if (difference < 25) {
        titleText.textContent = "You're lukewarm.";
      } else if (difference < 50) {
        titleText.textContent = "You're a bit chilly.";
      } else if (difference >= 50) {
        titleText.textContent = "You're ice cold!";
      }
    }
  }
}
function provideHint() {
  let hint = shuffle([
    game.winningNumber,
    generateWinningNumber(),
    generateWinningNumber(),
  ]);
  titleText.textContent = `The winning number is either ${hint[0]}, ${hint[1]}, or ${hint[2]}.`;
  hintButton.disabled = true;
}

const hintButton = document.getElementById("hint");
const titleText = document.getElementById("title");
const playAgain = document.getElementById("play-again");
const submitGuess = document.getElementById("guess-button");
const currentStatus = document.getElementById("current-status");
const guess = document.querySelectorAll(".guess");
const guessBox = document.getElementById("guess-box");
const audio = new Audio("audio/grunt-birthday-party.mp3");
const audio2 = new Audio("audio/the-price-is-right-losing-horn.mp3");
guessBox.focus();
guessBox.select();

let game = {
  attempts: 0,
  winningNumber: generateWinningNumber(),
};

let pastGuesses = [];

hintButton.addEventListener("click", function () {
  provideHint();
});

playAgain.addEventListener("click", function () {
  newGame();
});

submitGuess.addEventListener("click", function () {
  playersGuess = playersGuessSubmission(Number(guessBox.value));
  if (!playersGuess) {
    currentStatus.textContent = "That is an invalid guess.";
  } else {
    checkGuess(playersGuess);
    hintButton.disabled = false;
  }
  if (game.attempts >= 5) {
    submitGuess.disabled = true;
    hintButton.disabled = true;
    titleText.textContent = `You Lose!`;
    currentStatus.textContent = `Game Over - Try Again! The Winning Number was: ${game.winningNumber}`;
    audio2.play();
  }
});

document.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    if (submitGuess.disabled) {
      newGame();
    } else if (!submitGuess.disabled) {
      playersGuess = playersGuessSubmission(Number(guessBox.value));
      if (!playersGuess) {
        currentStatus.textContent = "That is an invalid guess.";
      } else {
        checkGuess(playersGuess);
      }
      if (game.attempts >= 5) {
        submitGuess.disabled = true;
        hintButton.disabled = true;
        titleText.textContent = `You Lose!`;
        currentStatus.textContent = `Game Over - Try Again! The Winning Number was: ${game.winningNumber}`;
        audio2.play();
      }
    }
  }
});

// else if (checkGuess(playersGuess) === "You Win!") {
//   titleText.textContent = "You Win!";
//   currentStatus.textContent = "Congratulations!";
//   guess[attempts].textContent = playersGuess;
//   submitGuess.disabled = true;
// } else if (isLower(playersGuess)) {
//   currentStatus.textContent = "Guess Higher!";
//   guess[attempts].textContent = playersGuess;
//   attempts += 1;
// } else if (isHigher(playersGuess)) {
//   currentStatus.textContent = "Guess Lower!";
//   guess[attempts].textContent = playersGuess;
//   attempts += 1;
// }
// Number(document.getElementById("guess-box").value)
// change text color based on Warming Up or Cooling Off (red v blue)
