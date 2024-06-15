function validateFullName(name) {
    const words = name.trim().split(/\s+/);
    return words.length >= 2 && words.every(word => word.length >= 4);
}

function validatePAN(pan) {
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    return panPattern.test(pan);
}

function numberToWords(num) {
    // Arrays for number words
    const belowTwenty = [
        "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", 
        "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"
    ];
    const tens = [
        "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
    ];
    const aboveThousand = [
        "", "Thousand", "Lakh", "Crore"
    ];

    if (num === 0) return "Zero";

    
    let numStr = num.toString();
    let numLength = numStr.length;
    let words = "";

    function getHundredPart(n) {
        let result = "";
        let hundreds = Math.floor(n / 100);  
        let remainder = n % 100; 

       
        if (hundreds > 0) {
            result += belowTwenty[hundreds] + " Hundred ";
            if (remainder > 0) result += "and "; 
        }

       
        if (remainder < 20) {
            result += belowTwenty[remainder];  
        } else {
            result += tens[Math.floor(remainder / 10)];  
            if (remainder % 10 > 0) result += " " + belowTwenty[remainder % 10];  
        }
        return result;
    }

    let groupCount = 0;  
    while (numStr.length > 0) {
        let groupValue;
   
        if (groupCount === 0) {
            groupValue = numStr.slice(-3);  
            numStr = numStr.slice(0, -3);  
        } else {
            
            groupValue = numStr.slice(-2); 
            numStr = numStr.slice(0, -2);  
        }

        
        if (parseInt(groupValue, 10) > 0) {
            words = getHundredPart(parseInt(groupValue, 10)) + " " + aboveThousand[groupCount] + " " + words;
        }

        groupCount++; 
    }

    return words.trim();  
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
