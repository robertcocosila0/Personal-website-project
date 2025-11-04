function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
document.addEventListener('DOMContentLoaded', () => {

  const themeButton = document.getElementById('themeButton');
  let darkMode = false;

  if (themeButton) {
      themeButton.addEventListener('click', () => {
          darkMode = !darkMode;

      
          themeButton.classList.add('rotate');

       
          setTimeout(() => {
              themeButton.textContent = darkMode ? '☀️' : '🌙';
          }, 200);

          
          setTimeout(() => {
              themeButton.classList.remove('rotate');
          }, 400);

       
          document.body.classList.toggle('dark-theme', darkMode);
      });
  }

  const toTopButton = document.getElementById('to-top');

  if (toTopButton) {
      toTopButton.addEventListener('click', () => {
          window.scrollTo({
              top: 0,
              behavior: 'smooth'
          });
      });
  }


  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
      contactForm.addEventListener('submit', async function(e) {
          e.preventDefault();

          const formData = new FormData(this);
          const data = {
              name: formData.get('name'),
              email: formData.get('email'),
              subject: formData.get('subject'),
              message: formData.get('message')
          };

          const statusEl = document.getElementById('form-status');
          console.log(window.location.href)
          
       
          var djangoURL='https://robertcocosila-blog.onrender.com/api/contact/'
          if (!window.location.href.startsWith('http://127.0.0.1') && !window.location.href.startsWith('http://localhost' ))  {
            
              djangoURL='https://robertcocosila-blog.onrender.com/api/contact/'
          }
          
          try {
        
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            
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
