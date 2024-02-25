document.addEventListener('DOMContentLoaded', function () {
  const btnAdd = document.getElementById('btnAdd');

  btnAdd.addEventListener('click', function () {
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const user = {
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        role: 'operator',
        password: password
      }
    };

    fetch('https://tony-auth-express.vercel.app/api/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(data => {
        console.log('User registered successfully:', data);
        window.location.href = 'login.html';
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
});
