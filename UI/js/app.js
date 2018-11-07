const scripts = [
  'js/auth.js',
  'js/getFetch',


];
scripts.forEach((script) => {
  const imported = document.createElement('script');
  imported.src = document.location.hostname + script;
  document.head.appendChild(imported);
});
