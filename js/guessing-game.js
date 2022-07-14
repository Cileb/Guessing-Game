/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "npm test".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/
let attempts = 0;
let guessNumber = Math.floor(Math.random() * 100) + 1;
const guessBox = document.getElementById("guess-box").value;
const submitGuess = document.getElementById("guess-button");
const playAgain = document.getElementById("play-again");
const guess = document.querySelectorAll(".guess");
const currentStatus = document.getElementById("current-status");

const hintButton = document.getElementById("hint");
console.log(guessNumber);

hintButton.addEventListener("click", function () {
  let hint = [
    guessNumber,
    Math.floor(Math.random() * 100 + 1),
    Math.floor(Math.random() * 100 + 1),
  ];
  hint.sort(function (a, b) {
    return 0.5 - Math.random();
  });
  if (attempts > 0) {
    titleText.textContent = `The winning number is either ${hint[0]}, ${hint[1]}, or ${hint[2]}.`;
  } else {
    titleText.textContent = "At least try before I give you a hint!";
  }
});

playAgain.addEventListener("click", function () {
  location.reload();
});

submitGuess.addEventListener("click", function () {
  let currentGuess = document.getElementById("guess-box").value;
  if (currentGuess) {
    if (Math.abs(currentGuess - guessNumber)) {
      if (Math.abs(currentGuess - guessNumber) < 10) {
        titleText.textContent = "You're burning up!";
      } else if (Math.abs(currentGuess - guessNumber) < 25) {
        titleText.textContent = "You're lukewarm.";
      } else if (Math.abs(currentGuess - guessNumber) < 50) {
        titleText.textContent = "You're a bit chilly.";
      } else if (Math.abs(currentGuess - guessNumber) >= 50) {
        titleText.textContent = "You're ice cold!";
      }
    }
  }
  if (currentGuess < 1 || currentGuess > 100) {
    currentStatus.textContent = "That is an invalid guess.";
  } else if (currentGuess > guessNumber) {
    currentStatus.textContent = "Guess Lower!";
    guess[attempts].textContent = currentGuess;
    attempts += 1;
  } else if (currentGuess < guessNumber) {
    currentStatus.textContent = "Guess Higher!";
    guess[attempts].textContent = currentGuess;
    attempts += 1;
  } else if (currentGuess == guessNumber) {
    titleText.textContent = `You Win! The winning number was ${guessNumber}.`;
    currentStatus.textContent = `PLAY AGAIN?`;
    guess[attempts].textContent = currentGuess;
    submitGuess.disabled = true;
  }
  if (attempts >= 5) {
    titleText.textContent = `You Lose!`;
    currentStatus.textContent = "Game Over - Try Again!";
    submitGuess.disabled = true;
  }
});
