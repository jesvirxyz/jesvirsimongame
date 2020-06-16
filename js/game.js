var buttonColours = ['red','blue','green','yellow'];
var gamePattern = [];
var userClickedPattern = [];
var randomChosenColour
var level = 0;

function playSound(name){
	let audio = new Audio('./sounds/'+name+'.mp3');
	audio.play();
}

function blink_text(rndmClr){
	$('#'+rndmClr).fadeOut(100).fadeIn(100).fadeIn(100);
}


$('.btn').on('click', function() {
	var userChosenColour = this.id;

	animatePress(userChosenColour);
	userClickedPattern.push(userChosenColour);
	playSound(this.id);
	
	checkAnswer(userClickedPattern.length-1);

});

function nextSequence(){
	let randomNumber = Math.floor(Math.random()*4);
	randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);
	blink_text(randomChosenColour);
	playSound(randomChosenColour);
	$('#level-title').text("Level "+level);
	level += 1;
}

function animatePress(currentColour){
	$('#'+currentColour).addClass('pressed');
	setTimeout(()=>{
		$('#'+currentColour).removeClass('pressed');
	},100);
}

$('.start').on('click', function(event) {
	$('.start').animate({opacity: '0'}, 2000);
	$('.start').addClass('disabled');
	setTimeout(function(){
		$('.btn').removeClass('disabled');
		nextSequence();
	},2000);
	
});

function checkAnswer(currentLevel){
	
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		if (userClickedPattern.length == gamePattern.length) {
				setTimeout(function(){
					userClickedPattern = [];
					nextSequence();
				},1000);
			
		}
	}
	else{
		reset();
	}
	

}

function reset(){
	var score = level - 1;
	gamePattern=[];
	userClickedPattern = [];
	$('.btn').addClass('disabled');
	$('.start').text('Try Again');
	$('.start').animate({opacity: '1'}, 2000);
	$('.start').removeClass('disabled');
	$('#level-title').text("Game Over! your score is "+ score);	
	level = 0
	let audio = new Audio('./sounds/wrong.mp3');
	audio.play();
	$('body').addClass('game-over');
	setTimeout(()=>{
		$('body').removeClass('game-over');
	},200);
}