# CSS OTP Process UI

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-blue?style=for-the-badge&logo=github)](https://mrchandrayee.github.io/css-otp-process-ui-1/)
[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org) [![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org) [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

A responsive, functional frontend recreation of the OTP login flow shown in the uploaded 15.1-second screen recording.

## Screens
1. **Secure Login** — country code selector, 10-digit mobile input and Send OTP.
2. **Verify OTP** — six separate digit inputs, 60-second countdown, Resend OTP and Change mobile number.
3. **Verified** — success state with a Continue button.

## Interactions
- Validates a 10-digit phone number.
- Moves focus automatically between OTP boxes.
- Supports backspace, arrow navigation and pasting a complete 6-digit code.
- Starts a 60-second timer and enables resend when it expires.
- Validates OTP and displays an error for an incorrect or expired code.
- Shows a success screen after successful verification.
- Continue returns to the initial login screen.

## Demo OTP
Use **435345** to complete the verification flow. The code is displayed beneath the card in demo mode.

## Run locally
No dependencies or build process are required.

```bash
python -m http.server 8000
```

Open http://localhost:8000.

## Files
- `index.html` — login, verification and success screens
- `style.css` — dark glass-style card, gradient buttons, OTP inputs, responsive layout and transitions
- `script.js` — phone validation, OTP input behavior, countdown, resend and demo verification

## Production integration
This project is frontend-only. It does not send SMS messages. For production, replace the demo OTP in `script.js` with secure server-side OTP issuance and verification through an SMS provider. Never expose a real verification code in frontend JavaScript.

## 👨‍💻 Author

**mrchandrayee** · [GitHub](https://github.com/mrchandrayee)

## 📄 License

[MIT License](./LICENSE)
