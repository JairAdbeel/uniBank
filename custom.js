var character           = document.getElementById('character');
var score               = document.getElementById("score");
var flagCoin            = false;
var flagSpecial         = false;
var counter             = 0;
var countSpecial        = 0;

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
});

var coin = document.getElementById("coin");
coin.addEventListener("animationiteration", () => {
    var random = Math.floor(Math.random() * 4);
    left = random * 100;
    coin.style.left = left + "px";
});

setInterval(function() {
    var characterLeft   = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var blockLeft       = parseInt(window.getComputedStyle(block).getPropertyValue("left"));  
    var blockBottom     = parseInt(window.getComputedStyle(block).getPropertyValue("bottom"));

    if (characterLeft - blockLeft <= 50 && characterLeft - blockLeft > -100 &&
        blockBottom <= -600 && blockBottom >= -800) {
        alert("Game Over! Score: " + counter);
    }

}, 1)

setInterval(function() {
    var characterLeft   = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var coinLeft        = parseInt(window.getComputedStyle(coin).getPropertyValue("left")); 
    var coinBottom      = parseInt(window.getComputedStyle(coin).getPropertyValue("bottom"));

    if (characterLeft - coinLeft <= 50 && characterLeft - coinLeft > -100 && 
        coinBottom <= -600 && coinBottom >= -800) {
        flagCoin = true;
    }

    if ( document.getElementById("special") ) {
        var special         = document.getElementById("special");
        var specialLeft     = parseInt(window.getComputedStyle(special).getPropertyValue("left")); 
        var specialBottom   = parseInt(window.getComputedStyle(special).getPropertyValue("bottom"));

        if (characterLeft - specialLeft <= 50 && characterLeft - specialLeft > -100 && 
            specialBottom <= -300 && specialBottom >= -600) {
            flagSpecial = true;
        }
    }
    
}, 0.1);

setInterval(function() {
    if (flagCoin) {
        counter++;
        score.value = counter;
    }
    flagCoin = false;
}, 1500);

var funcSpecial = setInterval(function() {
    var random      = Math.floor(Math.random() * 4);
    var left        = random * 100;
    var special     = document.createElement("div");

    special.setAttribute("id", "special");
    special.style.left = left + "px";
    document.getElementById("game").appendChild(special);

    eliminarSpecial();
}, 15000);

function eliminarSpecial() {
    setTimeout(function() {
        if (flagSpecial) {
            countSpecial++;
            accesories.value = countSpecial;
        }
        flagSpecial = false;

        var special = document.getElementById("special");
        document.getElementById("game").removeChild(special);
        clearInterval("funcSpecial");
    }, 1900);
}
