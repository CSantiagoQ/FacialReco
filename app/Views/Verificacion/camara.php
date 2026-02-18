<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Verificación facial</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        .contenedor {
            max-width: 500px;
            margin: auto;
            text-align: center;
            padding: 1rem;
        }
        video {
            width: 100%;
            border-radius: 12px;
            background: #000;
        }
        button {
            margin-top: 12px;
            padding: 12px 16px;
            font-size: 16px;
        }
    </style>
</head>
<body>

<div class="contenedor">
    <h2>Autenticación biométrica</h2>

    <div id="contenedorCamara"
        style="position:relative; width:360px; margin:auto;">

        <video id="video"
            autoplay
            playsinline
            style="width:100%; display:block;">
        </video>

        <canvas id="overlay"
            style="position:absolute; top:0; left:0;">
        </canvas>

    </div>

    <button id="btnAbrirCamara">
        Abrir cámara
    </button>

    <canvas id="canvas" style="display:none;"></canvas>
</div>

<div id="estado" style="margin-top:10px;font-weight:bold;">
Esperando inicio…
</div>

<div id="reto" style="margin-top:6px;">
Reto: ninguno
</div>

<canvas id="overlay"></canvas>

<script src="/js/face-api.min.js"></script>
<script src="/js/camara.js"></script>

</body>
</html>
