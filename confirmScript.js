document.addEventListener('DOMContentLoaded', (event) => {
    const params = new URLSearchParams(window.location.search);
    const fullName = params.get('fullName');
    const email = params.get('email');
    const firstName = fullName.split(' ')[0];
    const randomOtp = Math.floor(1000 + Math.random() * 9000);
    console.log(`Random OTP: ${randomOtp}`);

    let attempts = 0;

    document.getElementById('confirmationMessage').innerHTML = `
        Dear ${firstName},<br>
        Thank you for your inquiry. A 4 digit verification number has been sent to your email: ${email}, please enter it in the following box and submit for confirmation:
    `;

    document.getElementById('otpForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const enteredOtp = document.getElementById('otp').value;

        if (enteredOtp == randomOtp) {
            document.getElementById('otpForm').innerHTML = '<p>Validation Successful!</p>';
            setTimeout(() => {
                window.location.href = 'https://www.pixel6.co';
            }, 2000);
        } else {
            attempts++;
            if (attempts < 3) {
                document.getElementById('otpError').style.display = 'block';
            } else {
                document.getElementById('otpForm').innerHTML = '<p>Validation Failed!</p>';
                setTimeout(() => {
                    window.location.href = 'https://www.pixel6.co/404';
                }, 2000);
            }
        }
    });
});
