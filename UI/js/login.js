const userLogin = () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
//   const myHeaders = new Headers();
  const body = JSON.stringify({
    password,
    email,
  });
  console.log(body);
  doFetch('http://localhost:8000/api/v1/auth/login', 'post', null, body)
    .then((data) => {
      console.log(data.errors);
      const token = data.token;
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('id', data.authDetail.id);
      if (data.authDetail.role === 'admin') window.location.replace('admin.html');
      else window.location.replace('store-attendant.html');
    });
};

const logout = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('id');
//   location.reload();
};
