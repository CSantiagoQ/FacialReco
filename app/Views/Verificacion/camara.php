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

    <video id="video" autoplay playsinline></video>

    <button id="btnAbrirCamara">
        Abrir cámara
    </button>

    <canvas id="canvas" style="display:none;"></canvas>
</div>

<script src="/js/camara.js"></script>
</body>
</html>
