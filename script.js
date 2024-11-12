// Cria uma variável de áudio com o caminho do som de alerta
var alarmSound = new Audio('alarm.mp3');  // Certifique-se de que o arquivo "alarm.mp3" esteja na mesma pasta
alarmSound.loop = true; // Define o loop para que o som continue até ser parado

// Função para iniciar o som
function startAlarm() {
    alarmSound.play();
}

// Função para parar o som
function stopAlarm() {
    alarmSound.pause();
    alarmSound.currentTime = 0;  // Reseta o som
}

// Obtém o botão e adiciona eventos para controlar o som
var panicButton = document.getElementById('panicButton');

// Detecta quando o botão está pressionado
panicButton.addEventListener('mousedown', startAlarm);
panicButton.addEventListener('touchstart', startAlarm);

// Detecta quando o botão não está pressionado
panicButton.addEventListener('mouseup', stopAlarm);
panicButton.addEventListener('touchend', stopAlarm);
