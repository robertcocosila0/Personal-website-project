const themeButton = document.getElementById('themeButton');
let darkMode = false;

themeButton.addEventListener('click', () => {
  darkMode = !darkMode;

  // Animation click
  themeButton.classList.add('rotate');

// Rotation
  setTimeout(() => {
    themeButton.textContent = darkMode ? '☀️' : '🌙';
  }, 200);

 
  setTimeout(() => {
    themeButton.classList.remove('rotate');
  }, 400);

  // mode noir
  document.body.classList.toggle('dark-theme', darkMode);
});



document.addEventListener('scroll', () => {
  const toTopButton = document.querySelector('#to-top');

  if(window.scrollY > 200) {
    toTopButton.classList.add('show')
  } else {
    toTopButton.classList.remove('show');
  }
})