function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
document.addEventListener('DOMContentLoaded', () => {
  // Moved inside DOMContentLoaded to ensure the element exists
  const themeButton = document.getElementById('themeButton');
  let darkMode = false;

  if (themeButton) {
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
  }

  // Scroll listener for the to-top button
  document.addEventListener('scroll', () => {
      const toTopButton = document.querySelector('#to-top');
      if (toTopButton) {
          if(window.scrollY > 200) {
              toTopButton.classList.add('show')
          } else {
              toTopButton.classList.remove('show');
          }
      }
  });

  // Contact form submission logic
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
      contactForm.addEventListener('submit', async function(e) {
          e.preventDefault(); // oprește submit-ul normal

          const formData = new FormData(this);
          const data = {
              name: formData.get('name'),
              email: formData.get('email'),
              subject: formData.get('subject'),
              message: formData.get('message')
          };

          const statusEl = document.getElementById('form-status');
          console.log(window.location.href)
          
          // *** FIX: Changed the target URL to the CSRF-exempted endpoint /api/contact/ ***
          var djangoURL="http://127.0.0.1:8000/api/contact/"
          if (!window.location.href.startsWith('http://127.0.0.1') && !window.location.href.startsWith('http://localhost' ))  {
              // Note: If 'tralala' is a placeholder for a production domain, this should include the path.
              djangoURL='tralala/api/contact/'
          }
          
          try {
            // Your CSRF token retrieval and header setup is correct on the client side:
            const csrftoken = getCookie('csrftoken')
            const headers=new Headers()
            headers.append('X-CSRFToken', csrftoken)
            headers.append('Content-Type', 'application/json')
              const response = await fetch(djangoURL, {
                  method: 'POST',
                  headers: headers,
                  body: JSON.stringify(data),
                  credentials:'include'
              });

              const result = await response.json();

              if (result.status === 'success') {
                  statusEl.style.color = 'green';
                  statusEl.textContent = result.message;
                  this.reset(); 
              } else {
                  statusEl.style.color = 'red';
                  statusEl.textContent = 'Eroare: ' + result.message;
              }
          } catch (err) {
              statusEl.style.color = 'red';
              statusEl.textContent = 'Try again.';
          }
      });
  }
});
