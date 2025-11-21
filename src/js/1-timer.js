import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector("[data-start]");
const input = document.querySelector("#datetime-picker");

const daysSpan = document.querySelector("[data-days]");
const hoursSpan = document.querySelector("[data-hours]");
const minutesSpan = document.querySelector("[data-minutes]");
const secondsSpan = document.querySelector("[data-seconds]");

startBtn.disabled = true;

let userSelectedDate = null;
let intervalId = null;

flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const chosenDate = selectedDates[0];

    if (chosenDate <= new Date()) {
      iziToast.error({
        message: "Please choose a date in the future",
        position: "topRight",
      });

      startBtn.disabled = true;
      return;
    }

    userSelectedDate = chosenDate;
    startBtn.disabled = false;
  },
});

startBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  input.disabled = true;

  intervalId = setInterval(() => {
    const diff = userSelectedDate - new Date();

    if (diff <= 0) {
      clearInterval(intervalId);
      updateTimer(convertMs(0));
      input.disabled = false;
      startBtn.disabled = true;
      return;
    }

    updateTimer(convertMs(diff));
  }, 1000);
});

function pad(value) {
  return String(value).padStart(2, "0");
}

function updateTimer({ days, hours, minutes, seconds }) {
  daysSpan.textContent = days;
  hoursSpan.textContent = pad(hours);
  minutesSpan.textContent = pad(minutes);
  secondsSpan.textContent = pad(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  return {
    days: Math.floor(ms / day),
    hours: Math.floor((ms % day) / hour),
    minutes: Math.floor(((ms % day) % hour) / minute),
    seconds: Math.floor((((ms % day) % hour) % minute) / second),
  };
}
