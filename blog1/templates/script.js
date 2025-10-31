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

const form = document.getElementById("contact-form");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(form);

  // Get CSRF token from cookie
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + "=")) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  const csrftoken = getCookie("csrftoken");

  const response = await fetch(form.action, {
    method: "POST",
    body: formData,
    headers: { "X-CSRFToken": csrftoken },
  });

  const result = await response.json();
  const status = document.getElementById("form-status");

  if (result.success) {
    status.textContent = "✅ Message sent successfully!";
    status.style.color = "#00ff99";
    form.reset();
  } else {
    status.textContent = "❌ Error: " + (result.error || "Could not send message.");
    status.style.color = "#ff4444";
  }
});
