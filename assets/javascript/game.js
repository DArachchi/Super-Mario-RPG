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
			src: "assets/images/Luigi.jpg"
		},
		peach = {
			attack: "20",			
			health: "150",
			name: "Peach",
			src: "assets/images/Peach.jpg"
		},
		yoshi = {
			attack: "25",			
			health: "180",
			name: "Yoshi",
			src: "assets/images/Yoshi.jpg"
		}
	],

	startGame: function() {
		game.characterLock = false;
		game.defenderLock = false;
		game.defeatedCounter = 0;
		$(".characterButton").remove();
		var characterButton;

		$.each(game.characters, function(i, val) {
			var characterButton = $("<button class='characterButton'>");
			characterButton.attr("id", this.name).attr("data-attack", this.attack).attr("data-health", this.health);
			characterButton.append(this.name).append("<br>Health: ").append(this.health);
			$("#characterSelection").append(characterButton);
		})
	}
}	

$(document).ready(function(){
	game.startGame();

	$(document).on("click", ".characterButton", function(){
		if (game.characterLock === false){
			game.characterLock = true;
			game.chosenCharacter = this;
			game.chosenCharacter.initalAttackPower = $(this).data("attack");
			game.chosenCharacter.currentAttackPower = game.chosenCharacter.initalAttackPower;
			game.chosenCharacter.health = $(this).data("health");
			$("#enemies").append($("button.characterButton"));
			$("#yourCharacter").append(game.chosenCharacter);
		}
		if (game.characterLock === true && game.defenderLock === false && this != game.chosenCharacter) {
			game.defenderLock = true;
			game.currentDefender = this;
			game.currentDefender.currentAttackPower = $(this).data("attack");
			game.currentDefender.health = $(this).data("health");
			$("#defender").append(game.currentDefender);
			var attack = $("<button class='attackButton'>Attack</button>");
			$("#fight").append(attack);
			$("#gameArea").html("");
		}
	});

	$(document).on("click", ".attackButton", function(){
		game.currentDefender.health = game.currentDefender.health - game.chosenCharacter.currentAttackPower;
		$(game.currentDefender).html(game.currentDefender.id).append("<br>Health: ").append(game.currentDefender.health);
		$("#gameArea").html("<br>You attacked " + game.currentDefender.id + " for " + game.chosenCharacter.currentAttackPower + " damage.<br>" + game.currentDefender.id + " attacked you back for " + game.currentDefender.currentAttackPower + " damage.");
		game.chosenCharacter.currentAttackPower = game.chosenCharacter.currentAttackPower + game.chosenCharacter.initalAttackPower;

		if (game.currentDefender.health <= 0) {
			game.defeatedCounter = game.defeatedCounter + 1;
			$("#gameArea").html("You have defeated " + game.currentDefender.id + ". Choose another enemy to attack.")
			$(game.currentDefender).remove();
			$(".attackButton").remove();
			game.defenderLock = false;
		} else {
			game.chosenCharacter.health = game.chosenCharacter.health - game.currentDefender.currentAttackPower;
		}

		if (game.defeatedCounter === game.characters.length - 1) {
			$("#gameArea").html("<h1>YOU WIN!</h1>").append("<button class='restartButton'>Restart</button>");
		}

		$(game.chosenCharacter).html(game.chosenCharacter.id).append("<br>Health: ").append(game.chosenCharacter.health);
		if (game.chosenCharacter.health <= 0) {
			$("#gameArea").html("You have been defeated... GAME OVER!!!").append("<button class='restartButton'>Restart</button>")
			$(".attackButton").remove();
		}
	});

	$(document).on("click", ".restartButton", function() {
		$(game.chosenCharacter).remove();
		$("#gameArea").html("");
		game.startGame();
	})

})