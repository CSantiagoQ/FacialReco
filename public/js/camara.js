const boton = document.getElementById("btnAbrirCamara");
const video = document.getElementById("video");

boton.addEventListener("click", async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "user",   // cámara frontal en móviles
                width: { ideal: 640 },
                height: { ideal: 480 }
            },
            audio: false
        });

        video.srcObject = stream;

    } catch (error) {
        console.error("Error al acceder a la cámara:", error);
        alert("No se pudo acceder a la cámara. Verifica permisos.");
    }
});
