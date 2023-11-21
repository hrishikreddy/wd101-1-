document.addEventListener('DOMContentLoaded', () => {
  const userTableBody = document.querySelector('#userTableBody');
  const registeredUsers = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('user_')) {
      const userData = JSON.parse(localStorage.getItem(key));
      registeredUsers.push(userData);
      addRowToTable(userTableBody, userData);
    }
  }

  const registrationForm = document.getElementById('registrationForm');
  registrationForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const dob = new Date(registrationForm.dob.value);
    const currentYear = new Date().getFullYear();
    const age = currentYear - dob.getFullYear();

    if (age < 18 || age > 55) {
      alert('Age should be between 18 and 55.');
      return;
    }

    const user = {
      name: registrationForm.name.value,
      email: registrationForm.email.value,
      password: registrationForm.password.value,
      dob: registrationForm.dob.value,
      acceptedTerms: registrationForm.acceptedTerms.checked
    };

    registeredUsers.push(user);
    localStorage.setItem(`user_${user.name}`, JSON.stringify(user));

    addRowToTable(userTableBody, user);
  });
});

function addRowToTable(tableBody, userData) {
  const newRow = tableBody.insertRow();

  const cellLabels = ['Name', 'Email', 'Password', 'DOB', 'Accepted Terms'];
  
  for (let i = 0; i < cellLabels.length; i++) {
    const cell = newRow.insertCell();
    cell.textContent = i === 3 ? userData[cellLabels[i].toLowerCase()] : userData[cellLabels[i].toLowerCase()];
    cell.classList.add('compact-cell');
  }
}
