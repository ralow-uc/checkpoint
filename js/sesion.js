document.addEventListener("DOMContentLoaded", function () {
  const loginLink = document.getElementById("login-link");
  const logoutBtn = document.getElementById("logout-btn");

  let usuarioActual = localStorage.getItem("usuarioActual");
  if (usuarioActual) {
    loginLink.textContent = usuarioActual;
    loginLink.href = "ver_perfil.html";
    logoutBtn.style.display = "inline-block";
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("usuarioActual");
      window.location.href = "index.html";
    });
  }
});