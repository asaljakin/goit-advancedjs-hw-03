import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const elements = {
    startBtn: document.querySelector("[data-start]"),
    timeInput: document.querySelector("input#datetime-picker"),
    days: document.querySelector("[data-days]"),
    hours: document.querySelector("[data-hours]"),
    minutes: document.querySelector("[data-minutes]"),
    seconds: document.querySelector("[data-seconds]"),    
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const curDate = new Date;
 
        if (selectedDates[0] <= curDate) {
            showError();    
            return;
        }
        elements.startBtn.removeAttribute("disabled");
        
    },
};

function showError() {
    iziToast.error({
                position: 'topRight',
                message: 'Please choose a date in the future',
            });    
}

function addLeadingZero(value) {
    return String(value).padStart(2, 0);    
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

elements.startBtn.setAttribute("disabled", "");

flatpickr("input#datetime-picker", options);

elements.startBtn.addEventListener("click", handlerStart);

function handlerStart() {
    const inputTime = new Date(elements.timeInput.value);
    const curDate = new Date;
    let difTime = inputTime - curDate;
    elements.startBtn.setAttribute("disabled", "");
    if (difTime <= 0) {
        showError(); 
        return;
    }
    elements.timeInput.setAttribute("disabled", "");
    const id = setInterval(() => {
        const timing = convertMs(difTime);
        elements.days.textContent = addLeadingZero(timing.days);
        elements.hours.textContent = addLeadingZero(timing.hours);
        elements.minutes.textContent = addLeadingZero(timing.minutes);
        elements.seconds.textContent = addLeadingZero(timing.seconds);
        difTime -= 1000;
        if (difTime <= 0) {
            clearInterval(id);    
        }
    },
    1000);
}
