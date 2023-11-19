import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();
  const { delay, step, amount } = event.currentTarget.elements;

  if (delay.value < 0 || step.value < 0 || amount.value < 0) {
    iziToast.error({
                title: 'Error',
                position: 'center',
                message: `Please enter a positive number`,
            });
    return;
  }

  const timeoutMes = Number(delay.value) + Number(step.value) * Number(amount.value);

  for (let i = 0; i < amount.value; i++) {
    let position = i + 1;
    const curDelay = Number(delay.value) + step.value * i;
    
    createPromise(position, curDelay)
      .then(({ position, delay }) => {
        iziToast.success({
                icon: '',
                timeout: timeoutMes,
                position: 'topRight',
                message: `✅ Fulfilled promise ${position} in ${delay}ms`,
            });    
      })
      .catch(({ position, delay }) => {
        iziToast.error({
                icon: '',
                timeout: timeoutMes,
                position: 'topRight',
                message: `❌ Rejected promise ${position} in ${delay}ms`,
            });
      });
  }

  event.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
