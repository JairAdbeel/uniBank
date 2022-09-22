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
    var blockTop = parseInt(window.getComputedStyle(block).getPropertyValue("top"));
    

    if (characterLeft == blockLeft && blockTop < 800 && blockTop > 600) {
        alert("Game Over! Score: " + counter);
        // block.style.animation = "none";
    }

}, 1)

setInterval(function() {
    var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var coinLeft = parseInt(window.getComputedStyle(coin).getPropertyValue("left"));  
    var coinTop = parseInt(window.getComputedStyle(coin).getPropertyValue("top"));

    if (characterLeft == coinLeft && coinTop > 400 && coinTop < 650) {
        counter += 1;
        score.value = counter;
    }
}, 1000);
