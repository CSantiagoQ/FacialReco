const video = document.getElementById("video");
const boton = document.getElementById("btnAbrirCamara");
const estado = document.getElementById("estado");
const retoUI = document.getElementById("reto");
const overlay = document.getElementById("overlay");

let retoActual = 0;
let secuenciaSuperada = false;
let framesValidos = 0;
let contadorParpadeo = 0;

const RETOS = [
    "parpadea",
    "gira_izquierda",
    "gira_derecha",
    "acercate"
];

boton.addEventListener("click", iniciar);

async function iniciar() {
    estado.innerText = "Iniciando cámara...";
    await iniciarCamara();

    estado.innerText = "Cargando modelos...";
    await cargarModelos();

    estado.innerText = "Iniciando análisis...";
    iniciarEvaluacion();
}

async function iniciarCamara() {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: "user",
            width: { ideal: 640 },
            height: { ideal: 480 }
        },
        audio: false
    });

    video.srcObject = stream;

    await esperarVideoListo();
}

function esperarVideoListo() {
    return new Promise(resolve => {

        video.onloadedmetadata = () => {

            video.play();

            // dimensiones reales del stream
            video.width = video.videoWidth;
            video.height = video.videoHeight;

            if (video.videoWidth > 0 && video.videoHeight > 0) {
                resolve();
            }
        };
    });
}

async function cargarModelos() {
    const URL = "/models";

    await faceapi.nets.tinyFaceDetector.loadFromUri(URL);
    await faceapi.nets.faceLandmark68Net.loadFromUri(URL);
}

function configurarOverlay() {

    const canvas = document.getElementById("overlay");

    const width = video.videoWidth;
    const height = video.videoHeight;

    canvas.width = width;
    canvas.height = height;

    canvas.style.width = video.clientWidth + "px";
    canvas.style.height = video.clientHeight + "px";
    canvas.style.transform = "scaleX(-1)";

    return canvas;
}

function iniciarEvaluacion() {

    const opciones = new faceapi.TinyFaceDetectorOptions();

    const canvas = configurarOverlay();

    const displaySize = {
        width: video.clientWidth,
        height: video.clientHeight
    };

    faceapi.matchDimensions(canvas, displaySize);

    estado.innerText = "Buscando rostro...";

    setInterval(async () => {

        if (!video.videoWidth) return; // protección extra

        const deteccion = await faceapi
            .detectSingleFace(video, opciones)
            .withFaceLandmarks();

        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!deteccion) {
            estado.innerText = "No se detecta rostro";
            return;
        }

        estado.innerText = "Rostro detectado";

        const resized = faceapi.resizeResults(deteccion, displaySize);
        faceapi.draw.drawDetections(canvas, resized);
        faceapi.draw.drawFaceLandmarks(canvas, resized);

        evaluarReto(deteccion);

    }, 300);
}

function evaluarReto(deteccion) {

    const landmarks = deteccion.landmarks;
    const reto = RETOS[retoActual];
    retoUI.innerText = "Reto: " + reto;

    let cumplido = false;

    if (reto === "parpadea") {

    if (detectarParpadeo(landmarks)) {
        contadorParpadeo++;
    } else {
        contadorParpadeo = 0;
    }

    if (contadorParpadeo >= 2) {
        avanzar();
        contadorParpadeo = 0;
    }

    return;
    }

    // if (reto === "gira_izquierda") cumplido = girarIzquierda(landmarks);
    // if (reto === "gira_derecha") cumplido = girarDerecha(landmarks);
    // if (reto === "acercate") cumplido = acercarse(deteccion);
    // 
    // if (cumplido) {
    //     framesValidos++;
    // } else {
    //     framesValidos = 0;
    // }
    // 
    // if (framesValidos > 3) {
    //     avanzar();
    //     framesValidos = 0;
    // }
}

function detectarParpadeo(landmarks) {

    const leftEye = landmarks.getLeftEye();
    const rightEye = landmarks.getRightEye();

    const earLeft = calcularEAR(leftEye);
    const earRight = calcularEAR(rightEye);

    const EAR = (earLeft + earRight) / 2.0;

    return EAR < 0.23; // umbral realista en webcam
}

function calcularEAR(eye) {
    const v1 = distancia(eye[1], eye[5]);
    const v2 = distancia(eye[2], eye[4]);
    const h = distancia(eye[0], eye[3]);
    return (v1 + v2) / (2.0 * h);
}

function distancia(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
}

function girarIzquierda(landmarks) {
    const nariz = landmarks.getNose()[3];
    return nariz.x < video.width * 0.4;
}

function girarDerecha(landmarks) {
    const nariz = landmarks.getNose()[3];
    return nariz.x > video.width * 0.6;
}

function acercarse(deteccion) {
    const area = deteccion.detection.box.area;
    return area > 90000;
}

function avanzar() {
    retoActual++;

    if (retoActual >= RETOS.length) {
        estado.innerText = "Liveness verificado";
        secuenciaSuperada = true;
        return;
    }

    estado.innerText = "Reto superado";
}
