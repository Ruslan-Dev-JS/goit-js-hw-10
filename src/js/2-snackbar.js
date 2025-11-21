import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const delay = Number(form.delay.value);
  const state = form.state.value;

  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  })
    .then((delay) => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        timeout: 3000,
      });
    })
    .catch((delay) => {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        timeout: 3000,
      });
    });

  form.reset();
});
