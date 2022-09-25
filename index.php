<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Subway</title>
    <link rel="stylesheet" href="styles.css" type="text/css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-u1OknCvxWvY5kfmNBILK2hRnQC3Pr17a+RTT6rIHI7NnikvbZlHgTPOOmMi466C8" crossorigin="anonymous"></script>
</head>
<body onload="cargarDimensiones()">
    <div id="game">

        <div id="headers">
            <div id="lifeSpace" class="metrics">
                <div><img class="vidas" src="imgs/vida.svg" alt="vidas1"></div>
                <div><img class="vidas" src="imgs/vida.svg" alt="vidas2"></div>
                <div><img class="vidas" src="imgs/vida.svg" alt="vidas3"></div>
            </div>
            <div class="metrics" style="justify-content: center!important;">
                <img class="vidas" src="imgs/coin.svg" alt="score">
                <input type="text" id="score" value="0" text="0" disabled>
            </div>
        </div>
        <div id="block"></div>
        <div id="coin"><img id="imgCoin" src="imgs/coin.svg" alt="coins"></div>
        <div id="runner"></div>

        <div class="modal fade" id="questions" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header" style="justify-content: center;">
                  <h5 class="modal-title titleModal" id="exampleModalLongTitle">Piensa rápido...</h5>
                </div>
                <div class="modal-footer">
                  <div class="cuySpace">
                    <img id="cuy" src="imgs/cuy.svg" alt="cuy">
                    <p id="question">¿Qué fondo utilizarías para gastos imprevistos, sin afectar tus ahorros?</p>
                  </div>
                  <button type="button" onclick="responder(true)" class="btn btn-secondary buttons">Fondo de Emergencia</button>
                  <button type="button" onclick="responder(false)" class="btn btn-primary buttons">Gastos Hormiga</button>
                </div>
              </div>
            </div>
        </div>  

        <div class="modal fade" id="success" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header" style="display: block!important; text-align: center;">
                    <img src="imgs/good.png">
                    <h5 class="modal-title titleModal" id="exampleModalLongTitle">Correcto!</h5>
                </div>
                <div class="modal-footer">
                  <div class="cuySpace">
                    <p id="feedback" style="margin: auto 30px;">Consejo de Experto 
                        <g-emoji class="g-emoji" alias="smiley" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f603.png">😃</g-emoji> 
                        <br><span style="font-size: 17px;">BCP te recomienda destinar el 10% de tus ingresos a tu fondo de emergencia.</span></p>
                  </div>
                  <button type="button" onclick="continuarJuego(true)" class="btn btn-secondary continuar">Continuar</button>
                </div>
              </div>
            </div>
        </div>  

        <div class="modal fade" id="wrong" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header" style="display: block!important; text-align: center;">
                    <img src="imgs/wrong.png">
                    <h5 class="modal-title titleModal" id="exampleModalLongTitle">Incorrecto!</h5>
                </div>
                <div class="modal-footer">
                  <div class="cuySpace">
                    <p id="feedback" style="margin: auto 30px;"><span style="font-size: 17px;">Los gastos hormiga son gastos pequeños no necesarios, que impactan negativamente tu economía</span></p>
                  </div>
                  <button type="button" onclick="continuarJuego(false)" class="btn btn-secondary salir">Continuar</button>
                </div>
              </div>
            </div>
        </div>  

        <div class="modal fade" id="negativeAmount" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header" style="display: block!important; text-align: center;">
                    <img src="imgs/wrong.png">
                    <h5 class="modal-title titleModal" id="exampleModalLongTitle">Incorrecto!</h5>
                </div>
                <div class="modal-footer">
                  <div class="cuySpace">
                    <p id="feedback" style="margin: auto 30px;"><span style="font-size: 17px;">Los gastos hormiga son gastos pequeños no necesarios, que impactan negativamente tu economía</span></p>
                  </div>
                  <button type="button" onclick="continuarJuego(false)" class="btn btn-secondary salir">Continuar</button>
                </div>
              </div>
            </div>
        </div>  

        <div class="modal fade" id="statistics" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header" style="display: block!important; text-align: center;">
                    <img src="imgs/wrong.png">
                    <h5 class="modal-title titleModal" id="exampleModalLongTitle">Incorrecto!</h5>
                </div>
                <div class="modal-footer">
                  <div class="cuySpace">
                    <p id="feedback" style="margin: auto 30px;"><span style="font-size: 17px;">Los gastos hormiga son gastos pequeños no necesarios, que impactan negativamente tu economía</span></p>
                  </div>
                  <button type="button" onclick="continuarJuego(false)" class="btn btn-secondary salir">Continuar</button>
                </div>
              </div>
            </div>
        </div>  

        <div id="container123" style="display: none;">
            <img id="gif123" src="imgs/123.gif">
        </div>

    </div>
    
    <script type="text/javascript" src="custom.js"></script>
</body>
<script src="https://code.jquery.com/jquery-3.6.1.js" integrity="sha256-3zlB5s2uwoUzrXK3BT7AX3FyvojsraNFxCc2vC/7pNI=" crossorigin="anonymous"></script>
</html>
