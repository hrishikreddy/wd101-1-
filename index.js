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

  const nameCell = newRow.insertCell();
  nameCell.textContent = userData.name;
  nameCell.classList.add('border', 'border-gray-300', 'p-1');

  const emailCell = newRow.insertCell();
  emailCell.textContent = userData.email;
  emailCell.classList.add('border', 'border-gray-300', 'p-2');

  const passwordCell = newRow.insertCell();
  passwordCell.textContent = userData.password;
  passwordCell.classList.add('border', 'border-gray-300', 'p-2');

  const dobCell = newRow.insertCell();
  dobCell.textContent = userData.dob;
  dobCell.classList.add('border', 'border-gray-300', 'p-2');

  const acceptedTermsCell = newRow.insertCell();
  acceptedTermsCell.textContent = userData.acceptedTerms;
  acceptedTermsCell.classList.add('border', 'border-gray-300', 'p-2');
}
