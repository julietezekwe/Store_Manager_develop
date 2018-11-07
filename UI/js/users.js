
const loginFunction = () => {
  console.log('body');
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const myHeaders = new Headers();
  const body = JSON.stringify({
    password,
    email,
  });

  doFetch('http://localhost:8000/api/v1/auth/login', 'post', null, body)
    .then((data) => {
      if (data.error) { console.log('error'); } else {
        const token = data.token;
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('id', data.userDetail.id);
        window.location.replace('profile.html');
      }
    });
};
const signUpFunction = () => {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const body = JSON.stringify({
    name,
    password,
    email,
  });

  doFetch('http://localhost:8000/api/v1/auth/signup', 'post', null, body)
    .then((data) => {
      if (data.error) console.log('error');
      console.log(data);
    });
};
