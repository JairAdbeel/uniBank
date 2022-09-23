var character = document.getElementById('character');
var score = document.getElementById("score");
var flag = false;
var counter = 0;

function moveToLeft(){
    let left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    left -= 50;
    if ( left >= 0 ) {
        character.style.left = left + "px";
    }
}

function moveToRight(){
    let left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    left += 50;
    if ( left < 350 ) {
        character.style.left = left + "px";
    }
}

document.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft") {moveToLeft();}
    if (event.key === "ArrowRight") {moveToRight();}
})

var block = document.getElementById("block");
block.addEventListener("animationiteration", () => {
    var random = Math.floor(Math.random() * 4);
    left = random * 100;
    block.style.left = left + "px";
    // counter++;
});

var coin = document.getElementById("coin");
coin.addEventListener("animationiteration", () => {
    var random = Math.floor(Math.random() * 4);
    left = random * 100;
    coin.style.left = left + "px";
});
    
setInterval(function() {
    var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));  
    var blockBottom = parseInt(window.getComputedStyle(block).getPropertyValue("bottom"));
    

    if (characterLeft - blockLeft <= 50 && characterLeft - blockLeft > -100 &&
        blockBottom <= -600 && blockBottom >= -800) {
        alert("Game Over! Score: " + counter);
        // block.style.animation = "none";
    }

}, 1)

setInterval(function() {
    var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var coinLeft = parseInt(window.getComputedStyle(coin).getPropertyValue("left")); 
    var coinBottom = parseInt(window.getComputedStyle(coin).getPropertyValue("bottom"));

    if (characterLeft - coinLeft <= 50 && characterLeft - coinLeft > -100 && 
        coinBottom <= -600 && coinBottom >= -750) {
        counter++;
        score.value = counter;
    }
}, 10);
