	// Initialize Firebase
    var config = {
        apiKey: "AIzaSyCmqDxHpYUA8MVfDtCDDaH1odtmgmTAU2A",
        authDomain: "rock-paper-scissors-game-36c7e.firebaseapp.com",
        databaseURL: "https://rock-paper-scissors-game-36c7e.firebaseio.com",
        projectId: "rock-paper-scissors-game-36c7e",
        storageBucket: "rock-paper-scissors-game-36c7e.appspot.com",
        messagingSenderId: "705858861129"
    };
    firebase.initializeApp(config);

	var database = firebase.database();

	var p1Wins;
	var p1Losses;
	var p1Name;
	var p1Choice;

	var p2Wins;
	var p2Losses;
	var p2Name;
	var p2Choice;

	var tie = 0;
	var playerTurn;
	var whoAmI = "none";

    database.ref().on("value", function(snapshot) {

    	// Determine player's turn:
    	if(snapshot.val().db_playerTurn !== undefined) {
    		playerTurn = snapshot.val().db_playerTurn;
    	}
    	// If the database doesn't know whose turn it is, create it
    	else {
    		database.ref().update({
    			db_playerTurn: 1
    		});
    	}

		// display p1 stats
		if(snapshot.val().db_p1Name !== undefined) {
			$("#player1Name").text(snapshot.val().db_p1Name);
			$("#player1Wins").text("Wins: " + snapshot.val().db_p1Wins);
			$("#player1Losses").text("Losses: " + snapshot.val().db_p1Losses);
		}
		// if p2 left, p1 waits
		else if(snapshot.val().db_p1Name === undefined && snapshot.val().db_p2Name !== undefined) {
			$("#p2c1").text(" ");
			$("#p2c2").text(" ");
			$("#p2c3").text(" ");
			$("#gameStats").text("Waiting for a new opponent...");
			$("#player1Name").text("Empty Seat");
			$("#player1Wins").text(" ");
			$("#player1Losses").text(" ");
		}
		else {
			$("#player1Name").text("Empty Seat");
			$("#player1Wins").text(" ");
			$("#player1Losses").text(" ");
		}

		// display p2 Stats, repeat for p2
		if(snapshot.val().db_p2Name !== undefined) {
			$("#player2Name").text(snapshot.val().db_p2Name);
			$("#player2Wins").text("Wins: " + snapshot.val().db_p2Wins);
			$("#player2Losses").text("Losses: " + snapshot.val().db_p2Losses);
		}

		else if(snapshot.val().db_p2Name === undefined && snapshot.val().db_p1Name !== undefined) {
			$("#p1c1").text(" ");
			$("#p1c2").text(" ");
			$("#p1c3").text(" ");
			$("#gameStats").text("Waiting for a new opponent...");
			$("#player2Name").text("Empty Seat");
			$("#player2Wins").text(" ");
			$("#player2Losses").text(" ");
		}
		else {
			$("#player2Name").text("Empty Seat");
			$("#player2Wins").text(" ");
			$("#player2Losses").text(" ");
		}

		// if both players are active
		if(snapshot.val().db_p1Name !== undefined && snapshot.val().db_p2Name !== undefined) {
			var rock = $("<img>").attr({
				"src": "assets/images/Rock.png",
				"width": 150,
				"height": 150
			});
			var paper = $("<img>").attr({
				"src": "assets/images/Paper.png",
				"width": 150,
				"height": 150
			});
			var scissors = $("<img>").attr({
				"src": "assets/images/Scissors.png",
				"width": 150,
				"height": 150
			});
			// if turn = 1
			if(snapshot.val().db_playerTurn === 1) {
				if(whoAmI === "player1") {
					// let player1 choose
					$(".player1Rock").append(rock);
					$(".player1Paper").append(paper);
					$(".player1Scissors").append(scissors);
					$("#gameStats").text("Choose your weapon!");
					$("#p2c1").text(" ");
				}
				else {
					$("#gameStats").text("Waiting for Player 1 to choose");
					$("#p1c1").text(" ");
					$("#p2c1").text(" ");
				}
			}
			// if turn = 2
			else if(snapshot.val().db_playerTurn === 2) {
				if(whoAmI === "player2") {
					// let player2 choose
					$(".player2Rock").append(rock);
					$(".player2Paper").append(paper);
					$(".player2Scissors").append(scissors);
					$("#gameStats").text("Choose your weapon!");
					$("#p1c1").text(" ");
				}
				else {
					$("#gameStats").text("Waiting for Player 2 to choose");
					$("#p1c1").text(" ");
					$("#p2c1").text(" ");
				}
			}
			// else
			else if(snapshot.val().db_playerTurn === 0) {
				// Display all results
				p1Choice = snapshot.val().db_p1Choice;
				p2Choice = snapshot.val().db_p2Choice;
				$("#p1c1").text(p1Choice);
				$("#p2c1").text(p2Choice);

				$("#p1Image").html('<img src="assets/images/' + p1Choice + '.png" alt="' + p1Choice + '" class="img img-responsive" />');
				$("#p2Image").html('<img src="assets/images/' + p2Choice + '.png" alt="' + p2Choice + '" class="img img-responsive" />');

				// If player 1 wins
				if((p1Choice === "Rock" && p2Choice === "Scissors") || (p1Choice === "Paper" && p2Choice === "Rock") || (p1Choice === "Scissors" && p2Choice === "Paper")) {
					$("#gameStats").text("PLAYER 1 WINS!");
					if(whoAmI === "player1") {
						p1Wins = snapshot.val().db_p1Wins;
						p1Wins++;
						p2Losses = snapshot.val().db_p2Losses;
						p2Losses++;
						tie = tie;
						playerTurn = 3;
						database.ref().update({
							db_p1Wins: p1Wins,
							db_p2Losses: p2Losses,
							db_playerTurn: playerTurn
						});
					}
					$("#player1Wins").text("Wins: " + p1Wins);
					$("#player2Losses").text("Losses: " + p2Losses);
				}
				// Else if player 2 wins
				else if((p2Choice === "Rock" && p1Choice === "Scissors") || (p2Choice === "Paper" && p1Choice === "Rock") || (p2Choice === "Scissors" && p1Choice === "Paper")) {
					$("#gameStats").text("PLAYER 2 WINS!");

					if(whoAmI === "player1") {
						p2Wins = snapshot.val().db_p2Wins;
						p2Wins++;
						p1Losses = snapshot.val().db_p1Losses;
						p1Losses++;
						tie = tie;
						playerTurn = 3;
						database.ref().update({
							db_p2Wins: p2Wins,
							db_p1Losses: p1Losses,
							db_playerTurn: playerTurn
						});
					}
					$("#player2Wins").text("Wins: " + p2Wins);
					$("#player1Losses").text("Losses: " + p1Losses);
				}
				// draw
				else {
					tie++;
					$("#gameStats").text("IT'S A DRAW!");
					$("#tie1").text(tie);
					$("#tie2").text(tie);
				}
				// timeout for 3 seconds & reset playerturn to 1
				setTimeout(resetPlayerTurn, 3000);
			}
		}

	    // if a new user arrives & no p1, user can become p1
		if(whoAmI === "none" && snapshot.val().db_p1Name === undefined) {
			displayPlayerInput("player1");
			resetPlayerTurn();
		}
		// If a new user arrives & p1 exists but no p2, user can become p2
		else if(whoAmI === "none" && snapshot.val().db_p2Name === undefined) {
			displayPlayerInput("player2");
			resetPlayerTurn();
		}
		// If both p1 & p2 exist, new user waits
		else if(whoAmI === "none") {
			displayPlayerName();
		}

    	p1Choice = snapshot.val().db_p1Choice;
    }, function(errorObject) {
    	console.log("The read failed: " + errorObject.code);
    });

    // When a user clicks on one of the 3 choices,
	$(document).on("click", ".choice", function() {
		var decision = $(this).attr("data-val");
		//p1 turn
		if(playerTurn === 1) {
			playerTurn = 2;
			database.ref().update({
				db_p1Choice: decision,
				db_playerTurn: playerTurn
			});
			$(".player1Rock").text(" ");
			$(".player1Paper").text (" ");
			$(".player1Scissors").text (" ");
		}
		//p2 turn
		else if(playerTurn === 2) {
			// reset turn to 0
			playerTurn = 0;
			database.ref().update({
				db_p2Choice: decision,
				db_playerTurn: playerTurn
			});

			$(".player2Paper").text (" ");
			$(".player2Scissors").text (" ");
		}
	});

	// If a user inputs a name & pressed "Play"
	$(document).on("click", ".btnPlayerNameInput", function(event) {
		event.preventDefault();

		playerTurn = 1;

		// P1
		if($(this).attr("id") === "player1") {
			p1Name = $("#playerNameInput").val().trim();
			database.ref().update({
				db_p1Name: p1Name,
				db_p1Wins: 0,
				db_p1Losses: 0,
				db_playerTurn: playerTurn
			});
			
			// Identify which player the user is & draw the player's side of the board
			whoAmI = "player1";
			displayPlayerName();
		}
		// P2
		else if($(this).attr("id") === "player2") {
			p2Name = $("#playerNameInput").val().trim();
			database.ref().update({
				db_p2Name: p2Name,
				db_p2Wins: 0,
				db_p2Losses: 0,
				db_playerTurn: playerTurn
			});

			whoAmI = "player2";
			displayPlayerName();
		}
	});

	// Resets the player's turn to 1
	function resetPlayerTurn() {
		database.ref().update({
			db_playerTurn: 1
		});
		$("#p1Image").html(" ");
		$("#p2Image").html(" ");
	}

	// Design player's area
	function displayPlayerInput(whichPlayer) {
    	$("#playerIntro").html(
			'<form class="form-inline">'
		+		'<div class="form-group">'
		+			'<input type="text" class="form-control" id="playerNameInput" placeholder="Your Name">'
		+		'</div>'
		+		'<button type="submit" class="btn btn-default btnPlayerNameInput" id="' + whichPlayer + '">Start</button>'
		+	'</form>'
		);
	}

	// Shows the player which seat they're in, or if they're spectating
	function displayPlayerName() {
		if(whoAmI === "none") {
			$("#playerIntro").html("You are currently spectating.");
		}
		else if(whoAmI === "player1") {
			$("#playerIntro").html("Hi, " + p1Name + "! You are player 1.");
			$("#p1c1").addClass("player1Rock");
			$("#p1c2").addClass("player1Paper");
			$("#p1c3").addClass("player1Scissors");
		}
		else if(whoAmI === "player2") {
			$("#playerIntro").html("Hi, " + p2Name + "! You are player 2.");
			$("#p2c1").addClass("player2Rock");
			$("#p2c2").addClass("player2Paper");
			$("#p2c3").addClass("player2Scissors");
		}
	}

	$(document).on("click", "#chatSubmit", function(event) {
		event.preventDefault();

		var chatText = $("#inputChatText").val().trim();
		var myName = "Spectator";

		if(whoAmI === "player1") {
			myName = p1Name;
		}
		else if(whoAmI === "player2") {
			myName = p2Name;
		}

		database.ref().push({
			db_chatName: myName,
			db_chatType: whoAmI,
			db_chatText: chatText
		});
		$("#inputChatText").val(" ");
	});

	database.ref().on("child_added", function(snapshot) {
		var chatType = snapshot.val().db_chatType;
		var chatName = snapshot.val().db_chatName;
		var chatText = snapshot.val().db_chatText;


		if(chatType === "player1") {
			$("#chatTextArea").prepend(chatName + ": " + chatText + '\r\n');
		}
		else if(chatType === "player2") {
			$("#chatTextArea").prepend(chatName + ": " + chatText + '\r\n');
		}
		else if(chatType === "none") {
			$("#chatTextArea").prepend(chatName + ": " + chatText + '\r\n');
		}
	});


	// When the user left, seat becomes empty
	$(window).unload(function(){

		if(whoAmI === "player1") {
			database.ref().update({
				db_p1Name: null,
				db_p1Wins: 0,
				db_p1Losses: 0
			});
		}
		else if(whoAmI === "player2") {
			database.ref().update({
				db_p2Name: null,
				db_p2Wins: 0,
				db_p2Losses: 0
			});
		}
	});