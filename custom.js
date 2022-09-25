var avatar                 = document.getElementById("runner");
var score                  = document.getElementById("score");
var block                  = document.getElementById("block");
var coin                   = document.getElementById("coin");
var game                   = document.getElementById("game");
var headers                = document.getElementById("headers");
var life                   = document.getElementById("lifeSpace");   
var container123           = document.getElementById("container123");
var gif123                 = document.getElementById("gif123");

var flagCoin               = false;
var flagSpecial            = false;
var countCoins             = 0;

var width                  = 0;
var height                 = 0;
var longitudObject         = 0;
var tolerancia             = 0;
var izquirdaBase           = 0;
let carriles               = 4;
var vidasRestantes         = 3;

let intervalTimeSpecial    = 0.1;       //tiempo de espera en verificacion la nueva posicion de elemento special
let intervalTimeBlock      = 1;         //tiempo de espera en verificacion la nueva posicion de elemento block
let intervalCoinRunning    = 1700;      //tiempo de recorrido el div padre: top -> bottom
let intervalBlockRunning   = 1300;      //tiempo de recorrido el div padre: top -> bottom
let intervalSpecialRunning = 1900;      //tiempo de recorrido el div padre: top -> bottom
let intervalSpecialDelay   = 15000;     //tiempo de espera hasta su próxima aparición en div padre

let arrayAccesorios        = [1, 2, 3, 4, 5, 6, 7, 8];
var countAccesorios        = 0;
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
    longitudObject           = width / 4;
    tolerancia               = longitudObject / 2;
    izquirdaBase             = tolerancia * 3; 
    avatar.style.left        = izquirdaBase + "px";
    avatar.style.top         = (longitudObject * 5) + "px";
    game.style.width         = width + "px";
    game.style.height        = height + "px";
    headers.style.width      = width + "px";
    avatar.style.width       = longitudObject + "px";
    avatar.style.height      = longitudObject + "px";
    block.style.width        = longitudObject + "px";
    block.style.height       = longitudObject + "px";
    coin.style.width         = longitudObject + "px";
    coin.style.height        = longitudObject + "px";
    container123.style.width = width + "px";
    container123.style.top   = (2 * longitudObject) + "px";
    gif123.style.width       = width + "px";
    gif123.style.height      = width + "px";
}

