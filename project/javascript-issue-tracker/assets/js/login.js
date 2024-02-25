function initialData() {
  const access_token = window.sessionStorage.getItem('token');
  if(access_token) {
    window.location.href = "./index.html";
  }
}

initialData();

document.getElementById('form').addEventListener('submit', async function(e) {
  e.preventDefault(); // Ngăn chặn form submit để tránh tải lại trang
  const emailInput = document.getElementById("email").value;
  const passwordInput = document.getElementById("password").value;
// email: truong.nn123@gmail.com
// pass: 123456
  const bodyData = {
    data: {
      email: emailInput,
      password: passwordInput,
    }
  }
  const response = await fetch('https://tony-auth-express.vercel.app/api/user/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyData),
  })
  const data = await response.json();

  if(data.isSucess) {
    window.sessionStorage.setItem('token', data.data.access_token)
    window.location.href = "./index.html";
  } else {
    alert(data.msg)
  }

  // if (emailInput === "admin@email.com" && passwordInput === "1") {
  //   window.location.href = "./index.html";
  //   return false; // Ngăn chặn form submit để tránh tải lại trang
  // } else {
  //   alert("Error");
  //   return false;
  // }
});