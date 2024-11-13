/**
 * App botão de pânico
 * @autor Thiago Moura
 */

// Variável de áudio com o som de alerta
let alarmSound = new Audio('alarm.mp3');
alarmSound.loop = true;

//carregamento do som
alarmSound.addEventListener("canplaythrough", () => {
    alarmSound.readyToPlay = true;  // Indica que o som está carregado e pronto
}, { once: true });

// Variáveis para a lanterna
let stream, track;

// Inicializa a lanterna 
inicializarLanterna();

// controlar o som e a lanterna
let panicButton = document.getElementById('panicButton');

// Função para iniciar o som e acender a lanterna
function startAlarmAndTorch() {
    if (alarmSound.readyToPlay) {  // Verifica se o som já está carregado
        alarmSound.currentTime = 0;  // Garante que o som comece do início
        alarmSound.play().catch(error => console.log("Erro ao iniciar o som:", error));
    }
    ligar();  // Liga a lanterna
}

// Função para parar o som e apagar a lanterna
function stopAlarmAndTorch() {
    alarmSound.pause();
    alarmSound.currentTime = 0;  // Reseta o som para o início
    desligar();  // Desliga a lanterna
}

// Detecta quando o botão é pressionado (mouse e toque)
panicButton.addEventListener('mousedown', startAlarmAndTorch);
panicButton.addEventListener('touchstart', startAlarmAndTorch);

// Detecta quando o botão é solto (mouse e toque)
panicButton.addEventListener('mouseup', stopAlarmAndTorch);
panicButton.addEventListener('touchend', stopAlarmAndTorch);

// Função para inicializar a lanterna (torch)
async function inicializarLanterna() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" }
        });
        track = stream.getVideoTracks()[0];
        const capabilities = track.getCapabilities();
        if (!capabilities.torch) {
            console.log("Lanterna não suportada no dispositivo.");
            return;
        }
    } catch (error) {
        console.error(`Erro ao inicializar a lanterna: ${error}`);
    }
}

// Função para ligar a lanterna (torch)
async function ligar() {
    if (track) {
        try {
            await track.applyConstraints({ advanced: [{ torch: true }] });
        } catch (error) {
            console.error(`Erro ao acender a lanterna: ${error}`);
        }
    }
}

// Função para desligar a lanterna sem parar o stream
async function desligar() {
    if (track) {
        try {
            await track.applyConstraints({ advanced: [{ torch: false }] });
        } catch (error) {
            console.error(`Erro ao apagar a lanterna: ${error}`);
        }
    }
}


