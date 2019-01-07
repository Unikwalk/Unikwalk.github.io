var arr = ["r","p","s"];
var win = 0;
var loss = 0;
var tie = 0;

document.onkeyup = function (event) {
  var userChoice= event.key.toLowerCase();
  var compChoice = arr[Math.floor(Math.random()*arr.length)];

  document.getElementById("user-choice").textContent = "You chose: " + userChoice.toUpperCase();
  document.getElementById("comp-choice").textContent = "Computer chose: " + compChoice.toUpperCase();

  if ((userChoice === "r") || (userChoice === "p") || (userChoice === "s")) {

    // Alert the userChoice and computerGuess
    alert("Your Choice: " + userChoice.toUpperCase());
    alert("Computer's Choice: " + compChoice.toUpperCase());

    if (userChoice === compChoice) {
      tie++;
      document.getElementById("tie").textContent = "Ties: " + tie;
    };
    
    if ((userChoice === "r" && compChoice === "s") || (userChoice === "s" && compChoice === "p") || (userChoice === "p" && compChoice === "r")) {
      win++;
      document.getElementById("win").textContent = "Wins: " + win;
    };

    if ((userChoice === "s" && compChoice === "r") || (userChoice === "p" && compChoice === "s") || (userChoice === "r" && compChoice === "p")) {
      loss++;
      document.getElementById("loss").textContent = "Losses: " + loss;
    };
  };
};