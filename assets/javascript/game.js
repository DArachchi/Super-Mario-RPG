var game = {
	characters: [
		mario = {
			attack: "8",
			health: "120",
			name: "Mario",
			src: "assets/images/Mario.png"
		},
		luigi = {
			attack: "5",			
			health: "100",
			name: "Luigi",
			src: "assets/images/Luigi.png"
		},
		yoshi = {
			attack: "20",			
			health: "150",
			name: "Peach",
			src: "assets/images/Yoshi.png"
		},
		dk = {
			attack: "25",			
			health: "180",
			name: "Yoshi",
			src: "assets/images/DK.png"
		}
	],

	attackFunction: function() {
		game.currentDefender.health = game.currentDefender.health - game.chosenCharacter.currentAttackPower;
		$(game.currentDefender).html(game.currentDefender.id).append("<br><img class='characterImage' src='assets/images/Mario.png'>").append("<br>Health: ").append(game.currentDefender.health);
		$("#gameArea").html("<br>You attacked " + game.currentDefender.id + " for " + game.chosenCharacter.currentAttackPower + " damage.<br>" + game.currentDefender.id + " attacked you back for " + game.currentDefender.currentAttackPower + " damage.");
		game.chosenCharacter.currentAttackPower = game.chosenCharacter.currentAttackPower + game.chosenCharacter.initalAttackPower;

		if (game.currentDefender.health <= 0) {
			game.winCounter = game.winCounter + 1;
			$("#gameArea").html("You have defeated " + game.currentDefender.id + ". Choose another enemy to attack.")
			$(game.currentDefender).remove();
			$(".attackButton").remove();
			game.defenderLock = false;
		} else {
			game.chosenCharacter.health = game.chosenCharacter.health - game.currentDefender.currentAttackPower;
		}

		if (game.winCounter === game.characters.length - 1) {
			$("#gameArea").html("<h1 class='resultWin'>Congratulations... you won!</h1>").append("<button class='restartButton'>Restart</button>");
		}

		$(game.chosenCharacter).html(game.chosenCharacter.id).append("<br><img class='characterImage' src='assets/images/Mario.png'>").append("<br>Health: ").append(game.chosenCharacter.health);
		if (game.chosenCharacter.health <= 0) {
			$("#gameArea").html("<br><h1 class='resultLoss'>You have been defeated... GAME OVER!!!</h1>").append("<button class='restartButton'>Restart</button>")
			$(".attackButton").remove();
		}
	},

	chooseCharacter: function() {
		game.chosenCharacter.currentAttackPower = game.chosenCharacter.initalAttackPower;
		$("#instructions").hide();
		$("#enemies").append($("button.characterButton"));
		$("#yourCharacter").append(game.chosenCharacter);	
	},

	chooseEnemy: function() {
		game.defenderLock = true;
		$("#defender").append(game.currentDefender);
		var attack = $("<button class='attackButton'>Attack</button>");
		$("#fight").append(attack);
		$("#gameArea").html("");
	},

	newGame: function() {
		game.defenderLock = false;
		game.winCounter = 0;
		$("#gameArea").html("");
		$(".characterButton").remove();
		$("#instructions").show();
		var characterButton;

		$.each(game.characters, function() {
			var characterButton = $("<button class='characterButton'>");
			characterButton.attr("id", this.name).attr("data-attack", this.attack).attr("data-health", this.health).attr("data-image", this.src);
			characterButton.append(this.name).append("<br><img class='characterImage' src='assets/images/Mario.png'>").append("<br>Health: ").append(this.health);
			$("#characterSelection").append(characterButton);
		})
	}
}	

$(document).ready(function(){
	game.newGame();

	$("#characterSelection").on("click", ".characterButton", function(){
		game.chosenCharacter = this;
		game.chosenCharacter.image = $(this).data("image");
		game.chosenCharacter.initalAttackPower = $(this).data("attack");
		game.chosenCharacter.health = $(this).data("health");
		game.chooseCharacter();
	});	

	$("#enemies").on("click", ".characterButton", function(){
		if (game.defenderLock === false) {
			game.currentDefender = this;
			game.currentDefender.image = $(this).data("image");
			game.currentDefender.currentAttackPower = $(this).data("attack");
			game.currentDefender.health = $(this).data("health");
			game.chooseEnemy();
		}
	});

	$(document).on("click", ".attackButton", function(){
		game.attackFunction();
	});

	$(document).on("click", ".restartButton", function() {
		game.newGame();
	})
})