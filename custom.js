var character              = document.getElementById('character');
var score                  = document.getElementById("score");
var block                  = document.getElementById("block");
var coin                   = document.getElementById("coin");
var game                   = document.getElementById("game");
var headers                = document.getElementById("headers");

var flagCoin               = false;
var flagSpecial            = false;
var counter                = 0;
var countSpecial           = 0;

var width                  = 0;
var height                 = 0;
var longitudObject         = 0;
var tolerancia             = 0;
var izquirdaBase           = 0;
let carriles               = 4;

let intervalTimeSpecial    = 0.1;       //tiempo de espera en verificacion la nueva posicion de elemento special
let intervalTimeBlock      = 1;         //tiempo de espera en verificacion la nueva posicion de elemento block
let intervalCoinRunning    = 1700;      //tiempo de recorrido el div padre: top -> bottom
let intervalBlockRunning   = 1300;      //tiempo de recorrido el div padre: top -> bottom
let intervalSpecialRunning = 1900;      //tiempo de recorrido el div padre: top -> bottom
let intervalSpecialDelay   = 15000;     //tiempo de espera hasta su próxima aparición en div padre

let arrayAccesorios        = [1, 2, 3, 4, 5, 6, 7, 8];
let arrayNewAvailables     = [];

function cargarDimensiones(){
    let screenWidth   = screen.width;
    let screenHeight  = screen.height;

    //configurar la dimensiones de la pantalla de juego en aspeto 1 a 2
    //adaptable a cualquier dimensión de dispositivo
    if (screenWidth > 500 ) {
        height = screenHeight * 0.8;
        width  = height * 0.5;
    }else{
        if (screenWidth < 500 && screenWidth > 375) {
            width  = screenWidth;
            height = width * 2;
        }else{ // if => screenWidth < 376
            height = screenHeight * 0.95;
            width = height * 0.5;
        }
    }
    setearDimensiones();
}

//cambiar las nuevas dimensiones de los elementos de acuerdo a la proporción definida
function setearDimensiones(){
    longitudObject = width / 4;
    tolerancia             = longitudObject / 2;
    izquirdaBase           = tolerancia * 3; 
    character.style.left   = izquirdaBase + "px";
    character.style.top    = (longitudObject * 5) + "px";
    game.style.width       = width + "px";
    game.style.height      = height + "px";
    headers.style.width    = width + "px";
    character.style.width  = longitudObject + "px";
    character.style.height = longitudObject + "px";
    block.style.width      = longitudObject + "px";
    block.style.height     = longitudObject + "px";
    coin.style.width       = longitudObject + "px";
    coin.style.height      = longitudObject + "px";
}

document.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft") {moveToLeft();}
    if (event.key === "ArrowRight") {moveToRight();}
})
function moveToLeft(){
    let left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    left -= tolerancia;
    if ( left >= 0 ) {
        character.style.left = left + "px";
    }
}
function moveToRight(){
    let left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    left += tolerancia;
    if ( left < width - tolerancia ) {
        character.style.left = left + "px";
    }
}


block.addEventListener("animationiteration", () => {
    var random = Math.floor(Math.random() * carriles);
    left = random * longitudObject;
    block.style.left = left + "px";
});
coin.addEventListener("animationiteration", () => {
    var random = Math.floor(Math.random() * carriles);
    left = random * longitudObject;
    coin.style.left = left + "px";
});


setInterval(function() {
    var characterLeft   = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var blockLeft       = parseInt(window.getComputedStyle(block).getPropertyValue("left"));  
    var blockBottom     = parseInt(window.getComputedStyle(block).getPropertyValue("bottom"));

    if (characterLeft - blockLeft <= tolerancia && characterLeft - blockLeft > (longitudObject * -1) &&
        blockBottom <= (-6 * longitudObject) && blockBottom >= (-8 * longitudObject)) {
        // alert("Game Over! Score: " + counter);
    }
}, intervalTimeBlock);

setInterval(function() {
    var characterLeft   = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var coinLeft        = parseInt(window.getComputedStyle(coin).getPropertyValue("left")); 
    var coinBottom      = parseInt(window.getComputedStyle(coin).getPropertyValue("bottom"));

    if (characterLeft - coinLeft <= tolerancia && characterLeft - coinLeft > (-2 * tolerancia) && 
        coinBottom <= (-6 * longitudObject) && coinBottom >= (-8 * longitudObject)) {
        flagCoin = true;
    }

    if (document.getElementById("special") ) {
        var special         = document.getElementById("special");
        var specialLeft     = parseInt(window.getComputedStyle(special).getPropertyValue("left")); 
        var specialBottom   = parseInt(window.getComputedStyle(special).getPropertyValue("bottom"));

        if (characterLeft - specialLeft <= tolerancia && characterLeft - specialLeft > (-2 * tolerancia) && 
            specialBottom <= (-3 * longitudObject) && specialBottom >= (-6 * longitudObject)) {
            flagSpecial = true;
        }
    }
}, intervalTimeSpecial);

setInterval(function() {
    if (flagCoin) {
        counter++;
        // score.value = counter;
    }
    flagCoin = false;
}, intervalCoinRunning);

var funcSpecial = setInterval(function() {
    var random      = Math.floor(Math.random() * carriles);
    var left        = random * longitudObject;
    var special     = document.createElement("div");

    special.setAttribute("id", "special");
    special.style.left = left + "px";
    document.getElementById("game").appendChild(special);

    eliminarSpecial();
}, intervalSpecialDelay);

function eliminarSpecial() {
    setTimeout(function() {
        if (flagSpecial) {
            countSpecial++;
            // accesories.value = countSpecial;
        }
        flagSpecial = false;

        var special = document.getElementById("special");
        document.getElementById("game").removeChild(special);
        clearInterval("funcSpecial");
    }, intervalSpecialRunning);
}
