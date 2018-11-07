
const isLoggedIn = () => {
  if (sessionStorage.getItem('token')) {
    return true;
  }

else window.location.replace('login.html');
};
isLoggedIn();
