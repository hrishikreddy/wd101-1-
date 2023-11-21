document.addEventListener('DOMContentLoaded', () => {
    const userTableBody = document.getElementById('userTableBody');

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('user_')) {
            const userData = JSON.parse(localStorage.getItem(key));
            addRowToTable(userTableBody, userData);
        }
    }
});

const form = document.getElementById('registrationForm');
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const dob = new Date(form.dob.value);
    const currentYear = new Date().getFullYear();
    const age = currentYear - dob.getFullYear();

    // Validate age to accept users between 18 and 55 years old
    if (age < 18 || age > 55) {
        alert('Age should be between 18 and 55.');
        return;
    }

    const userKey = 'user_' + Date.now();
    localStorage.setItem(userKey, JSON.stringify({
        name: form.name.value,
        email: form.email.value,
        password: form.password.value,
        dob: form.dob.value,
        acceptedTerms: form.acceptedTerms.checked
    }));

    const userTableBody = document.getElementById('userTableBody');
    addRowToTable(userTableBody, {
        name: form.name.value,
        email: form.email.value,
        password: form.password.value,
        dob: form.dob.value,
        acceptedTerms: form.acceptedTerms.checked
    });
});

function addRowToTable(tableBody, userData) {
    const newRow = tableBody.insertRow();
    
    // Add borders and padding to each cell
    const cellStyle = 'border border-gray-300 p-2';

    const nameCell = newRow.insertCell();
    nameCell.textContent = userData.name;
    nameCell.className = cellStyle;

    const emailCell = newRow.insertCell();
    emailCell.textContent = userData.email;
    emailCell.className = cellStyle;

    const passwordCell = newRow.insertCell();
    passwordCell.textContent = userData.password;
    passwordCell.className = cellStyle;

    const dobCell = newRow.insertCell();
    dobCell.textContent = userData.dob;
    dobCell.className = cellStyle;

    const acceptedTermsCell = newRow.insertCell();
    acceptedTermsCell.textContent = userData.acceptedTerms;
    acceptedTermsCell.className = cellStyle;
      }
