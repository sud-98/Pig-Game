/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach Final Score points on GLOBAL score wins the game
- Default Fianal Score is 100 if not set by the user
- A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn.

*/
let scores, activePlayer, roundScore, gamePlaying, previousScore;

init();

//button roll
document.querySelector('.btn-roll').addEventListener('click', function(){
	if (gamePlaying){
		//generate random number
		let dice = Math.floor(Math.random()*6)+1;

		//let display the result
		let diceDOM = document.querySelector('.dice');
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-'+dice+'.png';
		
		//if previous and current score are 6 then remove all scores
		if (previousScore==6 && dice == 6){
			scores[activePlayer] = 0;
			document.querySelector('#score-'+activePlayer).textContent = 0;
			nextPlayer();
		}
		//add the result of the dice to the current score if not 1
		else if (dice>1){
			//Add to score
			roundScore += dice;
			document.querySelector('#current-'+activePlayer).textContent = roundScore;
		}

		else{
			nextPlayer();
		}
		previousScore = dice;
	}
// Anonymous function for click ends here
});


//button hold
document.querySelector('.btn-hold').addEventListener('click', function(){
	if (gamePlaying){
		//add the current round score to global score of the current player
		scores[activePlayer] += roundScore;
		document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];

		//check for user input value 
		let input = document.querySelector('.finalScore').value;
		let winScore;

		if (input){
			winScore = input;
		}
		else{
			winScore = 100;
		}

		//check if player won the game
		if (scores[activePlayer] >= winScore){
			document.querySelector('#name-'+activePlayer).textContent = "Winner!!";
			document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
			document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
			gamePlaying = false;
		}
		else{
			//change the current player
			nextPlayer();
		}
	}
	
});

//next player function
function nextPlayer(){
	//Next player's turn
		roundScore = 0;
		activePlayer == 0 ? activePlayer = 1 : activePlayer = 0;

		// document.querySelector('.player-0-panel').classList.remove('active');
		// document.querySelector('.player-1-panel').classList.add('active');


		//these 2 lines below changes the current active palyer background to 
		//the other player using class property active
		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');

		// change the current round score back to zero
		document.getElementById('current-0').textContent = '0';
		document.getElementById('current-1').textContent = '0';

		//set the dice back to none
		document.querySelector('.dice').style.display = 'none';
}

//button New game
document.querySelector('.btn-new').addEventListener('click',init);
// here we are not using init() to call init bcoz init() will directly call the 
// function but we want the event listener to call the function on click not directly

function init(){
	scores = [0,0];
	previousScore = 0;
	roundScore = 0;
	gamePlaying = true;

	// 0 means the first player or player0 bcoz scores array is 0 based
	activePlayer = 0;

	document.querySelector('.dice').style.display = 'none';

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'PLAYER 1';
	document.getElementById('name-1').textContent = 'PLAYER 2';

	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}