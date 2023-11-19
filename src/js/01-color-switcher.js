const startBtn = document.querySelector('[data-start]');
const stopBtn  = document.querySelector('[data-stop]');
let timerId = null;

stopBtn.setAttribute("disabled", "");

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, 0)}`;
}

function changeBackgroundColor() {
    const color = getRandomHexColor();
    document.body.style.background = color;
}

startBtn.addEventListener("click", () => {
    timerId = setInterval(() => {
        changeBackgroundColor();
    }, 1000); 
    startBtn.setAttribute("disabled", "");
    stopBtn.removeAttribute("disabled");
});

stopBtn.addEventListener("click", () => {
    clearInterval(timerId);
    startBtn.removeAttribute("disabled");
    stopBtn.setAttribute("disabled", "");
});



