function validateFullName(name) {
    const words = name.trim().split(/\s+/);
    return words.length >= 2 && words.every(word => word.length >= 4);
}

function validatePAN(pan) {
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    return panPattern.test(pan);
}

function numberToWords(num) {
    const units = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    const teens = ["", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    const thousands = ["", "Thousand", "Lakh", "Crore"];

    if (num === 0) return "Zero";

    let words = "";

    const getWords = (n, idx) => {
        if (n > 0) {
            if (n < 10) words += units[n] + " ";
            else if (n < 20) words += teens[n - 10] + " ";
            else {
                words += tens[Math.floor(n / 10)] + " ";
                words += units[n % 10] + " ";
            }
            words += thousands[idx] + " ";
        }
    };

    const digits = num.toString().split("").reverse().map(Number);
    getWords(digits[1] * 10 + digits[0], 0); // units and tens
    getWords(digits[3] * 10 + digits[2], 1); // hundreds and thousands
    getWords(digits[5] * 10 + digits[4], 2); // ten thousands and lakhs
    getWords(digits[7] * 10 + digits[6], 3); // crores

    return words.trim() + " Rs.";
}

document.getElementById('loanForm').addEventListener('submit', function (event) {
    event.preventDefault();

    let isValid = true;

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const pan = document.getElementById('pan').value;
    const loanAmount = document.getElementById('loanAmount').value;

    // Validate Full Name
    if (!validateFullName(fullName)) {
        document.getElementById('fullNameError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('fullNameError').style.display = 'none';
    }

    // Validate Email
    if (!email.includes('@')) {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('emailError').style.display = 'none';
    }

    // Validate PAN
    if (!validatePAN(pan)) {
        document.getElementById('panError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('panError').style.display = 'none';
    }

    // Validate Loan Amount
    if (isNaN(loanAmount) || loanAmount.length > 9) {
        document.getElementById('loanAmountError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('loanAmountError').style.display = 'none';
        document.getElementById('loanAmountInWords').textContent = numberToWords(parseInt(loanAmount));
    }

    if (isValid) {
        const formData = new URLSearchParams(new FormData(this)).toString();
        window.location.href = `confirm.html?${formData}`;
    }
});
