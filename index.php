<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Subway</title>
    <link rel="stylesheet" href="styles.css" type="text/css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap" rel="stylesheet">
</head>
<body onload="cargarDimensiones()">
    <div id="game">
        <div id="headers">
            <div class="metrics">
                <img class="vidas" src="imgs/vida.svg" alt="vidas1">
                <img class="vidas" src="imgs/vida.svg" alt="vidas2">
                <img class="vidas" src="imgs/vida.svg" alt="vidas3">
            </div>
            <div class="metrics">
                <img class="vidas" src="imgs/coin.svg" alt="score">
                <input type="text" id="score" value="0" text="0" disabled>
            </div>
        </div>
        <div id="block"></div>
        <div id="coin"><img id="imgCoin" src="imgs/coin.svg" alt="coins"></div>
        <div id="character"></div>
    </div>
    
    <script type="text/javascript" src="custom.js"></script>
</body>
</html>