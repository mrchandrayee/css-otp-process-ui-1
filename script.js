const phoneScreen = document.querySelector("#phoneScreen");
const otpScreen = document.querySelector("#otpScreen");
const successScreen = document.querySelector("#successScreen");
const phoneForm = document.querySelector("#phoneForm");
const otpForm = document.querySelector("#otpForm");
const phoneInput = document.querySelector("#phone");
const countrySelect = document.querySelector("#country");
const phoneError = document.querySelector("#phoneError");
const otpError = document.querySelector("#otpError");
const phonePreview = document.querySelector("#phonePreview");
const digits = [...document.querySelectorAll(".otp-digit")];
const countdown = document.querySelector("#countdown");
const resendBtn = document.querySelector("#resendBtn");
const changeNumberBtn = document.querySelector("#changeNumber");
const continueBtn = document.querySelector("#continueBtn");
const demoCodeLabel = document.querySelector("#demoCode");

const DEMO_OTP = "435345";
let remainingSeconds = 60;
let timerId = null;
let currentPhone = "";

function showScreen(screen) {
  [phoneScreen, otpScreen, successScreen].forEach(item => item.classList.remove("active"));
  screen.classList.add("active");
}

function formatTime(seconds) {
  const min = Math.floor(seconds / 60).toString().padStart(2, "0");
  const sec = (seconds % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}

function stopTimer() {
  if (timerId) window.clearInterval(timerId);
  timerId = null;
}

function startTimer() {
  stopTimer();
  remainingSeconds = 60;
  countdown.textContent = formatTime(remainingSeconds);
  resendBtn.disabled = true;
  timerId = window.setInterval(() => {
    remainingSeconds -= 1;
    countdown.textContent = formatTime(remainingSeconds);
    if (remainingSeconds <= 0) {
      stopTimer();
      resendBtn.disabled = false;
      countdown.textContent = "00:00";
    }
  }, 1000);
}

function clearOtp() {
  digits.forEach(input => { input.value = ""; });
  otpError.textContent = "";
}

function focusFirstOtp() {
  digits[0].focus();
}

phoneInput.addEventListener("input", () => {
  phoneInput.value = phoneInput.value.replace(/\D/g, "").slice(0, 10);
  phoneError.textContent = "";
});

phoneForm.addEventListener("submit", event => {
  event.preventDefault();
  const number = phoneInput.value.trim();
  if (!/^\d{10}$/.test(number)) {
    phoneError.textContent = "Please enter a valid 10-digit mobile number.";
    phoneInput.focus();
    return;
  }

  currentPhone = `${countrySelect.value} ${number}`;
  phonePreview.textContent = currentPhone;
  clearOtp();
  showScreen(otpScreen);
  startTimer();
  window.setTimeout(focusFirstOtp, 80);
});

digits.forEach((input, index) => {
  input.addEventListener("input", () => {
    const value = input.value.replace(/\D/g, "");
    input.value = value.slice(-1);
    otpError.textContent = "";
    if (input.value && index < digits.length - 1) digits[index + 1].focus();
  });

  input.addEventListener("keydown", event => {
    if (event.key === "Backspace" && !input.value && index > 0) {
      digits[index - 1].focus();
    }
    if (event.key === "ArrowLeft" && index > 0) digits[index - 1].focus();
    if (event.key === "ArrowRight" && index < digits.length - 1) digits[index + 1].focus();
  });

  input.addEventListener("paste", event => {
    const pasted = (event.clipboardData || window.clipboardData).getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    event.preventDefault();
    pasted.split("").forEach((char, i) => { digits[i].value = char; });
    digits[Math.min(pasted.length, 5)].focus();
    otpError.textContent = "";
  });
});

otpForm.addEventListener("submit", event => {
  event.preventDefault();
  const entered = digits.map(input => input.value).join("");
  if (entered.length !== 6) {
    otpError.textContent = "Please enter all 6 digits.";
    digits.find(input => !input.value)?.focus();
    return;
  }
  if (remainingSeconds <= 0) {
    otpError.textContent = "OTP expired. Please resend a new code.";
    return;
  }
  if (entered !== DEMO_OTP) {
    otpError.textContent = "Invalid OTP. Please try again.";
    digits.forEach(input => input.value = "");
    focusFirstOtp();
    return;
  }

  stopTimer();
  showScreen(successScreen);
});

resendBtn.addEventListener("click", () => {
  clearOtp();
  startTimer();
  focusFirstOtp();
  otpError.textContent = "A new demo code has been issued.";
});

changeNumberBtn.addEventListener("click", () => {
  stopTimer();
  clearOtp();
  phoneError.textContent = "";
  showScreen(phoneScreen);
  phoneInput.focus();
});

continueBtn.addEventListener("click", () => {
  phoneForm.reset();
  phoneError.textContent = "";
  clearOtp();
  currentPhone = "";
  showScreen(phoneScreen);
});

demoCodeLabel.textContent = DEMO_OTP;
