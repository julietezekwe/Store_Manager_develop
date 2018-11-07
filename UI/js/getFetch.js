// fetch function
const doFetch = (url, method, token = null, body = null) => (fetch(url, {
  method,
  headers: {
    'Content-Type': 'application/json',
    Authorization: token,
  },
  body,
}).then(response => response.json()));
