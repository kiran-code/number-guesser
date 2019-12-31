console.log('Number Guesser Game')

/* GAME FUNCTION 
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of correct answers if loose
- Let player choose to play again
*/

// Game values
let min = 15,
    max = 20,
    guessesLeft,
    winningNumber,
    startGame = false;
    
       
// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessInput = document.querySelector('#guess-input'),
      guessBtn = document.querySelector('#guess-btn'),
      message = document.querySelector('.message');

// Assign UI min and max

minNum.textContent = min;
maxNum.textContent = max;

// Set message function
const setMessage = (msg, color) => {
  message.style.color = color;
  message.textContent = msg;
}

restartGame(min, max); 

// generate random number and reset the counter to 3
function restartGame(){
  guessesLeft = 3;
  winningNumber = Math.floor(Math.random() * (max-min + 1)) + min;
  console.log('winningNumber ',winningNumber);
  setMessage(`You have 3 chances to guess the correct number`, 'green');
}

const gameOver = (won, msg) => {
  let color;
  won === true? color = 'green': color = 'red';
  startGame = true;
  guessInput.disabled = true;
  guessBtn.textContent = 'Play again';
  setMessage(msg, color);
  guessInput.style.borderColor = color;
}

// Listen for guess
guessBtn.addEventListener('click', () => {
  if(startGame) {
    startGame = false;
    guessInput.disabled = false;
    guessInput.value = '';
    guessInput.focus();
    guessBtn.textContent = 'Submit';
    guessInput.style.borderColor = 'green';
    restartGame(min, max);
  } else {
    let guess = parseInt(guessInput.value);
    if(isNaN(guess) || (guess < min) || (guess > max)) {
      setMessage(`Please enter a number between ${min} and ${max}`, 'red');
      guessInput.style.borderColor = 'red';
      guessInput.value = '';
      return;
    }

    if(guess === winningNumber){
      gameOver(true, 'You won!!!');
    } else {
      startGame = false;
      guessesLeft--;
      if(guessesLeft == 0) {
        gameOver(false, `Game Over, You Lost. The correct number was ${winningNumber}`);
      } else {
        guessInput.value = '';
        guessInput.focus();
        setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
        guessInput.style.borderColor = 'red';
      }
    }
  }
});
