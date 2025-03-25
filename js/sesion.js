document.addEventListener("DOMContentLoaded", function () {
  let username = localStorage.getItem("usuarioActual");
  let loginLink = document.getElementById("login-link");
  let logoutBtn = document.getElementById("logout-btn");

  if (username) {
    loginLink.textContent = username;
    loginLink.href = "#";
    logoutBtn.style.display = "inline-block";
  } else {
    loginLink.textContent = "Iniciar Sesión";
    loginLink.href = "login.html";
  }

  logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("usuarioActual");
    window.location.href = "index.html";
  });
});
