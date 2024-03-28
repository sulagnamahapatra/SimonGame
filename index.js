var patternGame=[];
var patternUser=[];
var level=0;
$("body").one("keydown", function(event){
    randomize();
});

function randomize() {
    var num = Math.floor((Math.random()*4)+1);
    level++;
    $("h1").text("Level "+level);
    switch (num) {
        case 1:
            patternGame.push("green");
            animate("green");
            break;
        case 2:
            patternGame.push("red");
            animate("red");
            break;
        case 3:
            patternGame.push("yellow");
            animate("yellow");
            break;
        case 4:
            patternGame.push("blue");
            animate("blue");
            break;
    }
}

function animate(colour){
    $("#"+colour).addClass("pressed");
    setTimeout(function(){
        $("#"+colour).removeClass("pressed");
    }, 100);
    var aud = "sounds/"+colour+".mp3";
    var audio = new Audio(aud);
    audio.play();
}

$(".btn").click(function(event){
    var clicked = event.currentTarget;
    var colour = $(clicked).attr("id");
    patternUser.push(colour);
    checkPattern(patternUser.length - 1);
});

function checkPattern(curr){
    if (patternUser[curr]===patternGame[curr]){
        if (patternUser.length===patternGame.length){
            setTimeout(randomize, 500);
            patternUser=[];
        }
    }else{
        animateWrong();
        startOver();
    }
}

function animateWrong(){
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    var wrongmp3 = new Audio ("sounds/wrong.mp3");
    wrongmp3.play();
    setTimeout(function(){$("body").removeClass("game-over");}, 100);
}

function startOver(){
    level=0;
    patternGame=[];
    patternUser=[];
    $("body").one("keydown", function(event){
        randomize();
    });
}


