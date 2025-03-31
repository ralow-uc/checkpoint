document.addEventListener("DOMContentLoaded", () => {
  const usuarioActual = localStorage.getItem("usuarioActual");
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const loginLink = document.getElementById("login-link");
  const logoutBtn = document.getElementById("logout-btn");

  if (usuarioActual) {
    if (loginLink) {
      loginLink.textContent = usuarioActual;
      loginLink.href = "ver_perfil.html";
    }
    if (logoutBtn) {
      logoutBtn.style.display = "inline-block";
    }
  }

  const usuario = usuarios.find((u) => u.nombreUsuario === usuarioActual);
  if (!usuario) {
    alert("Usuario no encontrado.");
    return;
  }

  document.getElementById("nombreCompleto").textContent =
    usuario.nombreCompleto;
  document.getElementById("nombreUsuario").textContent =
    usuario.nombreUsuario;
  document.getElementById("correo").textContent = usuario.correo || "-";
  document.getElementById("direccion").textContent =
    usuario.direccion || "-";
});