document.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft") {moveToLeft();}
    if (event.key === "ArrowRight") {moveToRight();}
})
function moveToLeft(){
    let left = parseInt(window.getComputedStyle(avatar).getPropertyValue("left"));
    left -= tolerancia;
    if ( left >= 0 ) {
        avatar.style.left = left + "px";
    }
}
function moveToRight(){
    let left = parseInt(window.getComputedStyle(avatar).getPropertyValue("left"));
    left += tolerancia;
    if ( left < width - tolerancia ) {
        avatar.style.left = left + "px";
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


//detectar los choques en los bloques mediante iteraciones de temporzador
var blockInterval = setInterval( funcBlockInterval, intervalTimeBlock);
function funcBlockInterval() {
    var avatarLeft   = parseInt(window.getComputedStyle(avatar).getPropertyValue("left"));
    var blockLeft       = parseInt(window.getComputedStyle(block).getPropertyValue("left"));  
    var blockBottom     = parseInt(window.getComputedStyle(block).getPropertyValue("bottom"));

    if (avatarLeft - blockLeft <= tolerancia && avatarLeft - blockLeft > (longitudObject * -1) &&
        blockBottom <= (-6 * longitudObject) && blockBottom >= (-8 * longitudObject)) {
        
        cuestionario();
    }
}

//detectar los choques en las monedas mediante iteraciones de temporzador
var coinInterval = setInterval( funcCoinInterval, intervalTimeSpecial - 200);
function funcCoinInterval() {
    var avatarLeft   = parseInt(window.getComputedStyle(avatar).getPropertyValue("left"));
    var coinLeft        = parseInt(window.getComputedStyle(coin).getPropertyValue("left")); 
    var coinBottom      = parseInt(window.getComputedStyle(coin).getPropertyValue("bottom"));

    if (avatarLeft - coinLeft <= tolerancia && avatarLeft - coinLeft > (-2 * tolerancia) && 
        coinBottom <= (-6 * longitudObject) && coinBottom >= (-8 * longitudObject)) {
        // activar una bandera cuando hubo contacto con una maneda
        flagCoin = true;
    }

    //detectar los choques en los regalos mediante iteraciones de temporzador
    if (document.getElementById("special") ) {
        var special         = document.getElementById("special");
        var specialLeft     = parseInt(window.getComputedStyle(special).getPropertyValue("left")); 
        var specialBottom   = parseInt(window.getComputedStyle(special).getPropertyValue("bottom"));

        if (avatarLeft - specialLeft <= tolerancia && avatarLeft - specialLeft > (-2 * tolerancia) && 
            specialBottom <= (-3 * longitudObject) && specialBottom >= (-6 * longitudObject)) {
        // activar una bandera cuando hubo contacto con una maneda
            flagSpecial = true;
        }
    }
}

var coinFlagInterval = setInterval( coinFlagIntervalDev, intervalCoinRunning);
function coinFlagIntervalDev() {
    if (flagCoin) {
        countCoins++;
        score.value = countCoins;
    }
    flagCoin = false;
}

var funcSpecial = setInterval( funcSpecialDev, intervalSpecialDelay);
function funcSpecialDev() {
    if (arrayAccesorios.length > 0) {
        var random      = Math.floor(Math.random() * carriles);
        var left        = random * longitudObject;
        var special     = document.createElement("div");

        special.setAttribute("id", "special");
        special.style.left = left + "px";
        document.getElementById("game").appendChild(special);

        eliminarSpecial();
    }
}

function eliminarSpecial() {
    setTimeout(function() {
        if (flagSpecial) {
            arrayNewAvailables.push(arrayAccesorios[0]);
            arrayAccesorios.shift();
            console.log(arrayNewAvailables);
        }
        flagSpecial = false;

        var special = document.getElementById("special");
        document.getElementById("game").removeChild(special);
        clearInterval("funcSpecial");
    }, intervalSpecialRunning);
}

function cuestionario() {
    detenerVista();
    $("#questions").modal("show");
}

function detenerVista(){
    //detener los intervalos de tiempo
    clearInterval(blockInterval);
    clearInterval(coinInterval);
    clearInterval(coinFlagInterval);
    clearInterval(funcSpecial);

    //detener las animaciones de las vistas
    block.style.animation = "slideBlock var(--timeRunningBlock) linear unset";
    coin.style.animation = "slideCoin var(--timeRunningCoin) linear unset";
    game.style.backgroundImage = "url('imgs/street.png')";
    avatar.style.backgroundImage = "url('imgs/runner.png')";

    //restar 1 vida
    vidasRestantes--;
    life.removeChild(life.lastElementChild);
}

function responder(eleccion){
    $("#questions").modal("hide");
    if (eleccion) {
        $("#success").modal("show");
    }else{
        countCoins -= 10;
        score.value = countCoins;
        $("#wrong").modal("show");
    }
}

function continuarJuego(data){
    if (data) {
        $("#success").modal("hide");
    }else{
        $("#wrong").modal("hide");
    }


    if (vidasRestantes < 0) {
        // se acabó el juego
    } else {
        $("#container123").show();

    setTimeout(function() {
        $("#container123").hide();

         //reanudar las animaciones
         block.style.animation = "slideBlock var(--timeRunningBlock) linear infinite";
         coin.style.animation = "slideCoin var(--timeRunningCoin) linear infinite";
         game.style.backgroundImage = "url('imgs/street.gif')";
         avatar.style.backgroundImage = "url('imgs/runner.gif')";

        //reanudar las iteraciones de validación
        blockInterval    = setInterval(funcBlockInterval, intervalTimeBlock);
        coinInterval     = setInterval(funcCoinInterval, intervalTimeSpecial);
        coinFlagInterval = setInterval(coinFlagIntervalDev, intervalCoinRunning);
        funcSpecial      = setInterval(funcSpecialDev, intervalSpecialDelay);
    }, 3200);
    }
}