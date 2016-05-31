$(document).ready(function(){

		money = 100;
		bet   = 0;
		guess = 1;
		num   = 0;

		var $total           = $("#total");
		var $bank            = $("#bank");
		var $betForm         = $("#bet");
		var $guessForm       = $("#guess");
		var $betMessage      = $("#bet-message");
		var $guessMessage    = $("#guess-message");
		var $winLoseMessage  = $("#win-lose-message");
		var $startOverButton = $("#start-over-button");

		// Load up the #bank and #total
		// with dollar signs and the starting amount;
		$bank.html(Array(money).join("$ "));
		$total.html("$" + money + ".00");

		$("span.ready").on("click", function(){
			$("#bet > input").fadeIn();
			$("#bet_button").slideDown();
			play();
			$betMessage.fadeOut(300, function(){
				$betMessage.html("What do you want to bet?").fadeIn(300);
			});
		});

		function play(){

			$betForm.submit(function(event){
				bet = $("#bet-value").val();
				bet = Number(bet);

				if (bet < 5 || bet > 10) {
					$betMessage.html("Sorry, you have to bet between $5 and $10, no cents.");
				} else {
					num = generateNum();
					$betForm.hide();
					$betMessage.html("What do you want to bet?").fadeIn();
					$guessForm.show();
				}
				$guessMessage.html("Pick a value between 1 and 10").fadeIn();
				$("#bet-value").val("");
				$("#guess-value").val("");
				event.preventDefault();

			});

			$guessForm.submit(function(event){
				guess = $("#guess-value").val();
				guess = Number(guess);

				if (guess == num) {
					$winLoseMessage.addClass("success");
					$winLoseMessage.html("WINNER!!! You won $" + bet + ".00! You now have $" + addMoney(bet) + ".00.");
				} else if (guess == num-1 || guess == num+1) {
					$winLoseMessage.html("Close! The number was " + num + ". You still have $" + money  + ".00.");
				} else if (money < 0) {
					$winLoseMessage.html(":( You've run out of money.");
				} else {
					$winLoseMessage.html("WRONG... The number was " + num + ". You lost $" + bet + ".00. You now have $" + removeMoney(bet) + ".00.");
				}

				$guessForm.hide();
				$("#guess_value").val("");

				$("#bet_value").val("");
				$betForm.show();

				$("#total").html("$" + money + ".00");

				if (money < 0){
					$(form).hide();
					$winLoseMessage.html(":( You've run out of money.");
				}
				event.preventDefault();
			});
		}

		function generateNum(){
			return Math.floor((Math.random() * 10) + 1);
		}

		function addMoney(bet){
			money += Number(bet);
			checkMoney();
			return money;
		}

		function removeMoney(bet){
			money -= Number(bet);
			checkMoney();
			return money;
		}

		function checkMoney(){
			if (money <= 0) {
				money = 0;
				$bank.html("");
				$startOverButton.fadeTo("fast", 1);
			} else {
				$bank.html(Array(money+1).join("$ "));
			}
		}

});
