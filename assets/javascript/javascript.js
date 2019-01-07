$(document).ready(function() {
	var yourNumber;
	var totalScore = 0;
	var win = 0;
	var loss = 0;
	var crystal1Num;
	var crystal2Num;
	var crystal3Num;
	var crystal4Num;

	function newNumbers() {
		yourNumber = Math.floor(Math.random() * (120 - 19)) + 19; //Math.random() * (max-min) + min; generate numbers between 19 and 120
		crystal1Num = Math.floor(Math.random() * (12 - 1)) + 1; //generate numbers between 1 and 12
		crystal2Num = Math.floor(Math.random() * (12 - 1)) + 1;
		crystal3Num = Math.floor(Math.random() * (12 - 1)) + 1;
		crystal4Num = Math.floor(Math.random() * (12 - 1)) + 1;
	}

	function newGame() {
		newNumbers();
		totalScore = 0;
		$("#yourNumber").text(yourNumber);
		$("#totalScore").text(totalScore);
		$("#crystal1").attr("data-crystalvalue", crystal1Num);
		$("#crystal2").attr("data-crystalvalue", crystal2Num);
		$("#crystal3").attr("data-crystalvalue", crystal3Num);
		$("#crystal4").attr("data-crystalvalue", crystal4Num);
		$("#win").text(win);
		$("#loss").text(loss);
		$("#winOrLose").text("");
	}

	function youWin() {
		$("#winOrLose").text("YOU WIN!");
		win++;
		$("#win").text(win);
	}

	function youLose() {
		$("#winOrLose").text("YOU LOSE");
		loss++;
		$("#loss").text(loss);
	}

	newGame();

	$(".crystalimg").hover(function() {
		$(this).css({opacity: 0.3});
	},
	function() {
		$(this).css({opacity: 1});
	}); //Styling function for crystals, 0.3 when hovered then return to 1

	// Add the crystal values together
	$(".crystalimg").on("click", function() {

		if (totalScore >= yourNumber) {
			return;
		}

		var crystalValue = $(this).attr("data-crystalvalue"); //assign the random number of each crystal to crystalValue
		crystalValue = parseInt(crystalValue); //turn the number string to an integer
        totalScore += crystalValue; //add each crystal value to totalScore
        //console.log(totalScore);
		$("#totalScore").text(totalScore);

		if (totalScore === yourNumber) {
			youWin();
		} else if (totalScore > yourNumber) {
			youLose();
		}
	});

	$("#playAgain").on("click", function() {
		newGame();
	});

});