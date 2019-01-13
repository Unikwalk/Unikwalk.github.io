var famousSingers = ["footloose", "grenade", "promiscuous", 
"ghostbusters", "believe", "firework", "unwritten","vogue", "waterfalls",
"radioactive", "irreplaceable", "royals", "apologize", "yeah", "macarena", "breathe"];
var win = 0;
var loss = 0;
var guess = 10;
var chosenWord = "";
var lettersInChosenWord = [];
var numberOfDashes = 0;
var wordInDashes = [];
var wrongLetters = [];


function gameStart() {
  guess = 10;
  chosenWord = famousSingers[Math.floor(Math.random() * famousSingers.length)];
  lettersInChosenWord = chosenWord.split("");
  numberOfDashes= lettersInChosenWord.length;
  //console.log(chosenWord);
  wordInDashes= [];
  wrongLetters = [];

  for (var i = 0; i < numberOfDashes; i++) {
    wordInDashes.push("_");
  }

  //console.log(wordInDashes);

  $('#guess').text(guess)
  $('#wordInDashes').text(wordInDashes.join(" "))
  $('#wrongLetters').text(wrongLetters.join(" "))
}

function checkLetters(letter) {
  var letterInWord = false;
  for (var i = 0; i < numberOfDashes; i++) {
    if (chosenWord[i] === letter) {
      letterInWord = true;
    }
  }

  if (letterInWord) {
    for (var j = 0; j < numberOfDashes; j++) {
      if (chosenWord[j] === letter) {
        wordInDashes [j] = letter;
      }
    }
    //console.log(wordInDashes);
  }
  else {
    wrongLetters.push(letter);
  }
  //console.log(wrongLetters)
  guess--;
}

function gameFinished() {

  //console.log("WinCount: " + win + " | LossCount: " + loss + " | guess: " + guess);

  $('#guess').text(guess)
  $('#wordInDashes').text(wordInDashes.join(" "))
  $('#wrongLetters').text(wrongLetters.join(" "))

  if (lettersInChosenWord.toString() === wordInDashes.toString()) {
    win++;
    alert("You win!");
    $('#win').text(win)
    //gameStart();
  }
  else if (guess === 0) {
    loss++;
    alert("You lose");
    $('#loss').text(loss)
    //gameStart();
  }

}

gameStart();

document.onkeyup = function(event) {
  var letterGuessed = String.fromCharCode(event.which).toLowerCase();
  //event.which spits out the pressed key as a number
  //fromCharCode converts that number into the equivalent letter (it's capitalized)
  checkLetters(letterGuessed);
  gameFinished();
};

$("#playAgain").on("click", function() {
  gameStart();
});